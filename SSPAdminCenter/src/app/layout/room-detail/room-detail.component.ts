import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Room } from '../room-list/interfaces/room';
import { RoomListService } from '../room-list/services/room-list.service';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '../room-list/interfaces/room';
@Component({
    selector: 'app-room-detail',
    templateUrl: './room-detail.component.html',
    styleUrls: ['./room-detail.component.scss'],
})
export class RoomDetailComponent implements OnInit {
    @Input()
    room: Room;
    editMode = false;
    roomForm: FormGroup;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private roomListService: RoomListService,
        public snackBar: MatSnackBar,
        private translate: TranslateService,
    ) {}

    ngOnInit() {
        this.roomForm = new FormGroup({
            place: new FormControl('', [Validators.required, Validators.maxLength(32)]),
            status: new FormControl(''),
        });

        this.roomListService.getRoom(this.route.snapshot.params.id).subscribe((data: Room[]) => {
            this.room = data[0];
            this.roomListService.currentRoom = data[0];
            let roomStatus = false;
            if (data[0].status === 'assign') {
                roomStatus = true;
            }
            this.roomForm.patchValue({ place: data[0].place, status: roomStatus });
            const deviceTypes: string[] = ['Soc IWB', 'Bot', 'WePresent', 'PC'];
            const initialDevices: Device[] = [
                { deviceType: 'Soc IWB' } as Device,
                { deviceType: 'Bot' } as Device,
                { deviceType: 'WePresent' } as Device,
                { deviceType: 'PC' } as Device,
            ];

            for (const storedDevice of this.room.devices) {
                if (storedDevice.deviceType === 'Soc IWB') {
                    initialDevices[0] = storedDevice;
                } else if (storedDevice.deviceType === 'Bot') {
                    initialDevices[1] = storedDevice;
                } else if (storedDevice.deviceType === 'WePresent') {
                    initialDevices[2] = storedDevice;
                } else if (storedDevice.deviceType === 'PC') {
                    initialDevices[3] = storedDevice;
                }
            }

            this.room.devices = initialDevices;
        });
    }

    submit() {}

    Save() {
        if (this.roomForm.valid) {
            const updateData = this.roomForm.value;
            updateData.roomName = this.room.roomName;
            if (this.roomForm.controls.status.value === true) {
                updateData.status = 'assign';
            } else {
                updateData.status = 'unassign';
            }
            updateData.roomId = this.room.roomId;
            updateData.account = this.room.account;
            this.roomListService.UpdateRoom(this.roomForm.value).subscribe(
                data => {},
                err => {
                    this.roomForm.controls.status.setValue(false);
                    this.snackBar.open(
                        this.translate.instant('License not available'),
                        this.translate.instant('Ok'),
                        {
                            duration: 3000,
                        },
                    );
                },
            );
        }
    }

    delete(device: Device) {
        this.roomListService.deleteDevice(device.deviceId).subscribe(
            data => {
                if (device.deviceType === 'Soc IWB') {
                    this.room.devices[0] = { deviceType: 'Soc IWB' } as Device;
                } else if (device.deviceType === 'Bot') {
                    this.room.devices[1] = { deviceType: 'Bot' } as Device;
                } else if (device.deviceType === 'WePresent') {
                    this.room.devices[2] = { deviceType: 'WePresent' } as Device;
                } else if (device.deviceType === 'PC') {
                    this.room.devices[3] = { deviceType: 'PC' } as Device;
                }
            },
            err => {},
        );
    }

    uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
