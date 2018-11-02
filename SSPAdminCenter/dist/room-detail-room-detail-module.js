(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["room-detail-room-detail-module"],{

/***/ "./src/app/app.interceptor.ts":
/*!************************************!*\
  !*** ./src/app/app.interceptor.ts ***!
  \************************************/
/*! exports provided: Interceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interceptor", function() { return Interceptor; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _core_token_storage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/token.storage */ "./src/app/core/token.storage.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TOKEN_HEADER_KEY = 'Authorization';
var Interceptor = /** @class */ (function () {
    function Interceptor(token, router) {
        this.token = token;
        this.router = router;
    }
    Interceptor.prototype.intercept = function (req, next) {
        var _this = this;
        var authReq = req;
        if (this.token.getToken() != null) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'teleOffice ' + this.token.getToken()) });
        }
        return next.handle(authReq).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(function (err) {
            if (err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpErrorResponse"]) {
                if (err.status === 401) {
                    _this.router.navigate(['/']);
                }
            }
        }));
    };
    Interceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_core_token_storage__WEBPACK_IMPORTED_MODULE_4__["TokenStorage"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], Interceptor);
    return Interceptor;
}());



/***/ }),

/***/ "./src/app/layout/room-detail/device-detail/device-detail.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/layout/room-detail/device-detail/device-detail.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card-title>\r\n        {{\"Edit\" | translate}} {{\"Device\" | translate}}\r\n    </mat-card-title>\r\n\r\n<mat-card class=\"custom_mat_edit\">\r\n    <mat-card-content>\r\n        <form id='deviceForm' fxLayout=\"column\" [formGroup]=\"deviceForm\">\r\n            <div fxLayoutGap=\"20px\" fxLayoutAlign=\"start center\">\r\n                <label fxFlex=\"20%\" fxLayoutAlign=\"end center\">{{\"Model\" | translate}}: </label>\r\n                <mat-form-field>\r\n                    <input matInput id='DeviceName' name='#DeviceName' #DeviceName formControlName=\"DeviceName\"\r\n                        maxlength=\"32\">\r\n                </mat-form-field>\r\n            </div>\r\n            <div fxLayoutGap=\"20px\">\r\n                <label fxFlex=\"20%\" fxLayoutAlign=\"end center\">{{\"Serial No\" | translate}}: </label>\r\n                <mat-form-field>\r\n                    <input matInput id='SerialNo' #SerialNo formControlName=\"SerialNo\" maxlength=\"32\">\r\n                </mat-form-field>\r\n            </div>\r\n            <div *ngIf=\"deviceType=='Soc IWB'\" fxLayoutGap=\"20px\">\r\n                <label fxFlex=\"20%\" fxLayoutAlign=\"end center\">{{\"Connection Type\" | translate}}: </label>\r\n                <mat-radio-group fxFlex=\"70%\" fxLayoutAlign=\"start end\" formControlName=\"ConnectionType\" (change)=\"handleChange($event)\">\r\n                    <mat-radio-button fxFlex=\"20%\" *ngFor=\"let conType of conTypes\" [value]=\"conType\"> {{conType |\r\n                        translate}}\r\n                    </mat-radio-button>\r\n                </mat-radio-group>\r\n            </div>\r\n            <div fxLayoutGap=\"20px\">\r\n                <label fxFlex=\"20%\" fxLayoutAlign=\"end center\">{{\"IP Address\" | translate}}: </label>\r\n                <mat-form-field>\r\n                    <input matInput id='NetworkAddress' formControlName=\"NetworkAddress\">\r\n                </mat-form-field>\r\n            </div>\r\n            <div *ngIf=\"deviceType=='Soc IWB'\" fxLayoutGap=\"20px\">\r\n                <label fxFlex=\"20%\" fxLayoutAlign=\"end center\">{{\"Port\" | translate}}: </label>\r\n                <mat-form-field>\r\n                    <input matInput id='Port' type=\"number\" formControlName=\"Port\">\r\n                </mat-form-field>\r\n            </div>\r\n            <div *ngIf=\"deviceType=='Soc IWB'\" fxLayoutGap=\"20px\">\r\n                <label fxFlex=\"20%\" fxLayoutAlign=\"end center\">{{\"Account ID\" | translate}}: </label>\r\n                <mat-form-field>\r\n                    <input matInput id='AccountId' formControlName='AccountId'>\r\n                </mat-form-field>\r\n            </div>\r\n            <div *ngIf=\"deviceType=='Soc IWB'\" fxLayoutGap=\"20px\">\r\n                <label fxFlex=\"20%\" fxLayoutAlign=\"end center\">{{\"Password\" | translate}}: </label>\r\n                <mat-form-field>\r\n                    <input matInput id='Password' type='password' formControlName='Password'>\r\n                </mat-form-field>\r\n            </div>\r\n            <div *ngIf=\"deviceType=='Soc IWB'\" fxLayoutGap=\"20px\">\r\n                <label fxFlex=\"20%\" fxLayoutAlign=\"end center\">{{\"COM Serial Port\" | translate}}: </label>\r\n                <mat-form-field>\r\n                    <input matInput id='ComSerialPort' formControlName='ComSerialPort'>\r\n                </mat-form-field>\r\n            </div>\r\n            <div *ngIf=\"deviceType=='Soc IWB'\" fxLayoutGap=\"20px\">\r\n                <label fxFlex=\"20%\" fxLayoutAlign=\"end center\">{{\"COM Serial Speed\" | translate}}: </label>\r\n                <mat-form-field>\r\n                    <input matInput id='ComSerialSpeed' formControlName='ComSerialSpeed'>\r\n                </mat-form-field>\r\n            </div>\r\n            <div *ngIf=\"deviceType=='WePresent'\" fxLayoutGap=\"20px\">\r\n                <label fxFlex=\"20%\" fxLayoutAlign=\"end center\">{{\"PIN\" | translate}}: </label>\r\n                <mat-form-field>\r\n                    <input matInput id='Pin' type=\"number\" formControlName=\"Pin\">\r\n                </mat-form-field>\r\n            </div>\r\n        </form>\r\n    </mat-card-content>\r\n    <mat-card-actions>\r\n        <div fxFlex=\"50%\" fxLayoutAlign=\"end center\" fxLayoutGap=\"4%\">\r\n            <button class=\"primart_Btn\" mat-raised-button [type]=\"submit\" (click)=\"Save()\" [disabled]='deviceForm.invalid'>{{\"Ok\"\r\n                | translate}}</button>\r\n            <button class=\"secondary_Btn\" mat-raised-button routerLink='/roomdetail/{{room}}'>{{\"Cancel\" | translate}}</button>\r\n        </div>\r\n    </mat-card-actions>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./src/app/layout/room-detail/device-detail/device-detail.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/layout/room-detail/device-detail/device-detail.component.scss ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* Text Box */\n:host ::ng-deep .custom_mat_edit mat-form-field.mat-focused div.mat-form-field-underline span.mat-form-field-ripple {\n  background-color: #12a7bb !important; }\n:host ::ng-deep .custom_mat_edit mat-form-field.mat-form-field-invalid div.mat-form-field-underline span.mat-form-field-ripple {\n  background-color: #e47e13 !important; }\n:host ::ng-deep .custom_mat_edit mat-form-field div.mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.5) !important; }\n/* Radio Button */\n:host ::ng-deep .custom_mat_edit mat-radio-group mat-radio-button.mat-radio-checked label.mat-radio-label .mat-radio-container div.mat-radio-outer-circle {\n  border-color: #12a7bb !important; }\n/*\r\n:host ::ng-deep .custom_mat_edit mat-radio-group mat-radio-button.mat-radio-checked label.mat-radio-label .mat-radio-container div.mat-radio-ripple {\r\n    background-color: red !important;\r\n}*/\n:host ::ng-deep .custom_mat_edit mat-radio-group mat-radio-button.mat-radio-checked label.mat-radio-label .mat-radio-container div.mat-radio-inner-circle {\n  background-color: #12a7bb !important; }\n.primart_Btn {\n  background-color: #12a7bb;\n  color: #ffffff;\n  font-size: 15px;\n  border-radius: 22px;\n  outline: none; }\n.primart_Btn:hover {\n  background-color: #1094a6;\n  color: #ffffff;\n  outline: none; }\n.secondary_Btn {\n  background-color: #dcdfe1;\n  color: #000000;\n  font-size: 15px;\n  border-radius: 22px;\n  outline: none; }\n.secondary_Btn:hover {\n  background-color: #12a7bb;\n  color: #ffffff;\n  outline: none; }\n"

