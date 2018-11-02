(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["login-login-module"],{

/***/ "./src/app/login/eulaDialog/eula.dialog.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/login/eulaDialog/eula.dialog.component.ts ***!
  \***********************************************************/
/*! exports provided: EulaDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EulaDialogComponent", function() { return EulaDialogComponent; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/services/auth.service */ "./src/app/shared/services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EulaDialogComponent = /** @class */ (function () {
    function EulaDialogComponent(dialogRef, router, authService) {
        this.dialogRef = dialogRef;
        this.router = router;
        this.authService = authService;
    }
    EulaDialogComponent.prototype.ngOnInit = function () { };
    EulaDialogComponent.prototype.submit = function () { };
    EulaDialogComponent.prototype.onCancel = function () {
        this.dialogRef.close();
        this.authService.logout();
    };
    EulaDialogComponent.prototype.agreeClick = function () {
        this.router.navigate(['/']);
    };
    EulaDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-baza.dialog',
            template: __webpack_require__(/*! ../eulaDialog/eula.dialog.html */ "./src/app/login/eulaDialog/eula.dialog.html"),
            styles: [__webpack_require__(/*! ../eulaDialog/eula.dialog.css */ "./src/app/login/eulaDialog/eula.dialog.css")],
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], EulaDialogComponent);
    return EulaDialogComponent;
}());



/***/ }),

/***/ "./src/app/login/eulaDialog/eula.dialog.css":
/*!**************************************************!*\
  !*** ./src/app/login/eulaDialog/eula.dialog.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-width: 450px;\r\n}\r\n\r\n.container > * {\r\n  width: 100%;\r\n}\r\n\r\n.form {\r\n  display: flex;\r\n  padding-top: 6px;\r\n}\r\n\r\n.mat-form-field {\r\n  font-size: 16px;\r\n  flex-grow: 1;\r\n}\r\n\r\n.primart_Btn {\r\n  background-color: #12a7bb;\r\n  color: #ffffff;\r\n  font-size: 15px;\r\n  border-radius: 22px;\r\n  outline: none;\r\n}\r\n\r\n.primart_Btn:hover {\r\n  background-color: #1094a6;\r\n  color: #ffffff;\r\n  outline: none;\r\n}\r\n\r\n.secondary_Btn {\r\n  background-color: #dcdfe1;\r\n  color: #000000;\r\n  font-size: 15px;\r\n  border-radius: 22px;\r\n  outline: none;\r\n}\r\n\r\n.secondary_Btn:hover {\r\n  background-color: #12a7bb;\r\n  color: #ffffff;\r\n  outline: none;\r\n}\r\n"

/***/ }),

