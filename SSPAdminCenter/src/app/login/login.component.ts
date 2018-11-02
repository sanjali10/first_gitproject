import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { TokenStorage } from '../core/token.storage';
import { Router } from '@angular/router';
import { MatOptionSelectionChange } from '@angular/material';
import { environment } from '../../environments/environment';
import { MatDialogConfig, MatDialog, MatCheckboxModule } from '@angular/material';
import { EulaDialogComponent } from './eulaDialog/eula.dialog.component';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    tenantForm: FormGroup;
    private formSubmitAttempt: boolean;
    public loginFailed: boolean;
    public tenantSelect: boolean;
    public tenants = {'tenantName': '', 'tenantValue': ''};
    public userDetail = { 'userName': '', 'passWord': '', 'rememberMe': '' };
    defaultDialogConfig = new MatDialogConfig();
    IsChecked: boolean;
    IsDisabled: boolean;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        public token: TokenStorage,
        private router: Router,
        public dialog: MatDialog
    ) {
        if (
            this.token.getTenantName() == null &&
            this.token.getTenantValue() == null
        ) {
            this.tenantSelect = true;
        }

        this.defaultDialogConfig.disableClose = true;
        this.defaultDialogConfig.autoFocus = true;
         if (this.token.getRememberMe()) {
            this.form = this.fb.group({
                userName: [this.token.getUserName(), Validators.required],
                password: [atob(this.token.getPassWord()), Validators.required],
                tenant: [this.token.getTenantName()]
            });
        } else {
            this.form = this.fb.group({
                userName: ['', Validators.required],
                password: ['', Validators.required],
                tenant: [this.token.getTenantName()]
            });
        }

    }

    ngOnInit() {

    }

    isFieldInvalid(field: string) {
        return (
            (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt)
        );
    }

    onSubmit() {

        if (this.form.valid) {
            this.tenants.tenantName = this.form.value.tenant;
            this.tenants.tenantValue = 'https://' + '' + this.form.value.tenant;
            this.token.setTenant(this.tenants);
            this.authService.login(this.form.value).subscribe(
                data => {
                    this.token.saveToken(data);
                    const dialogRef = this.dialog.open(EulaDialogComponent, this.defaultDialogConfig);
                    dialogRef
                        .afterClosed().pipe(debounceTime(400))
                        .subscribe(result => {
                            if (result === 1) {
                            }
                        });
                },
                error => {
                    this.loginFailed = true;
                },
            );
        }
        this.formSubmitAttempt = true;
    }

    selectTenant(event: MatOptionSelectionChange, tenant: any) {
        if (event.source.selected) {
            this.token.setTenant(tenant);
        }
    }

    enableTenantForm() {
        this.tenantSelect = true;
    }

    check($event) {
        if ($event.checked === true && (this.form.value.password !== null || this.form.value.password !== undefined)) {
            this.userDetail.userName = this.form.value.userName;
            this.userDetail.passWord = this.form.value.password;
            this.userDetail.rememberMe = $event.checked;
            this.token.saveUserDetail(this.userDetail);
            this.IsDisabled = true;
        }
    }
}
