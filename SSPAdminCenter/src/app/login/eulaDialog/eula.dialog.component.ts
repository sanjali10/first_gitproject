import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-baza.dialog',
    templateUrl: '../eulaDialog/eula.dialog.html',
    styleUrls: ['../eulaDialog/eula.dialog.css'],
})
export class EulaDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<EulaDialogComponent>,
        public router: Router,
        public authService: AuthService,
    ) {}
    ngOnInit() {}

    submit() {}

    onCancel(): void {
        this.dialogRef.close();
        this.authService.logout();
    }

    agreeClick() {
        this.router.navigate(['/']);
    }
}