/***/ "./src/app/login/eulaDialog/eula.dialog.html":
/*!***************************************************!*\
  !*** ./src/app/login/eulaDialog/eula.dialog.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <h1 mat-dialog-title>EULA</h1>\r\n    <div mat-dialog-content>\r\n        <pre>\r\n        SOFTWARE LICENSE AGREEMENT\r\n        PLEASE READ THIS LICENSE AGREEMENT CAREFULLY BEFORE USING THE SOFTWARE. BY USING THE SOFTWARE, YOU ARE AGREEING TO BE BOUND BY THE TERMS OF THIS LICENSE AGREEMENT.\r\n\r\n        1. License. The application, demonstration, system and other software accompanying this License Agreement, whether on disk, in read only memory, or on any other media, or through network (hereinafter collectively referred to as the \"Software\") and related documentations are licensed to you by SHARP. The Software and related documentations include the version up thereof. You own the disk on which the Software is recorded, but SHARP retains the title to the Software and related documentations. This License Agreement allows you to use the Software on computers, the number of which is described in related documentations, and make one copy of the Software in machine-readable form for backup purpose only. You must reproduce on such copy the SHARP copyright notice and any other proprietary legends of SHARP that were on the original copy of the Software. You may also transfer all your license rights in the software, the backup copy of the Software, related documentations and a copy of this License Agreement to the third party, provided the third party reads and agrees to the terms and conditions of this License Agreement.\r\n\r\n        2. Restrictions. The Software contains copyrighted material, trade secrets and other proprietary material which is owned by SHARP, and in order to protect them you may not decompile, reverse engineer, disassemble or otherwise reduce the Software to a human-perceivable form. You may not modify, network, rent, lease, loan, distribute or create derivative works based upon the Software in whole or in part. You may not electronically transmit the Software from one computer to another or over a network.\r\n\r\n        3. Termination. This License Agreement is effective until you destroy the Software and related documentations and all copies thereof. This License Agreement will terminate immediately without notice from SHARP if you fail to comply with any provision of this License Agreement. Upon termination you must destroy the Software and related documentations and all copies thereof.\r\n\r\n        4. Export Law Assurances. If any official approval is required by governmental authorities to export or re-export, whether directly or indirectly, the Software, related documentations and any products derived directly therefrom, such export is subject to that approval. You shall obtain the necessary approval and comply in all respects with applicable laws, regulations and court orders, including but not limited to laws and regulations on export control, in your country or other applicable countries.\r\n\r\n        5. Government End Users. If you are acquiring the Software on behalf of any unit or agency of the United States Government, the following provisions apply. The United States Government agrees.\r\n        (i) if the Software is supplied to the Department of Defense (DoD), the Software is classified as \"Commercial Computer Software\" and the United States Government is acquiring only \"restricted rights\" in the Software and related documentations as that term is defined in Clause 252.227-7013 (c)(1) of the DFARS.\r\n        (ii) if the Software is supplied to any unit or agency of the United States Government other than DoD, the United States Government's rights in the Software and related documentations will be as defined in Clause 52.227-19 (c)(2) of the FAR or, in the case of NASA, in Clause 18-52.227-86 (d) of the NASA Supplement to the FAR.\r\n\r\n        6. Limited Warranty on Media. SHARP warrants the disk on which the Software is recorded to be free from defects in materials and workmanship under normal use for a period of ninety (90) days from the date of delivery. The entire liability of SHARP and your exclusive remedy will be replacement of the disk which fails to meet the limited warranty provided by this Clause 6. The disk will be replaced when it is returned to SHARP or a SHARP authorized representative with a copy of the receipt. SHARP will not have responsibility to replace any disks damaged by accident, abuse or misapplication. ANY IMPLIED WARRANTIES ON THE DISKS, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, ARE LIMITED IN DURATION TO NINETY (90) DAYS FROM THE DATE OF DELIVERY. THIS WARRANTY GIVES YOU SPECIFIC LEGAL RIGHTS, AND YOU MAY ALSO HAVE OTHER RIGHTS WHICH VARY FROM JURISDICTION TO JURISDICTION.\r\n\r\n        7. Disclaimer of Warranty on the Software. You expressly acknowledge and agree that the use of the Software is at your sole risk. The software and related documentations are provided \"AS IS\" and without warranty of any kind and SHARP EXPRESSLY DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. SHARP DOES NOT WARRANT THAT THE FUNCTIONS CONTAINED IN THE SOFTWARE WILL MEET YOUR REQUIREMENTS, OR THAT THE OPERATION OF THE SOFTWARE WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT DEFECTS IN THE SOFTWARE WILL BE CORRECTED. FURTHERMORE, SHARP DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING THE USE OR THE RESULTS OF THE USE OF THE SOFTWARE OR RELATED DOCUMENTATIONS IN TERMS OF THEIR CORRECTNESS, ACCURACY, RELIABILITY, OR OTHERWISE. NO ORAL OR WRITTEN INFORMATION OR ADVICE GIVEN BY SHARP OR A SHARP AUTHORIZED REPRESENTATIVE SHALL CREATE A WARRANTY OR IN ANY WAY INCREASE THE SCOPE OF THIS WARRANTY. SHOULD THE SOFTWARE PROVE DEFECTIVE, YOU (AND NOT SHARP OR A SHARP AUTHORIZED REPRESENTATIVE) ASSUME THE ENTIRE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION, SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO YOU.\r\n\r\n        8. Limitation of Liability. UNDER NO CIRCUMSTANCES INCLUDING NEGLIGENCE, SHALL SHARP BE LIABLE FOR ANY INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES THAT RESULT FROM THE USE OR INABILITY TO USE THE SOFTWARE OR RELATED DOCUMENTATIONS, EVEN IF SHARP OR A SHARP AUTHORIZED REPRESENTATIVE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU. In no event shall SHARP's total liability to you for all damages, losses, and causes of action (whether in contract, tort (including negligence) or otherwise) exceed the amount paid by you for the Software.\r\n\r\n        9. Governing Law and Severability. This License Agreement shall be governed by and construed in accordance with the law of Japan excluding its conflict of laws provisions. If for any reason a court of competent jurisdiction finds any provision of this License Agreement, or portion thereof, to be unenforceable, that provision of the License Agreement shall be enforced to the maximum extent permissible so as to effect the intent of the parties hereto, and the remainder of this License Agreement shall continue in full force and effect.\r\n\r\n        10. Entire Agreement. This License Agreement constitutes the entire agreement between the parties hereto with respect to the use of the Software and related documentations, and supersedes all prior or contemporaneous understandings or agreements, written or oral, regarding such subject matter. No amendment to or modification of this License Agreement will be binding unless in writing and signed by a duly authorized representative of SHARP.\r\n\r\n        11. Jurisdiction. The parties hereto agree that all the lawsuits hereunder shall be exclusively brought in the Osaka District Court in Japan.\r\n       </pre>\r\n    </div>\r\n    <div mat-dialog-actions>\r\n        <button mat-button [type]=\"submit\" class=\"primart_Btn\" [mat-dialog-close]=\"1\" (click)=\"agreeClick()\">{{\"Agree\" |translate}}</button>\r\n        <button mat-button (click)=\"onCancel()\" class=\"secondary_Btn\">{{\"Decline\" |translate}}</button>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/login/login-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/login/login-routing.module.ts ***!
  \***********************************************/
