import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelloDetailComponent } from './hello-detail.component';
import { AppMaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HelloDeviceDetailComponent } from './hello-device-detail/hello-device-detail.component';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    TranslateModule, 
    FlexLayoutModule
  ],
  declarations: [HelloDetailComponent, HelloDeviceDetailComponent]
})
export class HelloDetailModule { }
