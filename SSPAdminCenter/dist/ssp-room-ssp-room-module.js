(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["ssp-room-ssp-room-module"],{

/***/ "./src/app/layout/ssp-room/dialogs/add/add.dialog.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/layout/ssp-room/dialogs/add/add.dialog.component.ts ***!
  \*********************************************************************/
/*! exports provided: AddDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddDialogComponent", function() { return AddDialogComponent; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_ssp_room_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/ssp-room.service */ "./src/app/layout/ssp-room/services/ssp-room.service.ts");
/* harmony import */ var _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/o365Auth.service */ "./src/app/layout/ssp-room/services/o365Auth.service.ts");
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
            RoomName: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].email]),
            DisplayModel: ['-'],
            PcId: ['-'],
            BotId: ['-'],
            StationId: ['-'],
            TenantId: [this.token.getTenantName()],
            TenantValue: [this.token.getTenantValue()],
        });
        this.addGroupForm
            .get('RoomName')
            .valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["debounceTime"])(400))
            .subscribe(function (data) {
            _this.o365AuthService.getO365Rooms(data, function (response) {
                _this.roomSearchResult = response;
            });
        });
    };
    AddDialogComponent.prototype.submit = function () {
        // emppty stuff
    };
    AddDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    AddDialogComponent.prototype.confirmAdd = function () {
        if (this.addGroupForm.valid) {
            this.dataService.createSspRoom(this.addGroupForm.value).subscribe(function (data) {
                console.log('d');
            });
        }
    };
    AddDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-add.dialog',
            template: __webpack_require__(/*! ./add.dialog.html */ "./src/app/layout/ssp-room/dialogs/add/add.dialog.html"),
            styles: [__webpack_require__(/*! ./add.dialog.css */ "./src/app/layout/ssp-room/dialogs/add/add.dialog.css")],
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object, _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_4__["O365AuthService"],
            _services_ssp_room_service__WEBPACK_IMPORTED_MODULE_3__["SspRoomService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"],
            _core_token_storage__WEBPACK_IMPORTED_MODULE_6__["TokenStorage"]])
    ], AddDialogComponent);
    return AddDialogComponent;
}());



/***/ }),

/***/ "./src/app/layout/ssp-room/dialogs/add/add.dialog.css":
/*!************************************************************!*\
  !*** ./src/app/layout/ssp-room/dialogs/add/add.dialog.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "    .container {\r\n        display: flex;\r\n        flex-direction: column;\r\n        min-width: 450px;\r\n    }\r\n\r\n    .container>* {\r\n        width: 100%;\r\n    }\r\n\r\n    .form {\r\n        display: flex;\r\n        padding-top: 6px;\r\n    }\r\n\r\n    .mat-form-field {\r\n        font-size: 16px;\r\n        flex-grow: 1;\r\n    }\r\n"

/***/ }),

/***/ "./src/app/layout/ssp-room/dialogs/add/add.dialog.html":
/*!*************************************************************!*\
  !*** ./src/app/layout/ssp-room/dialogs/add/add.dialog.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <h1 mat-dialog-title>{{'AddRoom' | translate }}</h1>\r\n    <div mat-dialog-content>\r\n        <form id='addRoomForm' name='addRoomForm' #addRoomForm [formGroup]=\"addGroupForm\">\r\n            <mat-form-field class=\"align-center\">\r\n                <input id='RoomName' name='RoomName' #RoomName matInput type=\"email\" placeholder=\"{{'RoomName' | translate }}\" formControlName=\"RoomName\"\r\n                    [matAutocomplete]=\"auto\">\r\n                <mat-autocomplete #auto=\"matAutocomplete\">\r\n                    <mat-option *ngFor=\"let room of roomSearchResult\" [value]=\"room\" (onSelectionChange)=\"RoomName.value = room\">\r\n                        {{ room }}\r\n                    </mat-option>\r\n                </mat-autocomplete>\r\n                <mat-error *ngIf=\"addGroupForm.get('RoomName').hasError('required')\">{{'EnterValue' | translate }}</mat-error>\r\n                <mat-error *ngIf=\"addGroupForm.get('RoomName').hasError('email')\">{{'InvalidEmail' | translate }}</mat-error>\r\n            </mat-form-field>\r\n        </form>\r\n    </div>\r\n    <div mat-dialog-actions>\r\n        <button mat-button [type]=\"submit\" [mat-dialog-close]=\"1\" [disabled]='addGroupForm.invalid' (click)=\"confirmAdd()\">{{'Save' | translate }}</button>\r\n        <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\">{{'Cancel' | translate }}</button>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/layout/ssp-room/dialogs/edit/edit.dialog.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/layout/ssp-room/dialogs/edit/edit.dialog.component.ts ***!
  \***********************************************************************/
