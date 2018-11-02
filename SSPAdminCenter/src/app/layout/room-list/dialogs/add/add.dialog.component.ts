import { debounceTime } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { RoomListService } from '../../services/room-list.service';
import { O365AuthService } from '../../services/o365Auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Room } from '../../interfaces/room';
import { TokenStorage } from '../../../../core/token.storage';

@Component({
    selector: 'app-add.dialog',
    templateUrl: './add.dialog.html',
    styleUrls: ['./add.dialog.css'],
})
export class AddDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AddDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Room,
        public o365AuthService: O365AuthService,
        public dataService: RoomListService,
        private addRoomFB: FormBuilder,
        private token: TokenStorage,
    ) {}
    addGroupForm: FormGroup;
    roomSearchResult = [];

    ngOnInit() {
        this.addGroupForm = this.addRoomFB.group({
            roomName: new FormControl('', [Validators.required]),
            account: new FormControl('', [Validators.required, Validators.email]),
            tenantId: [this.token.getTenantName()],
            tenantValue: [this.token.getTenantName()],
        });

        this.addGroupForm
            .get('roomName')
            .valueChanges.pipe(debounceTime(400))
            .subscribe(data => {
                this.o365AuthService.getO365Rooms(data, response => {
                    if (
                        response.length === 0 ||
                        false ===
                            (response.length >= 0 &&
                                response[0].emailId.toString() ===
                                    this.addGroupForm.get('account').value.toString() &&
                                response[0].name.toString() ===
                                    this.addGroupForm.get('roomName').value.toString())
                    ) {
                        this.addGroupForm.get('account').setValue('');
                    }
                    this.roomSearchResult = response;
                });
            });
    }

    roomSelection(room) {
        this.addGroupForm.get('roomName').setValue(room.name);
        this.addGroupForm.get('account').setValue(room.emailId);
    }

    submit() {
        // emppty stuff
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public confirmAdd(): void {
        if (this.addGroupForm.valid) {
            this.dataService.createRoom(this.addGroupForm.value).subscribe(data => {
                console.log('d');
            });
        }
    }
}
