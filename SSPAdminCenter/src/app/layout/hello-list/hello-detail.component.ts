import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Hello } from '../hello-list/interfaces/hello';
@Component({
  selector: 'app-hello-detail',
  templateUrl: './hello-detail.component.html',
  styleUrls: ['./hello-detail.component.scss']
})
export class HelloDetailComponent implements OnInit {

  @Input()
  hello: Hello;
  editMode = false;
  constructor(private route: ActivatedRoute, private router: Router) {
      this.hello = {
          RoomId: 'a10c4112-8436-11e8-95f6-b250e06b375f',
          RoomName: 'B-Room',
          Place: 'Nara 6F',
          Account: 'BROOM@sharp.onmicrosoft.com',
          Activated: true,
          Note: 'any string',
          Devices: [
              {
                  DeviceId: 'device12-8436-11e8-95f6-b250e06b375f',
                  Device: 'Soc IWB',
                  DeviceName: 'PN-L805H',
                  NetworkAddress: '192.168.100.1',
                  PINCode: '',
              },
              {
                  DeviceId: 'a10c4112-8436-11e8-95f6-b250e06b375f',
                  Device: 'WePresent',
                  DeviceName: 'WiPG-1600',
                  NetworkAddress: '192.168.100.2',
                  PINCode: '0123',
              },
              {
                  DeviceId: 'a10c4112-8436-11e8-95f6-b250e06b375f',
                  Device: 'Bot',
                  DeviceName: '',
                  NetworkAddress: '',
                  PINCode: '',
              },
              {
                  DeviceId: 'a10c4112-8436-11e8-95f6-b250e06b375f',
                  Device: 'PC',
                  DeviceName: '',
                  NetworkAddress: '',
                  PINCode: '',
              },
          ],
      };
  }

  ngOnInit() {
      this.hello.RoomId = this.getRoom();
  }

  getRoom(): string {
      const id = this.route.snapshot.params.id;
      return id;
  }

}