/*! exports provided: EditDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditDialogComponent", function() { return EditDialogComponent; });
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_ssp_room_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/ssp-room.service */ "./src/app/layout/ssp-room/services/ssp-room.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
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




var EditDialogComponent = /** @class */ (function () {
    function EditDialogComponent(dialogRef, data, dataService, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.dataService = dataService;
        this.fb = fb;
    }
    EditDialogComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            RoomName: this.data.RoomName,
            DisplayModel: this.data.DisplayModel,
            PcId: this.data.PcId,
            BotId: this.data.BotId,
            StationId: this.data.StationId
        });
    };
    EditDialogComponent.prototype.submit = function () {
        // emppty stuff
    };
    EditDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    EditDialogComponent.prototype.stopEdit = function () {
        this.dataService.UpdateSspRoom(this.data).subscribe(function (data) {
            console.log(JSON.stringify(data));
        });
    };
    EditDialogComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-baza.dialog',
            template: __webpack_require__(/*! ../../dialogs/edit/edit.dialog.html */ "./src/app/layout/ssp-room/dialogs/edit/edit.dialog.html"),
            styles: [__webpack_require__(/*! ../../dialogs/edit/edit.dialog.css */ "./src/app/layout/ssp-room/dialogs/edit/edit.dialog.css")]
        }),
        __param(1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_0__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_0__["MatDialogRef"], Object, _services_ssp_room_service__WEBPACK_IMPORTED_MODULE_2__["SspRoomService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], EditDialogComponent);
    return EditDialogComponent;
}());



/***/ }),

/***/ "./src/app/layout/ssp-room/dialogs/edit/edit.dialog.css":
/*!**************************************************************!*\
  !*** ./src/app/layout/ssp-room/dialogs/edit/edit.dialog.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-width: 450px;\r\n}\r\n\r\n.container > * {\r\n  width: 100%;\r\n}\r\n\r\n.form {\r\n  display: flex;\r\n  padding-top: 6px;\r\n}\r\n\r\n.mat-form-field {\r\n  font-size: 16px;\r\n  flex-grow: 1;\r\n}\r\n"

/***/ }),

/***/ "./src/app/layout/ssp-room/dialogs/edit/edit.dialog.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/ssp-room/dialogs/edit/edit.dialog.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <h1 mat-dialog-title>Update</h1>\r\n    <div mat-dialog-content>\r\n        <form [formGroup]=\"form\">\r\n            <mat-form-field class=\"align-center\">\r\n                <input matInput type=\"text\" placeholder=\"{{'RoomName' | translate }}\" [(ngModel)]=\"data.RoomName\" formControlName=\"RoomName\"\r\n                    required>\r\n            </mat-form-field>\r\n            <mat-form-field class=\"full-width-input\">\r\n                <input matInput type=\"text\" placeholder=\"{{'DisplayModel' | translate }}\" [(ngModel)]=\"data.DisplayModel\" formControlName=\"DisplayModel\"\r\n                    required>\r\n            </mat-form-field>\r\n            <mat-form-field class=\"full-width-input\">\r\n                <input matInput type=\"text\" placeholder=\"{{'PcId' | translate }}\" [(ngModel)]=\"data.PcId\" formControlName=\"PcId\" required>\r\n            </mat-form-field>\r\n            <mat-form-field class=\"full-width-input\">\r\n                <input matInput type=\"text\" placeholder=\"{{'BotId' | translate }}\" [(ngModel)]=\"data.BotId\" formControlName=\"BotId\" required>\r\n            </mat-form-field>\r\n            <mat-form-field class=\"full-width-input\">\r\n                <input matInput type=\"text\" placeholder=\"{{'StationId' | translate }}\" [(ngModel)]=\"data.StationId\" formControlName=\"StationId\" required>\r\n            </mat-form-field>\r\n        </form>\r\n    </div>\r\n    <div mat-dialog-actions>\r\n        <button mat-button [type]=\"submit\" [mat-dialog-close]=\"1\" (click)=\"stopEdit()\">Save</button>\r\n        <button mat-button (click)=\"onNoClick()\" tabindex=\"-1\">Cancel</button>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/layout/ssp-room/services/o365Auth.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/ssp-room/services/o365Auth.service.ts ***!
  \**************************************************************/
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
/* harmony import */ var _ssp_room_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ssp-room.service */ "./src/app/layout/ssp-room/services/ssp-room.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








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
    function O365AuthService(http, router, token1, createRoomService) {
        this.http = http;
        this.router = router;
        this.token1 = token1;
        this.createRoomService = createRoomService;
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
                    .api('users?$select=id,displayName,userPrincipalName,userType&$top=10' +
                    roomNameToSearch)
                    .version('v1.0')
                    .get(function (err, res) {
                    console.log(res);
                    var rooms = [];
                    for (var _i = 0, _a = res.value; _i < _a.length; _i++) {
                        var resIter = _a[_i];
                        // const room: MicrosoftGraph.EmailAddress = resIter.userPrincipalName;
                        rooms.push(resIter.userPrincipalName.toString());
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
                        _this.createRoomService.createSspRoom(createRoom).subscribe(function (data) {
                            console.log('' + JSON.stringify(data));
                        });
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
            _core_token_storage__WEBPACK_IMPORTED_MODULE_3__["TokenStorage"],
            _ssp_room_service__WEBPACK_IMPORTED_MODULE_7__["SspRoomService"]])
    ], O365AuthService);
    return O365AuthService;
}());