/***/ }),

/***/ "./src/app/layout/room-detail/device-detail/device-detail.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/layout/room-detail/device-detail/device-detail.component.ts ***!
  \*****************************************************************************/
/*! exports provided: DeviceDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeviceDetailComponent", function() { return DeviceDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _room_list_services_room_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../room-list/services/room-list.service */ "./src/app/layout/room-list/services/room-list.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var DeviceDetailComponent = /** @class */ (function () {
    function DeviceDetailComponent(router, route, deviceFormBuilder, roomListService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.deviceFormBuilder = deviceFormBuilder;
        this.roomListService = roomListService;
        this.conTypes = ['LAN', 'RS232C'];
        this.route.queryParams.subscribe(function (params) {
            _this.deviceType = params['deviceType'];
        });
    }
    DeviceDetailComponent.prototype.ngOnInit = function () {
        this.deviceForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            DeviceName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(32)]),
            SerialNo: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(32)]),
            NetworkAddress: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern('(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'),
            ]),
            ConnectionType: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: '', disabled: true }),
            Port: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: '', disabled: true }, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(1000),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].max(9999),
            ]),
            AccountId: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: '', disabled: true }),
            Password: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: '', disabled: true }),
            ComSerialPort: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: '', disabled: true }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            ComSerialSpeed: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: '', disabled: true }, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            Pin: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]({ value: '', disabled: true }, [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].min(1000),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].max(9999),
            ]),
        });
        this.getRoom();
    };
    DeviceDetailComponent.prototype.getRoom = function () {
        var _this = this;
        this.route.parent.params.subscribe(function (result) {
            _this.room = result.id;
            var roomData = _this.roomListService.currentRoom;
            if (roomData.id === result.id) {
                for (var _i = 0, _a = roomData.Devices; _i < _a.length; _i++) {
                    var device = _a[_i];
                    if (device.Device === _this.deviceType) {
                        if (_this.deviceType === 'Soc IWB') {
                            _this.deviceForm
                                .get('ConnectionType')
                                .enable();
                            var evt = { value: device.ConnectionType };
                            _this.handleChange(evt);
                        }
                        else if (_this.deviceType === 'WePresent') {
                            _this.deviceForm.get('Pin').enable();
                        }
                        _this.deviceForm.patchValue(device);
                    }
                }
            }
        });
    };
    DeviceDetailComponent.prototype.Save = function () {
        var _this = this;
        if (this.deviceForm.valid) {
            var roomData = this.roomListService.currentRoom;
            for (var _i = 0, _a = roomData.Devices; _i < _a.length; _i++) {
                var device = _a[_i];
                if (device.Device === this.deviceType) {
                    for (var key in this.deviceForm.value) {
                        if (this.deviceForm.value.hasOwnProperty(key) && this.deviceForm.value[key] !== '') {
                            device[key] = this.deviceForm.value[key].toString();
                        }
                    }
                }
            }
            this.roomListService.UpdateRoom(roomData).subscribe(function (data) {
                var route = '/roomdetail/' + _this.room;
                _this.router.navigate([route]);
            });
        }
    };
    DeviceDetailComponent.prototype.submit = function () {
        if (this.deviceForm.valid) {
        }
        // emppty stuff
    };
    DeviceDetailComponent.prototype.handleChange = function (evt) {
        if (evt.value === 'LAN') {
            this.deviceForm.get('Port').enable();
            this.deviceForm.get('NetworkAddress').enable();
            this.deviceForm.get('AccountId').enable();
            this.deviceForm.get('Password').enable();
            this.deviceForm.get('ComSerialPort').disable();
            this.deviceForm.get('ComSerialSpeed').disable();
        }
        else {
            this.deviceForm.get('ComSerialPort').enable();
            this.deviceForm.get('ComSerialSpeed').enable();
            this.deviceForm.get('Port').disable();
            this.deviceForm.get('NetworkAddress').disable();
            this.deviceForm.get('AccountId').disable();
            this.deviceForm.get('Password').disable();
        }
    };
    DeviceDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-device-detail',
            template: __webpack_require__(/*! ./device-detail.component.html */ "./src/app/layout/room-detail/device-detail/device-detail.component.html"),
            styles: [__webpack_require__(/*! ./device-detail.component.scss */ "./src/app/layout/room-detail/device-detail/device-detail.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _room_list_services_room_list_service__WEBPACK_IMPORTED_MODULE_3__["RoomListService"]])
    ], DeviceDetailComponent);
    return DeviceDetailComponent;
}());



