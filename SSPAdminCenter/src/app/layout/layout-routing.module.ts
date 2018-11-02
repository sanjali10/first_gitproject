import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'roomlist' },
            {
                path: 'roomlist',
                loadChildren: './room-list/room-list.module#RoomListModule',
            },
            {
                path: 'roomdetail/:id',
                loadChildren: './room-detail/room-detail.module#RoomDetailModule',
            },
            {
                path: 'download',
                loadChildren: './ssp-download/ssp-download.module#SspDownloadModule',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