/***/ }),

/***/ "./src/app/layout/ssp-room/services/ssp-room.service.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/ssp-room/services/ssp-room.service.ts ***!
  \**************************************************************/
/*! exports provided: SspRoomService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SspRoomService", function() { return SspRoomService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _core_token_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/token.storage */ "./src/app/core/token.storage.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SspRoomService = /** @class */ (function () {
    function SspRoomService(http, Token) {
        this.http = http;
        this.Token = Token;
        this.dataChange = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]([]);
    }
    SspRoomService.prototype.createSspRoom = function (createSspRoom) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'x-api-key': _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].sspendpoints.key
            })
        };
        delete createSspRoom.id;
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].sspendpoints.arn, createSspRoom, httpOptions);
    };
    SspRoomService.prototype.getSspRoom = function () {
        var body = { id: 'TenantValue', value: this.Token.getTenantValue() };
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'x-api-key': _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].sspendpoints.key
            })
        };
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].sspendpoints.arn + '/' + 'query', body, httpOptions);
    };
    SspRoomService.prototype.deleteSspRoom = function (id) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'x-api-key': _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].sspendpoints.key
            })
        };
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].sspendpoints.arn + '/' + id, httpOptions);
    };
    SspRoomService.prototype.UpdateSspRoom = function (updateSspRoom) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'x-api-key': _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].sspendpoints.key
            })
        };
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].sspendpoints.arn + '/' + updateSspRoom.id;
        delete updateSspRoom.id;
        return this.http.put(url, updateSspRoom, httpOptions);
    };
    Object.defineProperty(SspRoomService.prototype, "data", {
        get: function () {
            return this.dataChange.value;
        },
        enumerable: true,
        configurable: true
    });
    SspRoomService.prototype.getAllRooms = function () {
        var _this = this;
        var body = { id: 'TenantValue', value: this.Token.getTenantValue() };
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'x-api-key': _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].sspendpoints.key
            })
        };
        this.http
            .post(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].sspendpoints.arn + '/' + 'query', body, httpOptions)
            .subscribe(function (data) {
            _this.dataChange.next(data);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    SspRoomService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _core_token_storage__WEBPACK_IMPORTED_MODULE_3__["TokenStorage"]])
    ], SspRoomService);
    return SspRoomService;
}());



/***/ }),

/***/ "./src/app/layout/ssp-room/ssp-room-routing.module.ts":
/*!************************************************************!*\
  !*** ./src/app/layout/ssp-room/ssp-room-routing.module.ts ***!
  \************************************************************/
