(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ssp-download-ssp-download-module"],{

/***/ "./src/app/layout/ssp-download/ssp-download-routing.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/layout/ssp-download/ssp-download-routing.module.ts ***!
  \********************************************************************/
/*! exports provided: SspDownloadRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SspDownloadRoutingModule", function() { return SspDownloadRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ssp_download_ssp_download_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ssp-download/ssp-download.component */ "./src/app/layout/ssp-download/ssp-download.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: _ssp_download_ssp_download_component__WEBPACK_IMPORTED_MODULE_2__["SspDownloadComponent"],
    },
];
var SspDownloadRoutingModule = /** @class */ (function () {
    function SspDownloadRoutingModule() {
    }
    SspDownloadRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], SspDownloadRoutingModule);
    return SspDownloadRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/ssp-download/ssp-download.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/ssp-download/ssp-download.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"example-container mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"downloadDataSource\" class=\"mat-elevation-z8\">\r\n      <ng-container matColumnDef=\"name\">\r\n        <th mat-header-cell *matHeaderCellDef>{{'Application' | translate }}</th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element.name}} </td>\r\n      </ng-container>  \r\n      <!-- Win-32 Column -->\r\n      <ng-container matColumnDef=\"Windows32\">\r\n        <th mat-header-cell *matHeaderCellDef> {{'Windows 32' | translate }}</th>\r\n        <td mat-cell *matCellDef=\"let element\"><button class=\"btn btn-primary\" (click)=\"downloadFile(element.name, 'windows')\" [disabled]=\"windowsSystem !== true\"> {{'Download' | translate }}</button> </td>\r\n      </ng-container>\r\n      <!-- Win-64 Column -->\r\n      <ng-container matColumnDef=\"Windows64\">\r\n        <th mat-header-cell *matHeaderCellDef>{{'Windows 64' | translate }}</th>\r\n        <td mat-cell *matCellDef=\"let element\"><button class=\"btn btn-primary\" (click)=\"downloadFile(element.name, 'windows')\" [disabled]=\"windowsSystem !== true\"> {{'Download' | translate }}</button></td>\r\n      </ng-container>\r\n      <!-- Mac Column -->\r\n      <ng-container matColumnDef=\"Macintosh\">\r\n        <th mat-header-cell *matHeaderCellDef>{{'Macintosh' | translate }}</th>\r\n        <td mat-cell *matCellDef=\"let element\"><button class=\"btn btn-primary\" (click)=\"downloadFile(element.name, 'mac')\" [disabled]=\"macSystem !== true\">{{'Download' | translate }}</button></td>\r\n      </ng-container>\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedDownloadColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedDownloadColumns;\"></tr>\r\n    </table>\r\n  </div>\r\n\t"

/***/ }),

/***/ "./src/app/layout/ssp-download/ssp-download.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/layout/ssp-download/ssp-download.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n"

/***/ }),

/***/ "./src/app/layout/ssp-download/ssp-download.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/ssp-download/ssp-download.component.ts ***!
  \***************************************************************/
