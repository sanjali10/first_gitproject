(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["room-list-room-list-module"],{

/***/ "./src/app/layout/room-list/dialogs/add/add.dialog.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/layout/room-list/dialogs/add/add.dialog.component.ts ***!
  \**********************************************************************/
/*! exports provided: AddDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddDialogComponent", function() { return AddDialogComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_room_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/room-list.service */ "./src/app/layout/room-list/services/room-list.service.ts");
/* harmony import */ var _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/o365Auth.service */ "./src/app/layout/room-list/services/o365Auth.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _core_token_storage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../core/token.storage */ "./src/app/core/token.storage.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var AddDialogComponent = /** @class */ (function () {
    function AddDialogComponent(dialogRef, data, o365AuthService, dataService, addRoomFB, token) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.o365AuthService = o365AuthService;
        this.dataService = dataService;
        this.addRoomFB = addRoomFB;
        this.token = token;
        this.roomSearchResult = [];
    }
    AddDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addGroupForm = this.addRoomFB.group({
            RoomName: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required]),
            Account: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].email]),
            TenantId: [this.token.getTenantName()],
            TenantValue: [this.token.getTenantName()],
        });
        this.addGroupForm
            .get('RoomName')
            .valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["debounceTime"])(400))
            .subscribe(function (data) {
            _this.o365AuthService.getO365Rooms(data, function (response) {
                if (response.length === 0 ||
                    false ===
                        (response.length >= 0 &&
                            response[0].emailId.toString() ===
                                _this.addGroupForm.get('Account').value.toString() &&
                            response[0].name.toString() ===
                                _this.addGroupForm.get('RoomName').value.toString())) {
                    _this.addGroupForm.get('Account').setValue('');
                }
                _this.roomSearchResult = response;
            });
        });
    };
    AddDialogComponent.prototype.roomSelection = function (room) {
        this.addGroupForm.get('RoomName').setValue(room.name);
        this.addGroupForm.get('Account').setValue(room.emailId);
    };
    AddDialogComponent.prototype.submit = function () {
        // emppty stuff
    };
    AddDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AddDialogComponent.prototype.confirmAdd = function () {
        if (this.addGroupForm.valid) {
            this.dataService.createRoom(this.addGroupForm.value).subscribe(function (data) {
                console.log('d');
            });
        }
    };
    AddDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-add.dialog',
            template: __webpack_require__(/*! ./add.dialog.html */ "./src/app/layout/room-list/dialogs/add/add.dialog.html"),
            styles: [__webpack_require__(/*! ./add.dialog.css */ "./src/app/layout/room-list/dialogs/add/add.dialog.css")],
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_4__["O365AuthService"],
            _services_room_list_service__WEBPACK_IMPORTED_MODULE_3__["RoomListService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
            _core_token_storage__WEBPACK_IMPORTED_MODULE_6__["TokenStorage"]])
    ], AddDialogComponent);
    return AddDialogComponent;
}());



/***/ }),

/***/ "./src/app/layout/room-list/dialogs/add/add.dialog.css":
/*!*************************************************************!*\
  !*** ./src/app/layout/room-list/dialogs/add/add.dialog.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "    .container {\r\n        display: flex;\r\n        flex-direction: column;\r\n        min-width: 450px;\r\n    }\r\n\r\n    .container>* {\r\n        width: 100%;\r\n    }\r\n\r\n    .form {\r\n        display: flex;\r\n        padding-top: 6px;\r\n    }\r\n\r\n    .mat-form-field {\r\n        font-size: 16px;\r\n        flex-grow: 1;\r\n    }\r\n"

/***/ }),