/*! exports provided: SspRoomRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SspRoomRoutingModule", function() { return SspRoomRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ssp_room_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ssp-room.component */ "./src/app/layout/ssp-room/ssp-room.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '', component: _ssp_room_component__WEBPACK_IMPORTED_MODULE_2__["SspRoomComponent"]
    }
];
var SspRoomRoutingModule = /** @class */ (function () {
    function SspRoomRoutingModule() {
    }
    SspRoomRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], SspRoomRoutingModule);
    return SspRoomRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/ssp-room/ssp-room.component.html":
/*!*********************************************************!*\
  !*** ./src/app/layout/ssp-room/ssp-room.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<div >\r\n\r\n    <mat-card>\r\n        <mat-card-title>Import Office 365</mat-card-title>\r\n        <mat-card-content>\r\n            <button mat-raised-button color=\"primary\" id=\"sspRoom-id-O365-login\" (click)=\"onO365Login()\">Sync O365 Rooms</button>\r\n        </mat-card-content>\r\n    </mat-card>\r\n\r\n    <mat-card>\r\n        <mat-card-title>Room Details</mat-card-title>\r\n        <mat-card-content>\r\n            <div class=\"form\">\r\n                <mat-form-field floatPlaceholder=\"never\" color=\"accent\">\r\n                    <input matInput #filter placeholder=\"{{'SearchRoom' | translate }}\" id=\"ssp-Id-Search-Box\">\r\n                </mat-form-field>\r\n            </div>\r\n            <mat-table #table [dataSource]=\"dataSource\" matSort class=\"mat-cell\">\r\n                <ng-container matColumnDef=\"Room Name\">\r\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>{{'RoomName' | translate }}</mat-header-cell>\r\n                    <mat-cell *matCellDef=\"let row\">{{row.RoomName}}</mat-cell>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"Display Model\">\r\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>{{'DisplayModel' | translate }}</mat-header-cell>\r\n                    <mat-cell *matCellDef=\"let row\"> {{row.DisplayModel}}</mat-cell>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"Pc Id\">\r\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>{{'PcId' | translate }}</mat-header-cell>\r\n                    <mat-cell *matCellDef=\"let row\"> {{row.PcId}}</mat-cell>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"Bot Id\">\r\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>{{'BotId' | translate }}</mat-header-cell>\r\n                    <mat-cell *matCellDef=\"let row\"> {{row.BotId}}</mat-cell>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"Station Id\">\r\n                    <mat-header-cell *matHeaderCellDef mat-sort-header>{{'StationId' | translate }}</mat-header-cell>\r\n                    <mat-cell *matCellDef=\"let row\"> {{row.StationId}}</mat-cell>\r\n                </ng-container>\r\n\r\n                <ng-container matColumnDef=\"delete\">\r\n                    <mat-header-cell *matHeaderCellDef>\r\n                        <button mat-icon-button color=\"primary\" id=\"sspRoom-Id-Add-Room\"(click)=\"addNew()\">\r\n                            <mat-icon aria-label=\"Example icon-button with a heart icon\">add</mat-icon>\r\n                        </button>\r\n                        <button mat-icon-button color=\"primary\" (click)=\"refresh()\">\r\n                            <mat-icon aria-label=\"Example icon-button with a heart icon\">refresh</mat-icon>\r\n                        </button>\r\n                    </mat-header-cell>\r\n                    <mat-cell *matCellDef=\"let room\">\r\n                        <button mat-icon-button (click)=\"deleteRoom(room.id)\" id=\"sspRoom-Id-Delete\">\r\n                            <mat-icon aria-label=\"Example icon-button with a heart icon\">delete</mat-icon>\r\n                        </button>\r\n                        <button mat-icon-button (click)=\"startEdit(room)\" id=\"sspRoom-Id-Edit\">\r\n                            <mat-icon aria-label=\"Example icon-button with a edit icon\">{{'edit' | translate }}</mat-icon>\r\n                        </button>\r\n                    </mat-cell>\r\n                </ng-container>\r\n\r\n                <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\r\n                <mat-row *matRowDef=\"let row; columns: displayedColumns;\"></mat-row>\r\n            </mat-table>\r\n            <div class=\"no-results\" [style.display]=\"dataSource.renderedData.length == 0 ? '' : 'none'\">\r\n                No results\r\n            </div>\r\n            <mat-paginator #paginator [length]=\"dataSource.filteredData.length\" [pageIndex]=\"0\" [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\">\r\n            </mat-paginator>\r\n        </mat-card-content>\r\n    </mat-card>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/layout/ssp-room/ssp-room.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/layout/ssp-room/ssp-room.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-raised-button {\n  background-color: #1ABB9C; }\n\nbody {\n  background-color: #00A000; }\n\n.form {\n  min-height: 56px;\n  max-height: 56px;\n  display: flex;\n  align-items: center;\n  padding: 8px 24px 0;\n  font-size: 20px;\n  justify-content: space-between;\n  border-bottom: 1px solid transparent; }\n\n.no-results {\n  text-align: center;\n  padding: 25px 0; }\n"

/***/ }),