/***/ }),

/***/ "./src/app/layout/room-detail/room-detail-routing.module.ts":
/*!******************************************************************!*\
  !*** ./src/app/layout/room-detail/room-detail-routing.module.ts ***!
  \******************************************************************/
/*! exports provided: RoomDetailRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomDetailRoutingModule", function() { return RoomDetailRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _room_detail_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./room-detail.component */ "./src/app/layout/room-detail/room-detail.component.ts");
/* harmony import */ var _device_detail_device_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./device-detail/device-detail.component */ "./src/app/layout/room-detail/device-detail/device-detail.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _room_detail_component__WEBPACK_IMPORTED_MODULE_2__["RoomDetailComponent"],
    },
    {
        path: 'device',
        children: [
            {
                path: '',
                component: _device_detail_device_detail_component__WEBPACK_IMPORTED_MODULE_3__["DeviceDetailComponent"],
            },
            {
                path: ':id',
                component: _device_detail_device_detail_component__WEBPACK_IMPORTED_MODULE_3__["DeviceDetailComponent"],
            },
        ],
    },
];
var RoomDetailRoutingModule = /** @class */ (function () {
    function RoomDetailRoutingModule() {
    }
    RoomDetailRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], RoomDetailRoutingModule);
    return RoomDetailRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/room-detail/room-detail.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/room-detail/room-detail.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card layout-fill fxLayout=\"column\" fxLayoutGap=\"40px\" class=\"custom_mat_detail\">\r\n    <mat-card>\r\n        <mat-card-content>\r\n            <div fxLayout=\"row\">\r\n                <form id='roomForm' fxFlex=\"85%\" fxLayout=\"column\" fxLayoutAlign=\"start start \" [formGroup]=\"roomForm\">\r\n                    <div mat-line><span class=\"label_bold\">{{\"RoomName\" | translate}}:</span> {{room.RoomName}}</div>\r\n                    <div>\r\n                        <label class=\"label_bold\">{{\"Place\" | translate}}:</label>\r\n                        <mat-form-field>\r\n                            <input matInput id='Place' name='#Place' #Place formControlName=\"Place\">\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div mat-line><span class=\"label_bold\">{{\"Account\" | translate}}:</span> {{room.Account}}</div>\r\n                    <mat-slide-toggle labelPosition=before  formControlName=\"Activated\" color='primary'><span class=\"label_bold\">{{\"Status\"\r\n    |\r\n    translate}}</span></mat-slide-toggle>\r\n                </form>\r\n                <div fxFlex=\"30%\" fxLayoutAlign=\"center center\">\r\n                    <button class=\"primart_Btn\" mat-raised-button [type]=\"submit\" (click)=\"Save()\" [disabled]='roomForm.invalid || roomForm.pristine'>{{\"Edit\"\r\n                        |\r\n                        translate}}</button>\r\n                </div>\r\n            </div>\r\n        </mat-card-content>\r\n        <mat-divider></mat-divider>\r\n        <mat-list role=\"list\" style='padding:0%'>\r\n            <mat-list-item class='mat-list-item-fixed' style='height:120px ; width:100%' role=\"listitem\" *ngFor=\"let device of room.Devices; let lastItem = last;\">\r\n\r\n                <mat-icon matListIcon><img src=\"../../../assets/images/{{device.Device}}.png\" alt=\"Desc 1 \"></mat-icon>\r\n                <h3 class=\"device_title\" mat-line>{{device.Device}}</h3>\r\n                <h4 [fxShow]=\"device.DeviceName\" mat-line class=\"device_label\"><span class=\"device_label_title\">{{\"Model\" | translate}}:</span> {{device.DeviceName}}</h4>\r\n                <h4 [fxShow]=\"device.DeviceName\" mat-line class=\"device_label\"><span class=\"device_label_title\">{{\"Serial No\" | translate}}:</span> {{device.SerialNo}}</h4>\r\n                <h4 [fxShow]=\"device.DeviceName\" mat-line class=\"device_label\"><span class=\"device_label_title\">{{\"IP Address\" | translate}}:</span> {{device.NetworkAddress}}</h4>\r\n                <div fxflex=\"noshrink\" fxFlex=\"30%\" fxLayout=\"column\" fxLayoutGap=\"10px\" fxLayoutAlign=\"end center\">\r\n                    <div *ngIf=\"device.DeviceName\" fxLayout=\"row\" fxLayoutGap=\"10px\">\r\n                        <button class=\"primart_Btn\" mat-raised-button routerLink='../{{room.id}}/device/{{device.DeviceId}}' [queryParams]=\"{deviceType: device.Device}\">{{\"Edit\"\r\n                            | translate}}</button>\r\n                        <button class=\"secondary_Btn\" mat-raised-button>{{\"Delete\" | translate}}</button>\r\n                    </div>\r\n                    <div *ngIf=\"device.DeviceName\">\r\n                        <button class='primart_Btn mat-raised-button-large' mat-raised-button>{{\"ChangeRoom\" | translate}}</button>\r\n                    </div>\r\n                    <div *ngIf=\"!device.DeviceName\">\r\n                        <button class='primart_Btn mat-raised-button-large' mat-raised-button routerLink='../{{room.id}}/device'\r\n                            [queryParams]=\"{deviceType: device.Device}\">{{\"RegisterDevice\"\r\n                            | translate}}</button>\r\n                    </div>\r\n                </div>\r\n                <mat-divider *ngIf=\"!lastItem\"></mat-divider>\r\n            </mat-list-item>\r\n        </mat-list>\r\n    </mat-card>\r\n    <div mat-line fxLayoutAlign=\"end end\">\r\n        <button class=\"primart_Btn\" mat-raised-button routerLink='/roomlist'>{{\"Ok\"|translate}}</button>\r\n    </div>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./src/app/layout/room-detail/room-detail.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/layout/room-detail/room-detail.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-raised-button-large {\n  width: 190px; }\n\n.mat-list-item-fixed {\n  height: 120px; }\n\n.label_bold {\n  font-weight: bold; }\n\n/* Text Box */\n\n:host ::ng-deep .custom_mat_detail mat-form-field.mat-focused div.mat-form-field-underline span.mat-form-field-ripple {\n  background-color: #12a7bb !important; }\n\n:host ::ng-deep .custom_mat_detail mat-form-field.mat-form-field-invalid div.mat-form-field-underline span.mat-form-field-ripple {\n  background-color: #e47e13 !important; }\n\n:host ::ng-deep .custom_mat_detail mat-form-field div.mat-form-field-underline {\n  background-color: rgba(0, 0, 0, 0.5) !important; }\n\n/* Toggle Bar */\n\n:host ::ng-deep .custom_mat_detail mat-slide-toggle.mat-checked div.mat-slide-toggle-bar {\n  background-color: rgba(18, 167, 187, 0.5) !important;\n  outline: none; }\n\n:host ::ng-deep .custom_mat_detail mat-slide-toggle.mat-checked div.mat-slide-toggle-bar div.mat-slide-toggle-thumb {\n  background-color: #12a7bb !important;\n  outline: none; }\n\nbutton[ng-reflect-disabled='true'] {\n  background-color: #dcdfe1 !important;\n  color: #000000 !important;\n  opacity: 0.5 !important;\n  font-size: 15px !important;\n  border-radius: 22px !important;\n  outline: none; }\n\nbutton[ng-reflect-disabled='false'] {\n  background-color: #12a7bb !important;\n  color: #ffffff !important;\n  font-size: 15px !important;\n  border-radius: 22px !important;\n  outline: none; }\n\nbutton[ng-reflect-disabled='false']:hover {\n  background-color: #1094a6 !important;\n  color: #ffffff !important;\n  font-size: 15px !important;\n  border-radius: 22px !important;\n  outline: none; }\n\n.device_title {\n  font-size: 18px !important;\n  font-weight: 500 !important;\n  padding: 0 0 6px 0 !important; }\n\n.device_label {\n  padding: 0 0 4px 0 !important; }\n\n.device_label_title {\n  font-size: 15px !important;\n  font-weight: 500 !important; }\n\n.primart_Btn {\n  background-color: #12a7bb;\n  color: #ffffff;\n  font-size: 15px;\n  border-radius: 22px;\n  outline: none; }\n\n.primart_Btn:hover {\n  background-color: #1094a6;\n  color: #ffffff;\n  outline: none; }\n\n.secondary_Btn {\n  background-color: #dcdfe1;\n  color: #000000;\n  font-size: 15px;\n  border-radius: 22px;\n  outline: none; }\n\n.secondary_Btn:hover {\n  background-color: #12a7bb;\n  color: #ffffff;\n  outline: none; }\n"