/*! exports provided: LoginRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginRoutingModule", function() { return LoginRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"]
    }
];
var LoginRoutingModule = /** @class */ (function () {
    function LoginRoutingModule() {
    }
    LoginRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LoginRoutingModule);
    return LoginRoutingModule;
}());



/***/ }),

/***/ "./src/app/login/login.component.html":
/*!********************************************!*\
  !*** ./src/app/login/login.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"signin-content\">\r\n    <mat-card>\r\n        <mat-card-content>\r\n            <p>\r\n                <a class=\"navigation\" [routerLink]=\"\" id=\"login-tenant-link\" (click)=\"enableTenantForm()\">{{token.getTenantName()}}</a>\r\n            </p>\r\n            <mat-card class=\"login_container custom_mat_form\">\r\n                <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\" #f=\"ngForm\" name=\"loginForm\" id=\"loginForm\">\r\n                    <mat-form-field class=\"full-width-input\" *ngIf=\"tenantSelect\">\r\n                        <input matInput placeholder=\"{{'Tenant' | translate }}\" formControlName=\"tenant\" required name=\"login-name-tenant\" id=\"login-id-tenant\"\r\n                            ngmodel #tenant>\r\n                        <mat-error class=\"help-block\" *ngIf=\"!tenant.valid\">{{\"Please enter tenant\" | translate}}</mat-error>\r\n                    </mat-form-field>\r\n                    <mat-form-field class=\"full-width-input\">\r\n                        <input matInput placeholder=\"{{'Username' | translate }}\" formControlName=\"userName\" required name=\"user\" id=\"user\" ngmodel\r\n                            #user autocomplete=\"nope\">\r\n                        <mat-error class=\"help-block\" *ngIf=\"!user.valid\">{{\"Please enter user name\" | translate}}</mat-error>\r\n                    </mat-form-field>\r\n                    <mat-form-field class=\"full-width-input\">\r\n                        <input matInput type=\"password\" placeholder=\"{{'Password' | translate }}\" formControlName=\"password\" required name=\"passWord\"\r\n                            id=\"passWord\" ngmodel #passWord autocomplete=\"new-password\">\r\n                        <mat-error class=\"help-block\" *ngIf=\"!passWord.valid\">{{\"Please enter password\" | translate}}</mat-error>\r\n                    </mat-form-field>\r\n                    <mat-checkbox labelPosition=\"after\" checked=\"true\" (change)=\"check($event)\" class=\"login_checkbox\" [(checked)]=\"IsChecked\" [disabled]=\"IsDisabled\">\r\n                        Remember my login on this computer!\r\n                    </mat-checkbox>\r\n                    <button mat-raised-button color=\"primary\" type=\"submit\" class=\"primart_Btn\" id=\"login-id-do-login\" [disabled]=\"!f.valid\">{{\"Log In\" |translate}}</button>\r\n                    <mat-error class=\"help-block\" *ngIf=\"loginFailed\">{{\"Sorry, your username and password are incorrect - please try again.\" |translate}}</mat-error>\r\n                </form>\r\n            </mat-card>\r\n        </mat-card-content>\r\n    </mat-card>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-card {\n  max-width: 400px;\n  margin: 1em auto;\n  text-align: center;\n  background-color: #303331; }\n\n.signin-content {\n  padding: 100px 1rem; }\n\n.full-width-input {\n  width: 100%; }\n\n/* Text Field */\n\n:host ::ng-deep .custom_mat_form mat-form-field div.mat-form-field-wrapper {\n  padding: 12px 0 18px 0 !important; }\n\n:host ::ng-deep .custom_mat_form mat-form-field.mat-focused div.mat-form-field-infix input.mat-input-element {\n  color: #ffffff !important;\n  font-size: 14px !important;\n  /*padding: 1.0em 0;*/ }\n\n:host ::ng-deep .custom_mat_form mat-form-field div.mat-form-field-infix input {\n  padding: 0.4em 0; }\n\n:host ::ng-deep .custom_mat_form mat-form-field div.mat-form-field-infix span.mat-form-field-label-wrapper label.mat-form-field-label {\n  color: #ffffff !important;\n  font-size: 18px !important; }\n\n:host ::ng-deep .custom_mat_form mat-form-field.mat-focused div.mat-form-field-infix span.mat-form-field-label-wrapper label.mat-form-field-label {\n  color: #ffffff !important;\n  font-size: 18px !important; }\n\n/* Change autocomplete styles in WebKit */\n\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus\ntextarea:-webkit-autofill,\ntextarea:-webkit-autofill:hover\ntextarea:-webkit-autofill:focus,\nselect:-webkit-autofill,\nselect:-webkit-autofill:hover,\nselect:-webkit-autofill:focus {\n  border: 0 solid #303331;\n  -webkit-text-fill-color: #ffffff;\n  box-shadow: 0 0 0px 1000px #303331 inset;\n  -webkit-box-shadow: 0 0 0px 1000px #303331 inset;\n  transition: background-color 5000s ease-in-out 0s; }\n\n/* Text Field Underline */\n\n:host ::ng-deep .custom_mat_form mat-form-field div.mat-form-field-underline {\n  background-color: #ffffff !important; }\n\n:host ::ng-deep .custom_mat_form mat-form-field.mat-focused div.mat-form-field-underline span.mat-form-field-ripple {\n  background-color: #12a7bb !important; }\n\n.mat-form-field-label {\n  color: #ffffff !important; }\n\n/* Error */\n\n:host ::ng-deep .custom_mat_form mat-form-field mat-error {\n  color: #e47e13 !important; }\n\n:host ::ng-deep .custom_mat_form mat-form-field.mat-form-field-invalid div.mat-form-field-underline span.mat-form-field-ripple {\n  background-color: #e47e13 !important; }\n\n:host ::ng-deep .custom_mat_form mat-form-field div.mat-form-field-infix span.mat-form-field-label-wrapper .mat-empty span.mat-placeholder-required {\n  color: #e47e13 !important; }\n\n:host ::ng-deep .custom_mat_form mat-form-field div.mat-form-field-infix span.mat-form-field-label-wrapper span.mat-placeholder-required {\n  color: #e47e13 !important; }\n\n/* Check Box */\n\n:host ::ng-deep .custom_mat_form mat-checkbox label {\n  margin: 15px 0 !important; }\n\n:host ::ng-deep .custom_mat_form mat-checkbox div.mat-checkbox-inner-container {\n  width: 16px !important;\n  height: 16px !important; }\n\n:host ::ng-deep .custom_mat_form mat-checkbox div.mat-checkbox-inner-container div.mat-checkbox-frame {\n  border-color: #ffffff; }\n\n:host ::ng-deep .custom_mat_form mat-checkbox.mat-checkbox-checked div.mat-checkbox-inner-container div.mat-checkbox-background {\n  background-color: #12a7bb !important; }\n\n.login_container {\n  background-color: #303331;\n  color: #ffffff;\n  box-shadow: none !important; }\n\n.navigation {\n  color: #ffffff; }\n\n.navigation:hover {\n  color: #12a7bb;\n  text-decoration: underline; }\n\n.login_checkbox {\n  font-size: 12px; }\n\n/* Button */\n\n:host ::ng-deep .custom_mat_form form.ng-invalid button {\n  background-color: #dcdfe1 !important;\n  color: #000000 !important;\n  opacity: 0.5 !important;\n  font-size: 15px !important;\n  border-radius: 22px !important;\n  outline: none; }\n\n.primart_Btn {\n  background-color: #12a7bb;\n  color: #ffffff;\n  font-size: 15px;\n  border-radius: 22px;\n  outline: none; }\n\n.primart_Btn:hover {\n  background-color: #1094a6;\n  color: #ffffff;\n  outline: none; }\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/services/auth.service */ "./src/app/shared/services/auth.service.ts");
/* harmony import */ var _core_token_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/token.storage */ "./src/app/core/token.storage.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _eulaDialog_eula_dialog_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./eulaDialog/eula.dialog.component */ "./src/app/login/eulaDialog/eula.dialog.component.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, authService, token, router, dialog) {
        this.fb = fb;
        this.authService = authService;
        this.token = token;
        this.router = router;
        this.dialog = dialog;
        this.tenants = { 'tenantName': '', 'tenantValue': '' };
        this.userDetail = { 'userName': '', 'passWord': '', 'rememberMe': '' };
        this.defaultDialogConfig = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogConfig"]();
        if (this.token.getTenantName() == null &&
            this.token.getTenantValue() == null) {
            this.tenantSelect = true;
        }
        this.defaultDialogConfig.disableClose = true;
        this.defaultDialogConfig.autoFocus = true;
        if (this.token.getRememberMe()) {
            this.form = this.fb.group({
                userName: [this.token.getUserName(), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                password: [atob(this.token.getPassWord()), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                tenant: [this.token.getTenantName()]
            });
        }
        else {
            this.form = this.fb.group({
                userName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
                tenant: [this.token.getTenantName()]
            });
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.isFieldInvalid = function (field) {
        return ((!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt));
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.valid) {
            this.tenants.tenantName = this.form.value.tenant;
            this.tenants.tenantValue = 'https://' + '' + this.form.value.tenant;
            this.token.setTenant(this.tenants);
            this.authService.login(this.form.value).subscribe(function (data) {
                _this.token.saveToken(data);
                var dialogRef = _this.dialog.open(_eulaDialog_eula_dialog_component__WEBPACK_IMPORTED_MODULE_6__["EulaDialogComponent"], _this.defaultDialogConfig);
                dialogRef
                    .afterClosed().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["debounceTime"])(400))
                    .subscribe(function (result) {
                    if (result === 1) {
                    }
                });
            }, function (error) {
                _this.loginFailed = true;
            });
        }
        this.formSubmitAttempt = true;
    };
    LoginComponent.prototype.selectTenant = function (event, tenant) {
        if (event.source.selected) {
            this.token.setTenant(tenant);
        }
    };
    LoginComponent.prototype.enableTenantForm = function () {
        this.tenantSelect = true;
    };
    LoginComponent.prototype.check = function ($event) {
        if ($event.checked === true && (this.form.value.password !== null || this.form.value.password !== undefined)) {
            this.userDetail.userName = this.form.value.userName;
            this.userDetail.passWord = this.form.value.password;
            this.userDetail.rememberMe = $event.checked;
            this.token.saveUserDetail(this.userDetail);
            this.IsDisabled = true;
        }
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _shared_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _core_token_storage__WEBPACK_IMPORTED_MODULE_3__["TokenStorage"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/login/login.module.ts":
/*!***************************************!*\
  !*** ./src/app/login/login.module.ts ***!
  \***************************************/
/*! exports provided: LoginModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login-routing.module */ "./src/app/login/login-routing.module.ts");
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../material/material.module */ "./src/app/material/material.module.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _eulaDialog_eula_dialog_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./eulaDialog/eula.dialog.component */ "./src/app/login/eulaDialog/eula.dialog.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var LoginModule = /** @class */ (function () {
    function LoginModule() {
    }
    LoginModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _material_material_module__WEBPACK_IMPORTED_MODULE_5__["AppMaterialModule"],
                _login_routing_module__WEBPACK_IMPORTED_MODULE_2__["LoginRoutingModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"],
            ],
            exports: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"]],
            entryComponents: [_eulaDialog_eula_dialog_component__WEBPACK_IMPORTED_MODULE_7__["EulaDialogComponent"]],
            declarations: [_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], _eulaDialog_eula_dialog_component__WEBPACK_IMPORTED_MODULE_7__["EulaDialogComponent"]],
        })
    ], LoginModule);
    return LoginModule;
}());



/***/ })

}]);
//# sourceMappingURL=login-login-module.js.map