/***/ "./src/app/layout/room-list/dialogs/add/add.dialog.html":
/*!**************************************************************!*\
  !*** ./src/app/layout/room-list/dialogs/add/add.dialog.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <h1 mat-dialog-title>{{'AddRoom' | translate }}</h1>\r\n    <div mat-dialog-content>\r\n        <form id='addRoomForm' fxLayout=\"column\" name='addRoomForm' #addRoomForm [formGroup]=\"addGroupForm\">\r\n            <mat-form-field class=\"align-center\">\r\n                <input id='RoomName' name='RoomName' #RoomName matInput placeholder=\"{{'RoomName' | translate }}\"\r\n                    formControlName=\"RoomName\" [matAutocomplete]=\"auto\">\r\n                <mat-autocomplete #auto=\"matAutocomplete\">\r\n                    <mat-option *ngFor=\"let room of roomSearchResult\" [value]=\"room.name\" (onSelectionChange)=\"roomSelection(room)\">\r\n                        {{ room.name }}\r\n                    </mat-option>\r\n                </mat-autocomplete>\r\n                <mat-error *ngIf=\"addGroupForm.get('RoomName').hasError('required')\">{{'EnterValue' | translate }}</mat-error>\r\n            </mat-form-field>\r\n        </form>\r\n    </div>\r\n    <div mat-dialog-actions>\r\n        <button mat-button [type]=\"submit\" [mat-dialog-close]=\"1\" [disabled]='addGroupForm.invalid' (click)=\"confirmAdd()\">{{'Save'\r\n            | translate }}</button>\r\n        <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\">{{'Cancel' | translate }}</button>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/layout/room-list/room-list-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/room-list/room-list-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: RoomListRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomListRoutingModule", function() { return RoomListRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _room_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./room-list.component */ "./src/app/layout/room-list/room-list.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _room_list_component__WEBPACK_IMPORTED_MODULE_2__["RoomListComponent"],
    },
];
var RoomListRoutingModule = /** @class */ (function () {
    function RoomListRoutingModule() {
    }
    RoomListRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], RoomListRoutingModule);
    return RoomListRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/room-list/room-list.component.html":
