import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TokenStorage } from '../../../core/token.storage';
import { Room } from '../interfaces/room';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Device } from '../interfaces/room';
@Injectable()
export class RoomListService {
    constructor(private http: HttpClient, private Token: TokenStorage) {}

    dataChange: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
    private _currentRoom: Room;
    public get currentRoom(): Room {
        return this._currentRoom;
    }
    public set currentRoom(value: Room) {
        this._currentRoom = value;
    }

    createRoom(createRoom: Room): Observable<Room> {
        (createRoom.roomId = this.uuidv4()),
            (createRoom.place = '-'),
            (createRoom.status = 'unassign'),
            (createRoom.description = '-'),
            (createRoom.devices = []);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        const rooms = [createRoom];
        return this.http.post<Room>(environment.endpoints.arn + '/rooms', rooms, httpOptions);
    }

    getRoom(id: string): Observable<Room[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        return this.http.get<Room[]>(
            environment.endpoints.arn + '/rooms?includeDevices=true&roomID=' + id,
            httpOptions,
        );
    }

    deleteRoom(id): Observable<any> {
        return this.http.delete<any>(environment.endpoints.arn + '/' + id);
    }

    UpdateRoom(updateRoom: Room): Observable<any> {
        updateRoom.tenantValue = this.Token.getTenantValue().replace('https://', '');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        const url = environment.endpoints.arn + '/rooms?roomID=' + updateRoom.roomId;
        const rooms = [updateRoom];
        return this.http.post<any>(url, rooms, httpOptions);
    }

    get data(): Room[] {
        return this.dataChange.value;
    }

    getAllRooms(): void {
        const tenant = this.Token.getTenantValue().replace('https://', '');
        const body = { TenantValue: tenant };
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };
        this.http
            .get<Room[]>(environment.endpoints.arn + '/rooms?includeDevices=true', httpOptions)
            .subscribe(
                data => {
                    this.dataChange.next(data);
                },
                (error: HttpErrorResponse) => {
                    console.log(error.name + ' ' + error.message);
                },
            );
    }

    createUpdateDevice(roomId: string, device: Device): Observable<Room> {
        if (device.deviceId == null || device.deviceId === '') {
            device.deviceId = this.uuidv4();
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

        const devices = [device];
        return this.http.post<Room>(
            environment.endpoints.arn + '/rooms/' + roomId + '/devices',
            devices,
            httpOptions,
        );
    }

    deleteDevice(deviceId: string): Observable<any> {
        const deviceIds = { deviceIds: [deviceId] };

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: deviceIds,
        };

        return this.http.delete<any>(environment.endpoints.arn + '/devices', httpOptions);
    }

    uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
}
