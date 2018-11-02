export interface Hello {
    RoomName: string;
    Place: string;
    Account: string;
    RoomId: string;
    Activated: boolean;
    Note: string;
    Devices: Device[];
}

interface Device {
    DeviceId: string;
    Device: string;
    DeviceName: string;
    NetworkAddress: string;
    PINCode: string;
}