/*!***********************************************************!*\
  !*** ./src/app/layout/room-list/room-list.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card-title>{{ 'RoomList' | translate }}</mat-card-title>\r\n\r\n<mat-card class=\"custom_mat_list\">\r\n    <mat-card-content>\r\n        <form id='filterForm' [formGroup]=\"filterForm\">\r\n            <mat-form-field>\r\n                <mat-label>{{ 'View' | translate }}</mat-label>\r\n                <mat-select (selectionChange)=\"onSelection($event)\" formControlName=\"View\">\r\n                    <mat-option *ngFor=\"let state of view\" [value]=\"state.value\">\r\n                        {{ state.viewValue }}\r\n                    </mat-option>\r\n                </mat-select>\r\n            </mat-form-field>\r\n            <mat-form-field floatPlaceholder=\"never\" color=\"accent\">\r\n                <input matInput #filter placeholder=\"{{'SearchRoom' | translate }}\" id=\"room-Id-Search-Box\" formControlName=\"Search\">\r\n            </mat-form-field>\r\n        </form>\r\n    </mat-card-content>\r\n</mat-card>\r\n\r\n<div class=\"example-container mat-elevation-z8 table_space\">\r\n    <mat-table #table [dataSource]=\"dataSource\" matSort class=\"mat-cell\">\r\n\r\n        <!-- Checkbox Column -->\r\n        <!-- <ng-container matColumnDef=\"select\">\r\n            <mat-header-cell *matHeaderCellDef>\r\n                <mat-checkbox (change)=\"$event ? masterToggle() : null\" [checked]=\"selection.hasValue() && isAllSelected()\"\r\n                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\">\r\n                </mat-checkbox>\r\n            </mat-header-cell>\r\n            <mat-cell *matCellDef=\"let row\">\r\n                <mat-checkbox (click)=\"$event.stopPropagation()\" (change)=\"$event ? selection.toggle(row) : null\"\r\n                    [checked]=\"selection.isSelected(row)\">\r\n                </mat-checkbox>\r\n            </mat-cell>\r\n        </ng-container> -->\r\n\r\n        <!-- Position Column  -->\r\n        <ng-container matColumnDef=\"Activated\">\r\n            <mat-header-cell *matHeaderCellDef mat-sort-header> {{'Status' | translate }} </mat-header-cell>\r\n            <mat-cell *matCellDef=\"let element\"> {{element.Activated ? ('Active' | translate) : ('Unassigned' |\r\n                translate)}} </mat-cell>\r\n        </ng-container>\r\n\r\n        <!-- Room Name Column -->\r\n        <ng-container matColumnDef=\"RoomName\">\r\n            <mat-header-cell *matHeaderCellDef mat-sort-header> {{'RoomName' | translate }} </mat-header-cell>\r\n            <mat-cell *matCellDef=\"let element\"> {{element.RoomName}} </mat-cell>\r\n        </ng-container>\r\n\r\n        <!-- Place Column -->\r\n        <ng-container matColumnDef=\"Place\">\r\n            <mat-header-cell *matHeaderCellDef mat-sort-header> {{'Place' | translate }} </mat-header-cell>\r\n            <mat-cell *matCellDef=\"let element\"> {{element.Place}} </mat-cell>\r\n        </ng-container>\r\n\r\n        <!-- Devices Column -->\r\n        <ng-container matColumnDef=\"Devices\">\r\n            <mat-header-cell *matHeaderCellDef> {{'Device' | translate }} </mat-header-cell>\r\n            <mat-cell *matCellDef=\"let element\">\r\n                <span *ngFor=\"let device of element.Devices\">\r\n                    <mat-icon matListIcon *ngIf=\"device.DeviceName\"><img src=\"../../../assets/images/{{device.Device}}.png\"\r\n                            style=\"width: 75%; height: 75%\" alt=\"Desc 1 \"></mat-icon>\r\n                </span>\r\n            </mat-cell>\r\n        </ng-container>\r\n\r\n        <!-- Account Column -->\r\n        <ng-container matColumnDef=\"Account\">\r\n            <mat-header-cell fxLayout=\"row\" fxLayoutAlign=\"space-between center\" *matHeaderCellDef mat-sort-header>\r\n                <span fxLayoutAlign=\"start center\"> {{'Account' | translate }} </span>\r\n                <button class=\"icon_btn\" mat-icon-button color=\"primary\" id=\"sspRoom-Id-Add-Room\" (click)=\"addNew()\">\r\n                    <mat-icon aria-label=\"Example icon-button with a heart icon\">add</mat-icon>\r\n                </button>\r\n                <button class=\"icon_btn\" mat-icon-button fxLayoutAlign=\"end center\" color=\"primary\" (click)=\"refresh()\">\r\n                    <mat-icon aria-label=\"Example icon-button with a heart icon\">refresh</mat-icon>\r\n                </button>\r\n            </mat-header-cell>\r\n            <mat-cell *matCellDef=\"let element\"> {{element.Account}} </mat-cell>\r\n        </ng-container>\r\n\r\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n        <mat-row *matRowDef=\"let row; columns: displayedColumns;\" (dblclick)=\"navigateRoomDetails(row)\">\r\n            <!-- (click)=\"selection.toggle(row)\" -->\r\n        </mat-row>\r\n    </mat-table>\r\n    <div class=\"no-results\" [style.display]=\"dataSource.renderedData.length == 0 ? '' : 'none'\">\r\n        No results\r\n    </div>\r\n    <mat-paginator #paginator class=\"custom_mat_paginator\" [length]=\"dataSource.filteredData.length\" [pageIndex]=\"0\" [pageSize]=\"10\"\r\n        [pageSizeOptions]=\"[5, 10, 25, 100]\">\r\n    </mat-paginator>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/layout/room-list/room-list.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/layout/room-list/room-list.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".table_space {\n  margin-top: 15px; }\n\nmat-table mat-header-row mat-header-cell {\n  background-color: #727672 !important;\n  color: #ffffff !important;\n  font-size: 14px !important; }\n\n:host ::ng-deep .custom_mat_list mat-form-field.mat-form-field-invalid div.mat-form-field-underline span.mat-form-field-ripple {\n  background-color: #e47e13 !important; }\n\n:host ::ng-deep .custom_mat_list mat-form-field.mat-focused div.mat-form-field-underline span.mat-form-field-ripple {\n  background-color: #12a7bb !important; }\n\n:host ::ng-deep .custom_mat_list mat-form-field div.mat-form-field-infix mat-select.mat-select div.mat-select-trigger div.mat-select-arrow-wrapper div.mat-select-arrow {\n  color: #303331 !important; }\n\n/* Text Field */\n\n:host ::ng-deep .custom_mat_list mat-form-field div.mat-form-field-wrapper {\n  padding: 6px 0 16px 0 !important;\n  margin: 0 12px !important; }\n\n:host ::ng-deep .custom_mat_list mat-form-field.mat-focused div.mat-form-field-infix input.mat-input-element {\n  color: #303331 !important;\n  font-size: 14px !important; }\n\n:host ::ng-deep .custom_mat_list mat-form-field div.mat-form-field-infix input {\n  padding: 0.4em 0; }\n\n:host ::ng-deep .custom_mat_list mat-form-field div.mat-form-field-infix span.mat-form-field-label-wrapper label.mat-form-field-label {\n  color: #303331 !important;\n  font-size: 18px !important; }\n\n:host ::ng-deep .custom_mat_list mat-form-field.mat-focused div.mat-form-field-infix span.mat-form-field-label-wrapper label.mat-form-field-label {\n  color: #303331 !important;\n  font-size: 18px !important; }\n\n/* Button */\n\n.icon_btn {\n  color: #ffffff !important;\n  outline: none !important;\n  place-content: center !important;\n  /*margin: 0 5px 0 5px !important*/ }\n\n.icon_btn:hover {\n  color: #12a7bb !important;\n  outline: none !important;\n  place-content: center !important; }\n\n/* Pageination */\n\n:host ::ng-deep .custom_mat_paginator mat-form-field.mat-focused div.mat-form-field-underline span.mat-form-field-ripple {\n  background-color: #12a7bb !important; }\n\n:host ::ng-deep .custom_mat_paginator mat-form-field div.mat-form-field-infix mat-select.mat-select div.mat-select-trigger div.mat-select-arrow-wrapper div.mat-select-arrow {\n  color: #303331 !important; }\n\n:host ::ng-deep .custom_mat_paginator div.mat-paginator-range-actions div.mat-paginator-range-label {\n  color: #303331 !important; }\n\n:host ::ng-deep .custom_mat_paginator div.mat-paginator-range-actions button.mat-icon-button {\n  outline: none !important; }\n\n.no-results {\n  text-align: center;\n  padding: 25px 0; }\n"

/***/ }),

