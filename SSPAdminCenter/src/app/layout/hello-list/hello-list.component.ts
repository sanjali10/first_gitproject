import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Hello } from './interfaces/hello';


const HELLO_DATA: Hello[] = [
  {
      RoomId: 'a10c4112-8436-11e8-95f6-b250e06b375f',
      RoomName: 'B-Room',
      Place: 'Nara 6F',
      Account: 'BROOM@sharp.onmicrosoft.com',
      Activated: true,
      Note: 'any string',
      Devices: [
          {
              DeviceId: 'a10c4112-8436-11e8-95f6-b250e06b375f',
              Device: 'Soc IWB',
              DeviceName: 'PN-L805H',
              NetworkAddress: '192.168.100.1',
              PINCode: '',
          },
          {
              DeviceId: 'a10c4112-8436-11e8-95f6-b250e06b375f',
              Device: 'Bot',
              DeviceName: 'PN-L805H',
              NetworkAddress: '192.168.100.1',
              PINCode: '',
          },
      ],
  },
  {
      RoomId: 'a10c4112-8436-11e8-95f6-b250e06b375r',
      RoomName: 'R-Room',
      Place: 'Bangalore',
      Account: 'BOM@sharp.onmicrosoft.com',
      Activated: false,
      Note: 'any string',
      Devices: [
          {
              DeviceId: 'a10c4112-8436-11e8-95f6-b250e06b375f',
              Device: 'Soc IWB',
              DeviceName: 'PN-L805H',
              NetworkAddress: '192.168.100.1',
              PINCode: '',
          },
          {
              DeviceId: 'a10c4112-8436-11e8-95f6-b250e06b375f',
              Device: 'WePresent',
              DeviceName: 'PN-L805H',
              NetworkAddress: '192.168.100.1',
              PINCode: '',
          },
      ],
  },
  {
      RoomId: 'a10c4112-8436-11e8-95f6-b250e06b375r',
      RoomName: 'C-Room',
      Place: 'SSDI',
      Account: 'DOM@sharp.onmicrosoft.com',
      Activated: false,
      Note: 'any string',
      Devices: [
          {
              DeviceId: 'a10c4112-8436-11e8-95f6-b250e06b375f',
              Device: 'Soc IWB',
              DeviceName: 'PN-L805H',
              NetworkAddress: '192.168.100.1',
              PINCode: '',
          }
      ],
  },
  {
      RoomId: 'a10c4112-8436-11e8-95f6-b250e06b375r',
      RoomName: 'A-Room',
      Place: 'SSDI',
      Account: 'AOM@sharp.onmicrosoft.com',
      Activated: false,
      Note: 'any string',
      Devices: [ ],
  },
];

@Component({
  selector: 'app-hello-list',
  templateUrl: './hello-list.component.html',
  styleUrls: ['./hello-list.component.scss']
})
export class HelloListComponent implements OnInit {
  view = [
     { value: 'true', viewValue: 'Active' },
     { value: 'false', viewValue: 'Unassigned' },
  ];

  displayedColumns: string[] = ['select', 'Activated', 'RoomName', 'Place', 'Devices', 'Account'];
  dataSource = new MatTableDataSource<Hello>(HELLO_DATA);
  selection = new SelectionModel<Hello>(true, []);

  constructor(private router: Router) { }

  ngOnInit() {
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
}

 /** Selects all rows if they are not all selected; otherwise clear selection. */
 masterToggle() { 
  this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
}
navigateRoomDetails(row) {
  const route = '/hellodetail/' + row.RoomId ;
  this.router.navigate([route]);
}

refresh(){
  console.log('refresh');
}
}
