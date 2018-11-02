import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelloListRoutingModule } from './hello-list-routing.module';
import { HelloListComponent } from './hello-list.component';
import { AppMaterialModule } from '../../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    HelloListRoutingModule,
    AppMaterialModule,
    TranslateModule,
    FlexLayoutModule
  ],
  declarations: [HelloListComponent]
})
export class HelloListModule { }