/***/ "./src/app/layout/room-list/room-list.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/layout/room-list/room-list.component.ts ***!
  \*********************************************************/
/*! exports provided: RoomListComponent, RoomDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomListComponent", function() { return RoomListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomDataSource", function() { return RoomDataSource; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _core_token_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/token.storage */ "./src/app/core/token.storage.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _dialogs_add_add_dialog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dialogs/add/add.dialog.component */ "./src/app/layout/room-list/dialogs/add/add.dialog.component.ts");
/* harmony import */ var _services_room_list_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/room-list.service */ "./src/app/layout/room-list/services/room-list.service.ts");
/* harmony import */ var _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/o365Auth.service */ "./src/app/layout/room-list/services/o365Auth.service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













// Discard emitted values that take less than the specified time between output
var DEBOUNCE_TIME = 150;
var RoomListComponent = /** @class */ (function () {
    function RoomListComponent(router, o365AuthService, roomListService, dialog, token, httpClient) {
        this.router = router;
        this.o365AuthService = o365AuthService;
        this.roomListService = roomListService;
        this.dialog = dialog;
        this.token = token;
        this.httpClient = httpClient;
        this.view = [
            { value: 'all', viewValue: 'All' },
            { value: 'active', viewValue: 'Active' },
            { value: 'unassigned', viewValue: 'Unassigned' },
        ];
        this.displayedColumns = ['Activated', 'RoomName', 'Place', 'Devices', 'Account'];
        // dataSource = new MatTableDataSource<Room>(ROOM_DATA);
        this.selection = new _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__["SelectionModel"](true, []);
        this.defaultDialogConfig = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogConfig"]();
        this.defaultDialogConfig.disableClose = true;
        this.defaultDialogConfig.autoFocus = true;
    }
    RoomListComponent.prototype.ngOnInit = function () {
        this.filterForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"]({
            View: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]('all'),
            Search: new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''),
        });
        this.refresh();
    };
    RoomListComponent.prototype.refresh = function () {
        this.loadData();
    };
    RoomListComponent.prototype.loadData = function () {
        var _this = this;
        this.roomDatabase = new _services_room_list_service__WEBPACK_IMPORTED_MODULE_10__["RoomListService"](this.httpClient, this.token);
        this.dataSource = new RoomDataSource(this.roomDatabase, this.paginator, this.sort);
        Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["fromEvent"])(this.filter.nativeElement, 'keyup')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["debounceTime"])(DEBOUNCE_TIME), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["distinctUntilChanged"])())
            .subscribe(function () {
            if (!_this.dataSource) {
                return;
            }
            _this.dataSource.filter = _this.filterForm.value;
        });
    };
    /** Whether the number of selected elements matches the total number of rows. */
    RoomListComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.renderedData.length;
        return numSelected === numRows;
    };
    RoomListComponent.prototype.onSelection = function (e) {
        if (!this.dataSource) {
            return;
        }
        this.dataSource.filter = this.filterForm.value;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    RoomListComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected()
            ? this.selection.clear()
            : this.dataSource.renderedData.forEach(function (row) { return _this.selection.select(row); });
    };
    RoomListComponent.prototype.navigateRoomDetails = function (row) {
        var route = '/roomdetail/' + row.id;
        this.router.navigate([route]);
    };
    RoomListComponent.prototype.addNew = function (room) {
        var _this = this;
        this.o365AuthService.getUser().then(function (user) {
            if (user.idToken == null) {
                _this.o365AuthService.login();
            }
            else {
                _this.defaultDialogConfig.data = { tenant: room };
                var dialogRef = _this.dialog.open(_dialogs_add_add_dialog_component__WEBPACK_IMPORTED_MODULE_9__["AddDialogComponent"], _this.defaultDialogConfig);
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result === 1) {
                        _this.refresh();
                    }
                });
            }
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginator"])
    ], RoomListComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSort"])
    ], RoomListComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('filter'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], RoomListComponent.prototype, "filter", void 0);
    RoomListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-room-list',
            template: __webpack_require__(/*! ./room-list.component.html */ "./src/app/layout/room-list/room-list.component.html"),
            styles: [__webpack_require__(/*! ./room-list.component.scss */ "./src/app/layout/room-list/room-list.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_11__["O365AuthService"],
            _services_room_list_service__WEBPACK_IMPORTED_MODULE_10__["RoomListService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            _core_token_storage__WEBPACK_IMPORTED_MODULE_7__["TokenStorage"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]])
    ], RoomListComponent);
    return RoomListComponent;
}());