/***/ "./src/app/layout/ssp-room/ssp-room.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/layout/ssp-room/ssp-room.component.ts ***!
  \*******************************************************/
/*! exports provided: SspRoomComponent, SspDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SspRoomComponent", function() { return SspRoomComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SspDataSource", function() { return SspDataSource; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
/* harmony import */ var _core_token_storage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../core/token.storage */ "./src/app/core/token.storage.ts");
/* harmony import */ var _services_ssp_room_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/ssp-room.service */ "./src/app/layout/ssp-room/services/ssp-room.service.ts");
/* harmony import */ var _dialogs_add_add_dialog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dialogs/add/add.dialog.component */ "./src/app/layout/ssp-room/dialogs/add/add.dialog.component.ts");
/* harmony import */ var _dialogs_edit_edit_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dialogs/edit/edit.dialog.component */ "./src/app/layout/ssp-room/dialogs/edit/edit.dialog.component.ts");
/* harmony import */ var _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/o365Auth.service */ "./src/app/layout/ssp-room/services/o365Auth.service.ts");
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
var SspRoomComponent = /** @class */ (function () {
    function SspRoomComponent(fb, o365AuthService, sspRoomService, token, Token, dialog, httpClient) {
        this.fb = fb;
        this.o365AuthService = o365AuthService;
        this.sspRoomService = sspRoomService;
        this.token = token;
        this.Token = Token;
        this.dialog = dialog;
        this.httpClient = httpClient;
        this.displayedColumns = ['Room Name', 'Display Model', 'Pc Id', 'Bot Id', 'Station Id', 'delete'];
        this.defaultDialogConfig = new _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogConfig"]();
        this.defaultDialogConfig.disableClose = true;
        this.defaultDialogConfig.autoFocus = true;
    }
    SspRoomComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            RoomName: [''],
            DisplayModel: [''],
            PcId: [''],
            BotId: [''],
            StationId: [''],
            TenantId: [this.token.getTenantName()],
            TenantValue: [this.token.getTenantValue()],
        });
        this.refresh();
    };
    SspRoomComponent.prototype.refresh = function () {
        this.loadData();
    };
    SspRoomComponent.prototype.loadData = function () {
        var _this = this;
        this.sspDatabase = new _services_ssp_room_service__WEBPACK_IMPORTED_MODULE_8__["SspRoomService"](this.httpClient, this.Token);
        this.dataSource = new SspDataSource(this.sspDatabase, this.paginator, this.sort);
        Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["fromEvent"])(this.filter.nativeElement, 'keyup')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["debounceTime"])(DEBOUNCE_TIME), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])())
            .subscribe(function () {
            if (!_this.dataSource) {
                return;
            }
            _this.dataSource.filter = _this.filter.nativeElement.value;
        });
    };
    // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    SspRoomComponent.prototype.refreshTable = function () {
        // if there's a paginator active we're using it for refresh
        if (this.dataSource._paginator.hasNextPage()) {
            this.dataSource._paginator.nextPage();
            this.dataSource._paginator.previousPage();
            // in case we're on last page this if will tick
        }
        else if (this.dataSource._paginator.hasPreviousPage()) {
            this.dataSource._paginator.previousPage();
            this.dataSource._paginator.nextPage();
            // in all other cases including active filter we do it like this
        }
        else {
            this.dataSource.filter = '';
            this.dataSource.filter = this.filter.nativeElement.value;
        }
    };
    SspRoomComponent.prototype.addNew = function (sspRoom) {
        var _this = this;
        this.o365AuthService.getUser().then(function (user) {
            if (user.idToken == null) {
                _this.o365AuthService.login();
            }
            else {
                _this.defaultDialogConfig.data = { tenant: sspRoom };
                var dialogRef = _this.dialog.open(_dialogs_add_add_dialog_component__WEBPACK_IMPORTED_MODULE_9__["AddDialogComponent"], _this.defaultDialogConfig);
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result === 1) {
                        _this.refresh();
                    }
                });
            }
        });
    };
    SspRoomComponent.prototype.startEdit = function (sspRoom) {
        console.log(JSON.stringify(sspRoom));
        this.defaultDialogConfig.data = sspRoom;
        var dialogRef = this.dialog.open(_dialogs_edit_edit_dialog_component__WEBPACK_IMPORTED_MODULE_10__["EditDialogComponent"], this.defaultDialogConfig);
        dialogRef
            .afterClosed()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["debounceTime"])(400))
            .subscribe(function (result) {
            if (result === 1) {
            }
        });
    };
    SspRoomComponent.prototype.deleteRoom = function (roomId) {
        var _this = this;
        if (roomId !== 'undefined') {
            this.sspRoomService.deleteSspRoom(roomId).subscribe(function (data) {
                console.log('On Delete' + JSON.stringify(data));
                _this.refresh();
            });
        }
    };
    SspRoomComponent.prototype.onO365Login = function () {
        var _this = this;
        this.o365AuthService.getUser().then(function (user) {
            if (user.idToken == null) {
                _this.o365AuthService.login();
            }
            else {
                _this.o365AuthService.syncRooms();
            }
        });
        // this.o365AuthService.login();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginator"])
    ], SspRoomComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSort"])
    ], SspRoomComponent.prototype, "sort", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"])('filter'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"])
    ], SspRoomComponent.prototype, "filter", void 0);
    SspRoomComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-ssp-room',
            template: __webpack_require__(/*! ./ssp-room.component.html */ "./src/app/layout/ssp-room/ssp-room.component.html"),
            styles: [__webpack_require__(/*! ./ssp-room.component.scss */ "./src/app/layout/ssp-room/ssp-room.component.scss")],
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_11__["O365AuthService"],
            _services_ssp_room_service__WEBPACK_IMPORTED_MODULE_8__["SspRoomService"],
            _core_token_storage__WEBPACK_IMPORTED_MODULE_7__["TokenStorage"],
            _core_token_storage__WEBPACK_IMPORTED_MODULE_7__["TokenStorage"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], SspRoomComponent);
    return SspRoomComponent;
}());

