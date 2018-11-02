import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppMaterialModule } from '../material/material.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SspDownloadComponent } from './ssp-download/ssp-download.component';
import { O365AuthService } from './room-list/services/o365Auth.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        AppMaterialModule,
        FlexLayoutModule,
        NgbDropdownModule.forRoot(),
    ],
    providers: [O365AuthService],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent],
})
export class LayoutModule {}