/*! exports provided: SspDownloadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SspDownloadComponent", function() { return SspDownloadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-device-detector */ "./node_modules/ngx-device-detector/ngx-device-detector.umd.js");
/* harmony import */ var ngx_device_detector__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ngx_device_detector__WEBPACK_IMPORTED_MODULE_4__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SspDownloadComponent = /** @class */ (function () {
    function SspDownloadComponent(route, router, http, deviceService) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.deviceService = deviceService;
        this.DownloadUrl = null;
        this.fileName = null;
        this.deviceInfo = null;
        this.DOWNLOAD_APPLICATION_DATA = [
            { name: 'Smart Meeting', Windows32: '', Windows64: '', Macintosh: '' },
            { name: 'Meeting Voice Client', Windows32: '', Windows64: '', Macintosh: '' },
            { name: 'Ssp Admin', Windows32: '', Windows64: '', Macintosh: '' }
        ];
        this.displayedDownloadColumns = ['name', 'Windows32', 'Windows64', 'Macintosh'];
        this.downloadDataSource = this.DOWNLOAD_APPLICATION_DATA;
    }
    SspDownloadComponent.prototype.ngOnInit = function () {
        this.deviceInfo = this.deviceService.getDeviceInfo();
        console.log(JSON.stringify(this.deviceInfo.userAgent));
        if (this.deviceInfo.os === 'windows') {
            this.windowsSystem = true;
        }
        if (this.deviceInfo.os === 'mac') {
            this.macSystem = true;
        }
    };
    SspDownloadComponent.prototype.downloadFile = function (applicationName, os) {
        var _this = this;
        console.log(JSON.stringify(applicationName));
        if (applicationName === 'Smart Meeting' && os !== 'mac') {
            this.DownloadUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].smartMeeting.url;
            this.fileName = applicationName + '.' + 'zip';
        }
        else if (applicationName === 'Meeting Voice Client' && os !== 'mac') {
            this.DownloadUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].meetingVoiceClient.url;
            this.fileName = applicationName + '.' + 'zip';
        }
        else if (applicationName === 'Ssp Admin' && os !== 'mac') {
            console.log('ssp download =====');
            return;
        }
        else if (applicationName === 'Smart Meeting' && os === 'mac') {
            this.DownloadUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].macSmartMeeting.url;
            this.fileName = applicationName + '.' + 'zip';
        }
        else if (applicationName === 'Meeting Voice Client' && os === 'mac') {
            this.DownloadUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].macMeetingVoiceClient.url;
            this.fileName = applicationName + '.' + 'zip';
        }
        else if (applicationName === 'Ssp Admin' && os === 'mac') {
            console.log('ssp download =====');
            return;
        }
        else {
            console.log('mac os =====');
        }
        return this.http
            .get(this.DownloadUrl, {
            responseType: 'blob'
        })
            .subscribe(function (res) {
            var objectUrl = window.URL.createObjectURL(res);
            var appendObject = document.createElement('a');
            document.body.appendChild(appendObject);
            appendObject.setAttribute('style', 'display: none');
            appendObject.href = objectUrl;
            appendObject.download = _this.fileName;
            appendObject.click();
            window.URL.revokeObjectURL(objectUrl);
            appendObject.remove(); // remove the element
        }, function (error) {
            console.log('download error:', JSON.stringify(error));
        });
    };
    SspDownloadComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-ssp-download',
            template: __webpack_require__(/*! ./ssp-download.component.html */ "./src/app/layout/ssp-download/ssp-download.component.html"),
            styles: [__webpack_require__(/*! ./ssp-download.component.scss */ "./src/app/layout/ssp-download/ssp-download.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            ngx_device_detector__WEBPACK_IMPORTED_MODULE_4__["DeviceDetectorService"]])
    ], SspDownloadComponent);
    return SspDownloadComponent;
}());



/***/ }),

/***/ "./src/app/layout/ssp-download/ssp-download.module.ts":
/*!************************************************************!*\
  !*** ./src/app/layout/ssp-download/ssp-download.module.ts ***!
  \************************************************************/
/*! exports provided: SspDownloadModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SspDownloadModule", function() { return SspDownloadModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ssp_download_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ssp-download-routing.module */ "./src/app/layout/ssp-download/ssp-download-routing.module.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ssp_download_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ssp-download.component */ "./src/app/layout/ssp-download/ssp-download.component.ts");
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../material/material.module */ "./src/app/material/material.module.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SspDownloadModule = /** @class */ (function () {
    function SspDownloadModule() {
    }
    SspDownloadModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _ssp_download_routing_module__WEBPACK_IMPORTED_MODULE_2__["SspDownloadRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                _material_material_module__WEBPACK_IMPORTED_MODULE_5__["AppMaterialModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"]
            ],
            declarations: [_ssp_download_component__WEBPACK_IMPORTED_MODULE_4__["SspDownloadComponent"]]
        })
    ], SspDownloadModule);
    return SspDownloadModule;
}());



/***/ })

}]);
//# sourceMappingURL=ssp-download-ssp-download-module.js.map