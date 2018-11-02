import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelloDetailComponent } from './hello-detail.component';
import { HelloDeviceDetailComponent } from './hello-device-detail/hello-device-detail.component';

const routes: Routes = [
    {
        path: '',
        component: HelloDetailComponent,
    },
    {
        path: 'device',
        children: [
            {
                path: '',
                component: HelloDeviceDetailComponent,
            },
            {
                path: ':id',
                component:HelloDeviceDetailComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HelloDetailRoutingModule {}