/***/ }),

/***/ "./src/app/layout/room-detail/room-detail.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/room-detail/room-detail.component.ts ***!
  \*************************************************************/
/*! exports provided: RoomDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomDetailComponent", function() { return RoomDetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _room_list_services_room_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../room-list/services/room-list.service */ "./src/app/layout/room-list/services/room-list.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RoomDetailComponent = /** @class */ (function () {
    function RoomDetailComponent(route, router, roomListService, snackBar, translate) {
        this.route = route;
        this.router = router;
        this.roomListService = roomListService;
        this.snackBar = snackBar;
        this.translate = translate;
        this.editMode = false;
    }
    RoomDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.roomForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            Place: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(32)]),
            Activated: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](''),
        });
        this.roomListService.getRoom(this.route.snapshot.params.id).subscribe(function (data) {
            _this.roomForm.patchValue({ Place: data.Place, Activated: data.Activated });
            _this.room = data;
            _this.roomListService.currentRoom = data;
        });
    };
    RoomDetailComponent.prototype.submit = function () { };
    RoomDetailComponent.prototype.Save = function () {
        var _this = this;
        if (this.roomForm.valid) {
            var updateData = this.roomForm.value;
            updateData.RoomName = this.room.RoomName;
            updateData.Activated = this.roomForm.controls.Activated.value;
            updateData.id = this.room.id;
            this.roomListService.UpdateRoom(this.roomForm.value).subscribe(function (data) { }, function (err) {
                _this.roomForm.controls.Activated.setValue(false);
                _this.snackBar.open(_this.translate.instant('License not available'), _this.translate.instant('Ok'), {
                    duration: 3000,
                });
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], RoomDetailComponent.prototype, "room", void 0);
    RoomDetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-room-detail',
            template: __webpack_require__(/*! ./room-detail.component.html */ "./src/app/layout/room-detail/room-detail.component.html"),
            styles: [__webpack_require__(/*! ./room-detail.component.scss */ "./src/app/layout/room-detail/room-detail.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _room_list_services_room_list_service__WEBPACK_IMPORTED_MODULE_3__["RoomListService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"]])
    ], RoomDetailComponent);
    return RoomDetailComponent;
}());



