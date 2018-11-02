(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/layout/room-list/services/room-list.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/layout/room-list/services/room-list.service.ts ***!
  \****************************************************************/
/*! exports provided: RoomListService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoomListService", function() { return RoomListService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _core_token_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/token.storage */ "./src/app/core/token.storage.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RoomListService = /** @class */ (function () {
    function RoomListService(http, Token) {
        this.http = http;
        this.Token = Token;
        this.dataChange = new rxjs__WEBPACK_IMPORTED_MODULE_4__["BehaviorSubject"]([]);
    }
    Object.defineProperty(RoomListService.prototype, "currentRoom", {
        get: function () {
            return this._currentRoom;
        },
        set: function (value) {
            this._currentRoom = value;
        },
        enumerable: true,
        configurable: true
    });
    RoomListService.prototype.createRoom = function (createRoom) {
        createRoom.RoomId = this.uuidv4();
        createRoom.Place = '-',
            createRoom.Activated = false,
            createRoom.Note = '-',
            createRoom.Devices = [
                {
                    DeviceId: this.uuidv4(),
                    // DeviceName: '-',
                    Device: 'Soc IWB',
                },
                {
                    DeviceId: this.uuidv4(),
                    // DeviceName: '-',
                    Device: 'Bot',
                },
                {
                    DeviceId: this.uuidv4(),
                    // DeviceName: '-',
                    Device: 'WePresent',
                },
                {
                    DeviceId: this.uuidv4(),
                    // DeviceName: '-',
                    Device: 'PC',
                },
            ];
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'x-api-key': _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endpoints.key,
            }),
        };
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endpoints.arn, createRoom, httpOptions);
    };
    RoomListService.prototype.getRoom = function (id) {
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'x-api-key': _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endpoints.key,
            }),
        };
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endpoints.arn + '/' + id, httpOptions);
    };
    RoomListService.prototype.deleteRoom = function (id) {
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endpoints.arn + '/' + id);
    };
    RoomListService.prototype.UpdateRoom = function (updateRoom) {
        updateRoom.TenantValue = this.Token.getTenantValue().replace('https://', '');
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'x-api-key': _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endpoints.key,
            }),
        };
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endpoints.arn + '/' + updateRoom.id;
        delete updateRoom.id;
        return this.http.put(url, updateRoom, httpOptions);
    };
    Object.defineProperty(RoomListService.prototype, "data", {
        get: function () {
            return this.dataChange.value;
        },
        enumerable: true,
        configurable: true
    });
    RoomListService.prototype.getAllRooms = function () {
        var _this = this;
        var tenant = this.Token.getTenantValue().replace('https://', '');
        var body = { TenantValue: tenant };
        var httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
                'Content-Type': 'application/json',
                'x-api-key': _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endpoints.key,
            }),
        };
        this.http
            .post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].endpoints.arn + '/' + 'list', body, httpOptions)
            .subscribe(function (data) {
            _this.dataChange.next(data);
        }, function (error) {
            console.log(error.name + ' ' + error.message);
        });
    };
    RoomListService.prototype.uuidv4 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0, v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };
    RoomListService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _core_token_storage__WEBPACK_IMPORTED_MODULE_2__["TokenStorage"]])
    ], RoomListService);
    return RoomListService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map