var RoomDataSource = /** @class */ (function (_super) {
    __extends(RoomDataSource, _super);
    function RoomDataSource(_roomDatabase, _paginator, _sort) {
        var _this = _super.call(this) || this;
        _this._roomDatabase = _roomDatabase;
        _this._paginator = _paginator;
        _this._sort = _sort;
        _this._filterChange = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]({ View: 'all', Search: '' });
        _this.filteredData = [];
        _this.renderedData = [];
        // Reset to the first page when the user changes the filter.
        _this._filterChange.subscribe(function () { return (_this._paginator.pageIndex = 0); });
        return _this;
    }
    Object.defineProperty(RoomDataSource.prototype, "filter", {
        get: function () {
            return this._filterChange.value;
        },
        set: function (filter) {
            this._filterChange.next(filter);
        },
        enumerable: true,
        configurable: true
    });
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    RoomDataSource.prototype.connect = function () {
        var _this = this;
        // Listen for any changes in the base data, sorting, filtering, or pagination
        var displayDataChanges = [
            this._roomDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page,
        ];
        this._roomDatabase.getAllRooms();
        return rxjs__WEBPACK_IMPORTED_MODULE_4__["merge"].apply(void 0, displayDataChanges).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function () {
            // Filter data
            _this.filteredData = _this._roomDatabase.data.slice().filter(function (room) {
                var isMatched = false;
                var roomStatus = _this.filter.View === 'all'
                    ? null
                    : _this.filter.View === 'active'
                        ? true
                        : false;
                if (roomStatus == null && _this.filter.Search.length === 0) {
                    isMatched = true;
                }
                else if (roomStatus !== null && _this.filter.Search.length > 0) {
                    var searchStr = (room.RoomName +
                        room.Account +
                        room.Place +
                        room.Note).toLowerCase();
                    if (room.Activated === roomStatus &&
                        searchStr.indexOf(_this.filter.Search.toLowerCase()) !== -1) {
                        isMatched = true;
                    }
                }
                else if (roomStatus !== null && room.Activated === roomStatus) {
                    isMatched = true;
                }
                else if (_this.filter.Search.length > 0) {
                    var searchStr = (room.RoomName +
                        room.Account +
                        room.Place +
                        room.Note).toLowerCase();
                    isMatched = searchStr.indexOf(_this.filter.Search.toLowerCase()) !== -1;
                }
                return isMatched;
            });
            var sortedData = _this.sortData(_this.filteredData.slice());
            // Grab the page's slice of the filtered sorted data.
            var startIndex = _this._paginator.pageIndex * _this._paginator.pageSize;
            _this.renderedData = sortedData.splice(startIndex, _this._paginator.pageSize);
            return _this.renderedData;
        }));
    };
    RoomDataSource.prototype.disconnect = function () { };
    /** Returns a sorted copy of the database data. */
    RoomDataSource.prototype.sortData = function (data) {
        var _this = this;
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }
        return data.sort(function (a, b) {
            var _a, _b, _c, _d, _e, _f;
            var propertyA = '';
            var propertyB = '';
            switch (_this._sort.active) {
                case 'Activated':
                    _a = [a.Activated.valueOf(), b.Activated.valueOf()], propertyA = _a[0], propertyB = _a[1];
                    break;
                case 'RoomName':
                    _b = [a.RoomName, b.RoomName], propertyA = _b[0], propertyB = _b[1];
                    break;
                case 'Place':
                    _c = [a.Place, b.Place], propertyA = _c[0], propertyB = _c[1];
                    break;
                case 'Account':
                    _d = [a.Account, b.Account], propertyA = _d[0], propertyB = _d[1];
                    break;
                case 'RoomId':
                    _e = [a.RoomId, b.RoomId], propertyA = _e[0], propertyB = _e[1];
                    break;
                case 'Note':
                    _f = [a.Note, b.Note], propertyA = _f[0], propertyB = _f[1];
                    break;
            }
            var valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            var valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (_this._sort.direction === 'asc' ? 1 : -1);
        });
    };
    return RoomDataSource;
}(_angular_cdk_collections__WEBPACK_IMPORTED_MODULE_1__["DataSource"]));



