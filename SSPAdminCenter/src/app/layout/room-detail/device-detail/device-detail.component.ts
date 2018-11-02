import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomListService } from '../../room-list/services/room-list.service';
import { Room } from '../../room-list/interfaces/room';
import { Device } from '../../room-list/interfaces/room';
@Component({
    selector: 'app-device-detail',
    templateUrl: './device-detail.component.html',
    styleUrls: ['./device-detail.component.scss'],
})
export class DeviceDetailComponent implements OnInit {
    public deviceType: string;
    roomId: string;
    conTypes: string[] = ['LAN', 'RS232C'];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private deviceFormBuilder: FormBuilder,
        private roomListService: RoomListService,
    ) {
        this.route.queryParams.subscribe(params => {
            this.deviceType = params['deviceType'];
        });
    }
    deviceForm: FormGroup;

    ngOnInit() {
        this.deviceForm = new FormGroup({
            deviceId: new FormControl(''),
            deviceType: new FormControl(''),
            deviceName: new FormControl('', [
                Validators.required,
                Validators.maxLength(32),
            ]),
            // serialNo: new FormControl('', [Validators.maxLength(32)]),
            networkAddress: new FormControl('', [
                Validators.required,
                Validators.pattern(
                    '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
                ),
            ]),
            // connectionType: new FormControl({ value: '', disabled: true }),
            // port: new FormControl({ value: '', disabled: true }, [
            //     Validators.required,
            //     Validators.min(1000),
            //     Validators.max(9999),
            // ]),
            // accountId: new FormControl({ value: '', disabled: true }),
            // password: new FormControl({ value: '', disabled: true }),
            // comSerialPort: new FormControl({ value: '', disabled: true }, Validators.required),
            // comSerialSpeed: new FormControl({ value: '', disabled: true }, Validators.required),
            pinCode: new FormControl({ value: '', disabled: true }, [
                Validators.required,
                Validators.min(1000),
                Validators.max(9999),
            ]),
        });
        this.getRoom();
    }

    getRoom(): void {
        this.route.parent.params.subscribe(result => {
            this.roomId = result.id;
            const roomData: Room = this.roomListService.currentRoom;
            if (roomData.roomId === result.id) {
                for (const device of roomData.devices) {
                    if (device.deviceType === this.deviceType) {
                        // if (this.deviceType === 'Soc IWB') {
                        //     this.deviceForm.get('connectionType').enable();
                        //     const evt = { value: device.ConnectionType };
                        //     this.handleChange(evt);
                        // } else
                        if (this.deviceType === 'WePresent') {
                            this.deviceForm.get('pinCode').enable();
                        }
                        this.deviceForm.patchValue(device);
                    }
                }
            }
        });
    }

    Save() {
        if (this.deviceForm.valid) {
            const device: Device = this.deviceForm.value;
            this.roomListService
                .createUpdateDevice(this.roomListService.currentRoom.roomId, device)
                .subscribe(data => {
                    const route = '/roomdetail/' + this.roomId;
                    this.router.navigate([route]);
                });
        }
    }

    submit() {
        if (this.deviceForm.valid) {
        }
        // emppty stuff
    }

    // handleChange(evt) {
    //     if (evt.value === 'LAN') {
    //         this.deviceForm.get('port').enable();
    //         this.deviceForm.get('networkAddress').enable();
    //         this.deviceForm.get('accountId').enable();
    //         this.deviceForm.get('password').enable();
    //         this.deviceForm.get('comSerialPort').disable();
    //         this.deviceForm.get('comSerialSpeed').disable();
    //     } else {
    //         this.deviceForm.get('comSerialPort').enable();
    //         this.deviceForm.get('comSerialSpeed').enable();
    //         this.deviceForm.get('port').disable();
    //         this.deviceForm.get('networkAddress').disable();
    //         this.deviceForm.get('accountId').disable();
    //         this.deviceForm.get('password').disable();
    //     }
    // }
}
