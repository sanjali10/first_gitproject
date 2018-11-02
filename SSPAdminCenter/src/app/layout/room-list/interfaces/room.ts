export interface Room {
    // id: string;
    roomName: string;
    place: string;
    account: string;
    roomId: string;
    status: string;
    description: string;
    devices: Device[];
    tenantValue: string;
}

export interface Device {
    deviceId: string;
    deviceType: string;
    deviceName: string;
    networkAddress: string;
    pinCode: string;
    ConnectionType: string;
    SerialNo: string;
}
