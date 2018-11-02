import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/collections';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { merge, fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { MatDialogConfig, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TokenStorage } from '../../core/token.storage';
import { HttpClient } from '@angular/common/http';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';

import { Room } from './interfaces/room';
import { RoomListService } from './services/room-list.service';
import { O365AuthService } from './services/o365Auth.service';
import * as Msal from 'msal';
// Discard emitted values that take less than the specified time between output
const DEBOUNCE_TIME = 150;

@Component({
    selector: 'app-room-list',
    templateUrl: './room-list.component.html',
    styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit {
    view = [
        { value: 'all', viewValue: 'All' },
        { value: 'assign', viewValue: 'Active' },
        { value: 'unassign', viewValue: 'Unassigned' },
    ];

    displayedColumns: string[] = ['Status', 'RoomName', 'Place', 'Devices', 'Account'];
    // dataSource = new MatTableDataSource<Room>(ROOM_DATA);
    selection = new SelectionModel<Room>(true, []);
    roomDatabase: RoomListService | null;
    dataSource: RoomDataSource | null;

    defaultDialogConfig = new MatDialogConfig();

    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;
    @ViewChild('filter')
    filter: ElementRef;

    filterForm: FormGroup;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private o365AuthService: O365AuthService,
        private roomListService: RoomListService,
        public dialog: MatDialog,
        private token: TokenStorage,
        public httpClient: HttpClient,
    ) {
        this.defaultDialogConfig.disableClose = true;
        this.defaultDialogConfig.autoFocus = true;
    }

    ngOnInit() {
        this.filterForm = new FormGroup({
            View: new FormControl('all'),
            Search: new FormControl(''),
        });

        if (this.o365AuthService.addform) {
            this.o365AuthService.addform = false;
            this.addNew();
        }
        this.refresh();
    }

    refresh() {
        this.loadData();
    }

    public loadData() {
        this.roomDatabase = new RoomListService(this.httpClient, this.token);
        this.dataSource = new RoomDataSource(this.roomDatabase, this.paginator, this.sort);
        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                debounceTime(DEBOUNCE_TIME),
                distinctUntilChanged(),
            )
            .subscribe(() => {
                if (!this.dataSource) {
                    return;
                }
                this.dataSource.filter = this.filterForm.value;
            });
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.renderedData.length;
        return numSelected === numRows;
    }

    onSelection(e) {
        if (!this.dataSource) {
            return;
        }
        this.dataSource.filter = this.filterForm.value as SearchForm;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.renderedData.forEach(row => this.selection.select(row));
    }

    navigateRoomDetails(row) {
        const route = '/roomdetail/' + row.roomId;
        this.router.navigate([route]);
    }

    addNew() {
        this.o365AuthService.getUser().then((user: Msal.User) => {
            if (user.idToken == null) {
                this.o365AuthService.login();
            } else {
                const dialogRef = this.dialog.open(AddDialogComponent, this.defaultDialogConfig);

                dialogRef.afterClosed().subscribe(result => {
                    if (result === 1) {
                        this.refresh();
                    }
                });
            }
        });
    }
}

interface SearchForm {
    View: string;
    Search: string;
}

export class RoomDataSource extends DataSource<Room> {
    _filterChange = new BehaviorSubject({ View: 'all', Search: '' } as SearchForm);

    get filter(): SearchForm {
        return this._filterChange.value;
    }

    set filter(filter: SearchForm) {
        this._filterChange.next(filter);
    }

    filteredData: Room[] = [];
    renderedData: Room[] = [];

    constructor(
        public _roomDatabase: RoomListService,
        public _paginator: MatPaginator,
        public _sort: MatSort,
    ) {
        super();
        // Reset to the first page when the user changes the filter.
        this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Room[]> {
        // Listen for any changes in the base data, sorting, filtering, or pagination
        const displayDataChanges = [
            this._roomDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page,
        ];
        this._roomDatabase.getAllRooms();
        return merge(...displayDataChanges).pipe(
            map(() => {
                // Filter data
                this.filteredData = this._roomDatabase.data.slice().filter((room: Room) => {
                    let isMatched = false;
                    const filterRoomStatus =
                        this.filter.View === 'all'
                            ? null
                            : this.filter.View;
                    if (filterRoomStatus == null && this.filter.Search.length === 0) {
                        isMatched = true;
                    } else if (filterRoomStatus !== null && this.filter.Search.length > 0) {
                        const searchStr = (
                            room.roomName +
                            room.account +
                            room.place +
                            room.description
                        ).toLowerCase();
                        if (
                            room.status === filterRoomStatus &&
                            searchStr.indexOf(this.filter.Search.toLowerCase()) !== -1
                        ) {
                            isMatched = true;
                        }
                    } else if (filterRoomStatus !== null && room.status === filterRoomStatus) {
                        isMatched = true;
                    } else if (this.filter.Search.length > 0) {
                        const searchStr = (
                            room.roomName +
                            room.account +
                            room.place +
                            room.description
                        ).toLowerCase();
                        isMatched = searchStr.indexOf(this.filter.Search.toLowerCase()) !== -1;
                    }
                    return isMatched;
                });

                const sortedData = this.sortData(this.filteredData.slice());

                // Grab the page's slice of the filtered sorted data.
                const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
                this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
                return this.renderedData;
            }),
        );
    }

    disconnect() {}

    /** Returns a sorted copy of the database data. */
    sortData(data: Room[]): Room[] {
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            let propertyA: number | string | boolean = '';
            let propertyB: number | string | boolean = '';

            switch (this._sort.active) {
                case 'Status':
                    [propertyA, propertyB] = [a.status.valueOf(), b.status.valueOf()];
                    break;
                case 'RoomName':
                    [propertyA, propertyB] = [a.roomName, b.roomName];
                    break;
                case 'Place':
                    [propertyA, propertyB] = [a.place, b.place];
                    break;
                case 'Account':
                    [propertyA, propertyB] = [a.account, b.account];
                    break;
                case 'RoomId':
                    [propertyA, propertyB] = [a.roomId, b.roomId];
                    break;
                case 'Note':
                    [propertyA, propertyB] = [a.description, b.description];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
        });
    }
}
