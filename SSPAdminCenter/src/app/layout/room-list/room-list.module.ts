import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomListRoutingModule } from './room-list-routing.module';
import { RoomListComponent } from './room-list.component';
import { RoomListService } from './services/room-list.service';
import { AppMaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatSortModule, MatPaginatorModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from '../../app.interceptor';
import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { O365AuthService } from './services/o365Auth.service';

@NgModule({
    imports: [
        CommonModule,
        RoomListRoutingModule,
        HttpClientModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSortModule,
        MatPaginatorModule,
        TranslateModule,
        FlexLayoutModule,
    ],
    entryComponents: [AddDialogComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true,
        },
        RoomListService, O365AuthService
    ],
    declarations: [RoomListComponent, AddDialogComponent],
})
export class RoomListModule {}