/***/ }),

/***/ "./src/app/layout/room-list/room-list.module.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/room-list/room-list.module.ts ***!
  \******************************************************/
/*! exports provided: RoomListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomListModule", function() { return RoomListModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _room_list_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./room-list-routing.module */ "./src/app/layout/room-list/room-list-routing.module.ts");
/* harmony import */ var _room_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./room-list.component */ "./src/app/layout/room-list/room-list.component.ts");
/* harmony import */ var _services_room_list_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/room-list.service */ "./src/app/layout/room-list/services/room-list.service.ts");
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../material/material.module */ "./src/app/material/material.module.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_interceptor__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../app.interceptor */ "./src/app/app.interceptor.ts");
/* harmony import */ var _dialogs_add_add_dialog_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./dialogs/add/add.dialog.component */ "./src/app/layout/room-list/dialogs/add/add.dialog.component.ts");
/* harmony import */ var _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/o365Auth.service */ "./src/app/layout/room-list/services/o365Auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var RoomListModule = /** @class */ (function () {
    function RoomListModule() {
    }
    RoomListModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _room_list_routing_module__WEBPACK_IMPORTED_MODULE_3__["RoomListRoutingModule"],
                _material_material_module__WEBPACK_IMPORTED_MODULE_6__["AppMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_9__["MatPaginatorModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__["TranslateModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_8__["FlexLayoutModule"],
            ],
            entryComponents: [_dialogs_add_add_dialog_component__WEBPACK_IMPORTED_MODULE_12__["AddDialogComponent"]],
            providers: [
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_10__["HTTP_INTERCEPTORS"],
                    useClass: _app_interceptor__WEBPACK_IMPORTED_MODULE_11__["Interceptor"],
                    multi: true,
                },
                _services_room_list_service__WEBPACK_IMPORTED_MODULE_5__["RoomListService"], _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_13__["O365AuthService"]
            ],
            declarations: [_room_list_component__WEBPACK_IMPORTED_MODULE_4__["RoomListComponent"], _dialogs_add_add_dialog_component__WEBPACK_IMPORTED_MODULE_12__["AddDialogComponent"]],
        })
    ], RoomListModule);
    return RoomListModule;
}());