var SspDataSource = /** @class */ (function (_super) {
    __extends(SspDataSource, _super);
    function SspDataSource(_sspDatabase, _paginator, _sort) {
        var _this = _super.call(this) || this;
        _this._sspDatabase = _sspDatabase;
        _this._paginator = _paginator;
        _this._sort = _sort;
        _this._filterChange = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]('');
        _this.filteredData = [];
        _this.renderedData = [];
        // Reset to the first page when the user changes the filter.
        _this._filterChange.subscribe(function () { return (_this._paginator.pageIndex = 0); });
        return _this;
    }
    Object.defineProperty(SspDataSource.prototype, "filter", {
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
    SspDataSource.prototype.connect = function () {
        var _this = this;
        // Listen for any changes in the base data, sorting, filtering, or pagination
        var displayDataChanges = [
            this._sspDatabase.dataChange,
            this._sort.sortChange,
            this._filterChange,
            this._paginator.page,
        ];
        this._sspDatabase.getAllRooms();
        return rxjs__WEBPACK_IMPORTED_MODULE_0__["merge"].apply(void 0, displayDataChanges).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function () {
            // Filter data
            _this.filteredData = _this._sspDatabase.data.slice().filter(function (room) {
                var searchStr = (room.id +
                    room.RoomName +
                    room.PcId +
                    room.BotId +
                    room.StationId).toLowerCase();
                return searchStr.indexOf(_this.filter.toLowerCase()) !== -1;
            });
            var sortedData = _this.sortData(_this.filteredData.slice());
            // Grab the page's slice of the filtered sorted data.
            var startIndex = _this._paginator.pageIndex * _this._paginator.pageSize;
            _this.renderedData = sortedData.splice(startIndex, _this._paginator.pageSize);
            return _this.renderedData;
        }));
    };
    SspDataSource.prototype.disconnect = function () { };
    /** Returns a sorted copy of the database data. */
    SspDataSource.prototype.sortData = function (data) {
        var _this = this;
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }
        return data.sort(function (a, b) {
            var _a, _b, _c, _d, _e;
            var propertyA = '';
            var propertyB = '';
            switch (_this._sort.active) {
                case 'id':
                    _a = [a.id, b.id], propertyA = _a[0], propertyB = _a[1];
                    break;
                case 'RoomName':
                    _b = [a.RoomName, b.RoomName], propertyA = _b[0], propertyB = _b[1];
                    break;
                case 'PcId':
                    _c = [a.PcId, b.PcId], propertyA = _c[0], propertyB = _c[1];
                    break;
                case 'BotId':
                    _d = [a.BotId, b.BotId], propertyA = _d[0], propertyB = _d[1];
                    break;
                case 'StationId':
                    _e = [a.StationId, b.StationId], propertyA = _e[0], propertyB = _e[1];
                    break;
            }
            var valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            var valueB = isNaN(+propertyB) ? propertyB : +propertyB;
            return (valueA < valueB ? -1 : 1) * (_this._sort.direction === 'asc' ? 1 : -1);
        });
    };
    return SspDataSource;
}(_angular_cdk_collections__WEBPACK_IMPORTED_MODULE_6__["DataSource"]));