/***/ }),

/***/ "./src/app/layout/room-detail/room-detail.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/layout/room-detail/room-detail.module.ts ***!
  \**********************************************************/
/*! exports provided: RoomDetailModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomDetailModule", function() { return RoomDetailModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _room_detail_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./room-detail-routing.module */ "./src/app/layout/room-detail/room-detail-routing.module.ts");
/* harmony import */ var _room_detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./room-detail.component */ "./src/app/layout/room-detail/room-detail.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../material/material.module */ "./src/app/material/material.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_interceptor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../app.interceptor */ "./src/app/app.interceptor.ts");
/* harmony import */ var _device_detail_device_detail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./device-detail/device-detail.component */ "./src/app/layout/room-detail/device-detail/device-detail.component.ts");
/* harmony import */ var _room_list_services_room_list_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../room-list/services/room-list.service */ "./src/app/layout/room-list/services/room-list.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var RoomDetailModule = /** @class */ (function () {
    function RoomDetailModule() {
    }
    RoomDetailModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _room_detail_routing_module__WEBPACK_IMPORTED_MODULE_2__["RoomDetailRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                _material_material_module__WEBPACK_IMPORTED_MODULE_5__["AppMaterialModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__["FlexLayoutModule"],
            ],
            providers: [
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HTTP_INTERCEPTORS"],
                    useClass: _app_interceptor__WEBPACK_IMPORTED_MODULE_9__["Interceptor"],
                    multi: true
                },
                _room_list_services_room_list_service__WEBPACK_IMPORTED_MODULE_11__["RoomListService"]
            ],
            declarations: [_room_detail_component__WEBPACK_IMPORTED_MODULE_3__["RoomDetailComponent"], _device_detail_device_detail_component__WEBPACK_IMPORTED_MODULE_10__["DeviceDetailComponent"]],
        })
    ], RoomDetailModule);
    return RoomDetailModule;
}());



/***/ })

}]);
//# sourceMappingURL=room-detail-room-detail-module.js.map