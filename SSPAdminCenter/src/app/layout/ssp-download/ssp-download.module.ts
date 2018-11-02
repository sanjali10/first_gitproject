import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SspDownloadRoutingModule } from './ssp-download-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SspDownloadComponent } from './ssp-download.component';
import { AppMaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    SspDownloadRoutingModule,
    HttpClientModule,
    AppMaterialModule,
    TranslateModule
  ],
  declarations: [SspDownloadComponent]
})
export class SspDownloadModule { }