/***/ }),

/***/ "./src/app/layout/ssp-room/ssp-room.module.ts":
/*!****************************************************!*\
  !*** ./src/app/layout/ssp-room/ssp-room.module.ts ***!
  \****************************************************/
/*! exports provided: SspRoomModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SspRoomModule", function() { return SspRoomModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_interceptor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../app.interceptor */ "./src/app/app.interceptor.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _material_material_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../material/material.module */ "./src/app/material/material.module.ts");
/* harmony import */ var _dialogs_edit_edit_dialog_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dialogs/edit/edit.dialog.component */ "./src/app/layout/ssp-room/dialogs/edit/edit.dialog.component.ts");
/* harmony import */ var _dialogs_add_add_dialog_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dialogs/add/add.dialog.component */ "./src/app/layout/ssp-room/dialogs/add/add.dialog.component.ts");
/* harmony import */ var _ssp_room_routing_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ssp-room-routing.module */ "./src/app/layout/ssp-room/ssp-room-routing.module.ts");
/* harmony import */ var _ssp_room_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ssp-room.component */ "./src/app/layout/ssp-room/ssp-room.component.ts");
/* harmony import */ var _services_ssp_room_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/ssp-room.service */ "./src/app/layout/ssp-room/services/ssp-room.service.ts");
/* harmony import */ var _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/o365Auth.service */ "./src/app/layout/ssp-room/services/o365Auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var SspRoomModule = /** @class */ (function () {
    function SspRoomModule() {
    }
    SspRoomModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _ssp_room_routing_module__WEBPACK_IMPORTED_MODULE_10__["SspRoomRoutingModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _material_material_module__WEBPACK_IMPORTED_MODULE_7__["AppMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginatorModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"]
            ],
            exports: [
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatPaginatorModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__["TranslateModule"]
            ],
            entryComponents: [
                _dialogs_edit_edit_dialog_component__WEBPACK_IMPORTED_MODULE_8__["EditDialogComponent"],
                _dialogs_add_add_dialog_component__WEBPACK_IMPORTED_MODULE_9__["AddDialogComponent"]
            ],
            providers: [
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HTTP_INTERCEPTORS"],
                    useClass: _app_interceptor__WEBPACK_IMPORTED_MODULE_4__["Interceptor"],
                    multi: true
                },
                _services_ssp_room_service__WEBPACK_IMPORTED_MODULE_12__["SspRoomService"], _services_o365Auth_service__WEBPACK_IMPORTED_MODULE_13__["O365AuthService"]
            ],
            declarations: [_ssp_room_component__WEBPACK_IMPORTED_MODULE_11__["SspRoomComponent"], _dialogs_edit_edit_dialog_component__WEBPACK_IMPORTED_MODULE_8__["EditDialogComponent"], _dialogs_add_add_dialog_component__WEBPACK_IMPORTED_MODULE_9__["AddDialogComponent"]]
        })
    ], SspRoomModule);
    return SspRoomModule;
}());



/***/ })

}]);
//# sourceMappingURL=ssp-room-ssp-room-module.js.map