import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomDetailComponent } from './room-detail.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

const routes: Routes = [
    {
        path: '',
        component: RoomDetailComponent,
    },
    {
        path: 'device',
        children: [
            {
                path: '',
                component: DeviceDetailComponent,
            },
            {
                path: ':id',
                component: DeviceDetailComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoomDetailRoutingModule {}