/***/ }),

/***/ "./src/app/layout/room-list/services/o365Auth.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/room-list/services/o365Auth.service.ts ***!
  \***************************************************************/
/*! exports provided: O365AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "O365AuthService", function() { return O365AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _core_token_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/token.storage */ "./src/app/core/token.storage.ts");
/* harmony import */ var _microsoft_microsoft_graph_client_lib_src__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @microsoft/microsoft-graph-client/lib/src */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/index.js");
/* harmony import */ var _microsoft_microsoft_graph_client_lib_src__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_microsoft_microsoft_graph_client_lib_src__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var msal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! msal */ "./node_modules/msal/lib-commonjs/index.js");
/* harmony import */ var msal__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(msal__WEBPACK_IMPORTED_MODULE_6__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







// import { SspRoomService } from './ssp-room.service';
var graphAPIScopes = [
    'User.ReadBasic.All',
    'Contacts.Read',
    'Contacts.ReadWrite',
    'Files.ReadWrite.All',
    'Calendars.ReadWrite',
    'Calendars.ReadWrite.Shared',
    'People.Read'
];
var logger = new msal__WEBPACK_IMPORTED_MODULE_6__["Logger"](loggerCallback, {
    level: msal__WEBPACK_IMPORTED_MODULE_6__["LogLevel"].Verbose,
    correlationId: '12345'
});
function loggerCallback(logLevel, message, piiEnabled) {
    console.log(message);
}
var userAgentApplication = new msal__WEBPACK_IMPORTED_MODULE_6__["UserAgentApplication"](_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].msalconfig.clientID, null, authCallback, {
    cacheLocation: 'localStorage',
    logger: logger,
    redirectUri: _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].msalconfig.redirectUri
    // isAngular: true // MSAL library future support for Angular
}); // cacheLocation defaults to sessionStorage if not set in the constructor
function authCallback(errorDesc, token, error, tokenType) {
    // This function is called after loginRedirect and acquireTokenRedirect. Use tokenType to determine context.
    // For loginRedirect, tokenType = 'id_token'. For acquireTokenRedirect, tokenType:'access_token'.
    console.log('Global Token ' + token);
    if (token) {
        userAgentApplication
            .acquireTokenSilent(graphAPIScopes, userAgentApplication.authority, userAgentApplication.getUser())
            .then(function (accessToken) {
            console.log('authCallback :' + accessToken);
        }, function (acquireTokenSilentError) {
            console.log(acquireTokenSilentError);
            userAgentApplication.acquireTokenPopup(graphAPIScopes).then(function (accessToken) {
                console.log('On pop Access Token' + accessToken);
            }, function (acquireTokenPopupError) {
                console.log(acquireTokenPopupError);
            });
        });
    }
    else if (errorDesc || error) {
        console.log(error + ':' + errorDesc);
    }
}
var O365AuthService = /** @class */ (function () {
    function O365AuthService(http, router, token1) {
        this.http = http;
        this.router = router;
        this.token1 = token1;
        this.access_token = null;
        this.isAuthenticated = false;
        userAgentApplication = new msal__WEBPACK_IMPORTED_MODULE_6__["UserAgentApplication"](_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].msalconfig.clientID, null, function (errorDesc, token, error, tokenType) {
            console.log('O365Token :' + tokenType + token);
        }, {
            cacheLocation: 'localStorage',
            logger: logger,
            redirectUri: _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].msalconfig.redirectUri,
        }); // cacheLocation defaults to sessionStorage if not set in the constructor
    }
    O365AuthService.prototype.getUser = function () {
        return this.authenticated.then(function (isauthenticated) { return (isauthenticated ? userAgentApplication.getUser() : {}); });
    };
    Object.defineProperty(O365AuthService.prototype, "authenticated", {
        get: function () {
            return this.token.then(function (t) { return !!t; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(O365AuthService.prototype, "token", {
        get: function () {
            return this.getToken();
        },
        enumerable: true,
        configurable: true
    });
    O365AuthService.prototype.login = function () {
        return this.loginRedirect();
    };
    O365AuthService.prototype.getToken = function () {
        return userAgentApplication
            .acquireTokenSilent(graphAPIScopes, userAgentApplication.authority, userAgentApplication.getUser())
            .then(function (token) {
            return token;
        })
            .catch(function (error) {
            return userAgentApplication
                .acquireTokenPopup(graphAPIScopes)
                .then(function (token) {
                return Promise.resolve(token);
            })
                .catch(function (innererror) {
                return Promise.resolve('');
            });
        });
    };
    O365AuthService.prototype.tokenReceivedCallBack = function (errorDesc, token, error, tokenType) {
        console.log('Callback for login');
        console.log(tokenType + token);
        this.syncRooms();
    };
    O365AuthService.prototype.getO365Rooms = function (roomNameToSearch, callback) {
        var _this = this;
        this.getToken().then(
        // Get Access Token
        function (access_token) {
            if (access_token) {
                _this.msGraphclient = _microsoft_microsoft_graph_client_lib_src__WEBPACK_IMPORTED_MODULE_4__["Client"].init({
                    authProvider: function (done) {
                        done(null, access_token); // first parameter takes an error if you can't get an access token
                    },
                });
                // let roomNameToSearch = '';
                if (roomNameToSearch != null &&
                    roomNameToSearch.length > 0 &&
                    roomNameToSearch.toLowerCase().trim() !== 'all') {
                    roomNameToSearch =
                        '&$filter = startswith(displayName, \'' + roomNameToSearch + '\')';
                }
                // Fetch room information
                //
                _this.msGraphclient
                    .api('users?$select=id,displayName,userPrincipalName,userType,officeLocation&$top=10' + roomNameToSearch)
                    .version('v1.0')
                    .get(function (err, res) {
                    console.log(res);
                    var rooms = [];
                    for (var _i = 0, _a = res.value; _i < _a.length; _i++) {
                        var resIter = _a[_i];
                        // const room: MicrosoftGraph.EmailAddress = resIter.userPrincipalName;
                        rooms.push({
                            name: resIter.displayName.toString(),
                            emailId: resIter.userPrincipalName.toString(),
                        });
                    } // Iterate Rooms
                    callback(rooms);
                });
            }
        });
    };
    O365AuthService.prototype.syncRooms = function () {
        var _this = this;
        this.getToken().then(
        // Get Access Token
        function (access_token) {
            if (access_token) {
                _this.msGraphclient = _microsoft_microsoft_graph_client_lib_src__WEBPACK_IMPORTED_MODULE_4__["Client"].init({
                    authProvider: function (done) {
                        done(null, access_token); // first parameter takes an error if you can't get an access token
                    },
                });
                // Fetch room information
                //
                _this.msGraphclient
                    .api('/me/people?$top=1000&$filter=personType/subclass eq \'Room\'')
                    .version('v1.0')
                    .get(function (err, res) {
                    console.log(res);
                    // const rooms: [MicrosoftGraph.EmailAddress] = res.value;
                    for (var _i = 0, _a = res.value; _i < _a.length; _i++) {
                        var resIter = _a[_i];
                        var room = resIter.userPrincipalName;
                        var createRoom = {
                            id: '',
                            RoomName: room.toString(),
                            DisplayModel: '',
                            PcId: '',
                            BotId: '',
                            StationId: '',
                            TenantId: _this.token1.getTenantName(),
                            TenantValue: _this.token1.getTenantValue(),
                        };
                        // this.createRoomService.createSspRoom(createRoom).subscribe(data => {
                        //     console.log('' + JSON.stringify(data));
                        // });
                    } // Iterate Rooms
                });
            }
        });
    };
    O365AuthService.prototype.logout = function () {
        userAgentApplication.logout();
    };
    O365AuthService.prototype.loginRedirect = function () {
        userAgentApplication.loginRedirect(graphAPIScopes);
    };
    O365AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _core_token_storage__WEBPACK_IMPORTED_MODULE_3__["TokenStorage"]])
    ], O365AuthService);
    return O365AuthService;
}());



/***/ })

}]);
//# sourceMappingURL=room-list-room-list-module.js.map