import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomDetailRoutingModule } from './room-detail-routing.module';
import { RoomDetailComponent } from './room-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { AppMaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../../app.interceptor';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { RoomListService } from '../room-list/services/room-list.service';
@NgModule({
    imports: [
        CommonModule,
        RoomDetailRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        TranslateModule,
        FlexLayoutModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true
        },
        RoomListService],
    declarations: [RoomDetailComponent, DeviceDetailComponent],
})
export class RoomDetailModule {}
