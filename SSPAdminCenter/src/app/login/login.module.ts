import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { EulaDialogComponent } from './eulaDialog/eula.dialog.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppMaterialModule,
        LoginRoutingModule,
        TranslateModule,
    ],
    exports: [TranslateModule],
    entryComponents: [EulaDialogComponent],
    declarations: [LoginComponent, EulaDialogComponent],
})
export class LoginModule {}
