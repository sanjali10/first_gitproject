(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["room-list-room-list-module~ssp-room-ssp-room-module"],{

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/GraphHelper.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/GraphHelper.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GraphHelper = /** @class */ (function () {
    function GraphHelper() {
    }
    /*
        This conversion is required due to the following reasons:
            1. Body parameter of Request method of isomorphic-fetch only accepts Blob, ArrayBuffer, FormData, TypedArrays, string.
            2. Node.js platform does not suppport Blob, FormData. Javascript File object inherits from Blob so it is also
                not supported in node. Therefore content of type Blob, File, FormData will only come from browsers.
            3. Parallel to Javascript's arrayBuffer, node provides Buffer interface. Node's Buffer is able to send the arbitary
                binary data to the server successfully for both Browser and Node platform. Whereas sending binary data via
                ArrayBuffer or TypedArrays was only possible using Browser. To support both Node and Browser, `serializeContent`
                converts TypedArrays or ArrayBuffer to `Node Buffer`.
            4. If the data received is in JSON format, `serializeContent` converts the JSON to string.
    */
    GraphHelper.serializeContent = function (content) {
        var className = content.constructor.name;
        if (className === 'Buffer'
            || className === 'Blob'
            || className === 'File'
            || className === 'FormData'
            || typeof content === 'string') {
            return content;
        }
        if (className === 'ArrayBuffer') {
            content = Buffer.from(content);
        }
        else if (className === 'Int8Array'
            || className === 'Int16Array'
            || className === 'Int32Array'
            || className === 'Uint8Array'
            || className === 'Uint16Array'
            || className === 'Uint32Array'
            || className === 'Uint8ClampedArray'
            || className === 'Float32Array'
            || className === 'Float64Array'
            || className === 'DataView') {
            content = Buffer.from(content.buffer);
        }
        else {
            try {
                content = JSON.stringify(content);
            }
            catch (error) {
                console.log(error);
                throw new Error('Invalid JSON content');
            }
        }
        return content;
    };
    return GraphHelper;
}());
exports.GraphHelper = GraphHelper;
//# sourceMappingURL=GraphHelper.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/GraphRequest.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/GraphRequest.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var es6_promise_1 = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js");
__webpack_require__(/*! isomorphic-fetch */ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js");
var common_1 = __webpack_require__(/*! ./common */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/common.js");
var ResponseHandler_1 = __webpack_require__(/*! ./ResponseHandler */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/ResponseHandler.js");
var RequestMethod_1 = __webpack_require__(/*! ./RequestMethod */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/RequestMethod.js");
var ResponseType_1 = __webpack_require__(/*! ./ResponseType */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/ResponseType.js");
var GraphHelper_1 = __webpack_require__(/*! ./GraphHelper */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/GraphHelper.js");
var GraphRequest = /** @class */ (function () {
    function GraphRequest(config, path) {
        var self = this;
        self.config = config;
        self._options = {};
        self._headers = {};
        self.urlComponents = {
            host: self.config.baseUrl,
            version: self.config.defaultVersion,
            oDataQueryParams: {},
            otherURLQueryParams: {}
        };
        self.parsePath(path);
    }
    GraphRequest.prototype.header = function (headerKey, headerValue) {
        var self = this;
        self._headers[headerKey] = headerValue;
        return self;
    };
    GraphRequest.prototype.headers = function (headers) {
        var self = this;
        for (var key in headers) {
            self._headers[key] = headers[key];
        }
        return self;
    };
    GraphRequest.prototype.option = function (key, value) {
        var self = this;
        self._options[key] = value;
        return self;
    };
    GraphRequest.prototype.options = function (options) {
        var self = this;
        for (var key in options) {
            self._options[key] = options[key];
        }
        return self;
    };
    GraphRequest.prototype.parsePath = function (rawPath) {
        // break rawPath into this.urlComponents
        // strip out the base url if they passed it in
        if (rawPath.indexOf("https://") != -1) {
            rawPath = rawPath.replace("https://", "");
            // find where the host ends
            var endOfHostStrPos = rawPath.indexOf("/");
            this.urlComponents.host = "https://" + rawPath.substring(0, endOfHostStrPos); // parse out the host
            // strip the host from rawPath
            rawPath = rawPath.substring(endOfHostStrPos + 1, rawPath.length);
            // then remove the following version
            var endOfVersionStrPos = rawPath.indexOf("/");
            // parse out the version
            this.urlComponents.version = rawPath.substring(0, endOfVersionStrPos);
            // strip version from rawPath
            rawPath = rawPath.substring(endOfVersionStrPos + 1, rawPath.length);
        }
        // strip out any leading "/"
        if (rawPath.charAt(0) == "/") {
            rawPath = rawPath.substr(1);
        }
        var queryStrPos = rawPath.indexOf("?");
        // let afterPath = 
        if (queryStrPos == -1) {
            // no query string
            this.urlComponents.path = rawPath;
        }
        else {
            this.urlComponents.path = rawPath.substr(0, queryStrPos);
            // capture query string into
            // this.urlComponents.oDataQueryParams
            // and
            // this.urlComponents.otherURLQueryParams
            var queryParams = rawPath.substring(queryStrPos + 1, rawPath.length).split("&");
            for (var _i = 0, queryParams_1 = queryParams; _i < queryParams_1.length; _i++) {
                var queryParam = queryParams_1[_i];
                //queryParam:  a=b
                var queryParams_2 = queryParam.split("=");
                var key = queryParams_2[0];
                var value = queryParams_2[1];
                if (common_1.oDataQueryNames.indexOf(key)) {
                    this.urlComponents.oDataQueryParams[key] = value;
                }
                else {
                    this.urlComponents.otherURLQueryParams[key] = value;
                }
            }
        }
    };
    GraphRequest.prototype.urlJoin = function (urlSegments) {
        var tr = function (s) { return s.replace(/\/+$/, ''); };
        var tl = function (s) { return s.replace(/^\/+/, ''); };
        var joiner = function (pre, cur) { return [tr(pre), tl(cur)].join('/'); };
        var parts = Array.prototype.slice.call(urlSegments);
        return parts.reduce(joiner);
    };
    GraphRequest.prototype.buildFullUrl = function () {
        var url = this.urlJoin([this.urlComponents.host,
            this.urlComponents.version,
            this.urlComponents.path])
            + this.createQueryString();
        if (this.config.debugLogging) {
            console.log(url);
        }
        return url;
    };
    GraphRequest.prototype.version = function (v) {
        this.urlComponents.version = v;
        return this;
    };
    /*
     * Accepts .select("displayName,birthday")
     *     and .select(["displayName", "birthday"])
     *     and .select("displayName", "birthday")
     *
     */
    GraphRequest.prototype.select = function (properties) {
        this.addCsvQueryParameter("$select", properties, arguments);
        return this;
    };
    GraphRequest.prototype.expand = function (properties) {
        this.addCsvQueryParameter("$expand", properties, arguments);
        return this;
    };
    GraphRequest.prototype.orderby = function (properties) {
        this.addCsvQueryParameter("$orderby", properties, arguments);
        return this;
    };
    GraphRequest.prototype.filter = function (filterStr) {
        this.urlComponents.oDataQueryParams["$filter"] = filterStr;
        return this;
    };
    GraphRequest.prototype.top = function (n) {
        this.urlComponents.oDataQueryParams["$top"] = n;
        return this;
    };
    GraphRequest.prototype.skip = function (n) {
        this.urlComponents.oDataQueryParams["$skip"] = n;
        return this;
    };
    GraphRequest.prototype.skipToken = function (token) {
        this.urlComponents.oDataQueryParams["$skipToken"] = token;
        return this;
    };
    GraphRequest.prototype.count = function (count) {
        this.urlComponents.oDataQueryParams["$count"] = count.toString();
        return this;
    };
    GraphRequest.prototype.responseType = function (responseType) {
        this._responseType = responseType;
        return this;
    };
    // helper for $select, $expand and $orderby (must be comma separated)
    GraphRequest.prototype.addCsvQueryParameter = function (propertyName, propertyValue, additionalProperties) {
        // if there are already $propertyName value there, append a ","
        this.urlComponents.oDataQueryParams[propertyName] = this.urlComponents.oDataQueryParams[propertyName] ? this.urlComponents.oDataQueryParams[propertyName] + "," : "";
        var allValues = [];
        if (typeof propertyValue === "string") {
            allValues.push(propertyValue);
        }
        else { // propertyValue passed in as array
            allValues = allValues.concat(propertyValue);
        }
        // merge in additionalProperties
        if (additionalProperties.length > 1 && typeof propertyValue === "string") {
            allValues = Array.prototype.slice.call(additionalProperties);
        }
        this.urlComponents.oDataQueryParams[propertyName] += allValues.join(",");
    };
    GraphRequest.prototype.delete = function (callback) {
        var self = this, url = self.buildFullUrl(), options = {
            method: RequestMethod_1.RequestMethod.DELETE
        };
        return self.sendRequestAndRouteResponse(url, options, callback);
    };
    /**
     * Alias for delete call
     */
    GraphRequest.prototype.del = function (callback) {
        return this.delete(callback);
    };
    GraphRequest.prototype.patch = function (content, callback) {
        var self = this, url = self.buildFullUrl(), options = {
            method: RequestMethod_1.RequestMethod.PATCH,
            body: GraphHelper_1.GraphHelper.serializeContent(content),
            headers: {
                "Content-Type": "application/json"
            }
        };
        return self.sendRequestAndRouteResponse(url, options, callback);
    };
    GraphRequest.prototype.post = function (content, callback) {
        var self = this, url = self.buildFullUrl(), options = {
            method: RequestMethod_1.RequestMethod.POST,
            body: GraphHelper_1.GraphHelper.serializeContent(content),
            headers: (content.constructor !== undefined && content.constructor.name === "FormData") ? {} : {
                "Content-Type": "application/json"
            }
        };
        return self.sendRequestAndRouteResponse(url, options, callback);
    };
    /**
     * Alias for Post call
     */
    GraphRequest.prototype.create = function (content, callback) {
        return this.post(content, callback);
    };
    GraphRequest.prototype.put = function (content, callback) {
        var self = this, url = self.buildFullUrl(), options = {
            method: RequestMethod_1.RequestMethod.PUT,
            body: GraphHelper_1.GraphHelper.serializeContent(content),
            headers: {
                "Content-Type": "application/octet-stream"
            }
        };
        return self.sendRequestAndRouteResponse(url, options, callback);
    };
    /**
     * Alias for update call
     */
    GraphRequest.prototype.update = function (content, callback) {
        return this.patch(content, callback);
    };
    GraphRequest.prototype.get = function (callback) {
        var self = this, url = self.buildFullUrl(), options = {
            method: RequestMethod_1.RequestMethod.GET
        };
        return self.sendRequestAndRouteResponse(url, options, callback);
    };
    GraphRequest.prototype.getStream = function (callback) {
        var self = this, url = self.buildFullUrl(), options = {
            method: RequestMethod_1.RequestMethod.GET
        };
        self.responseType(ResponseType_1.ResponseType.STREAM);
        return self.sendRequestAndRouteResponse(url, options, callback);
    };
    GraphRequest.prototype.putStream = function (stream, callback) {
        var self = this, url = self.buildFullUrl(), options = {
            method: RequestMethod_1.RequestMethod.PUT,
            headers: {
                "Content-Type": "application/octet-stream",
            },
            body: stream
        };
        return self.sendRequestAndRouteResponse(url, options, callback);
    };
    /**
     * @private
     * Sends request and routes response to the callback or resolves to promise
     * @param {RequestInfo} request - The Request object or url string value
     * @param {FetchOptions} options - The options for the fetch api request
     * @param {GraphRequestCallback} callback - The callback that needs to be called on response
     * @return The promise in case if the callback param is empty
     */
    GraphRequest.prototype.sendRequestAndRouteResponse = function (request, options, callback) {
        // return a promise when Promises are supported and no callback was provided
        if (callback == null && typeof es6_promise_1.Promise !== "undefined") {
            return this.routeResponseToPromise(request, options);
        }
        else {
            this.routeResponseToCallback(request, options, callback);
        }
    };
    /**
     * @private
     * Gets the Promise that will resolve or reject with fetch api request
     * @param {RequestInfo} request - The Request object or url string value
     * @param {FetchOptions} options - The options for the fetch api request
     * @return The Promise that resolves with Response
     */
    GraphRequest.prototype.routeResponseToPromise = function (request, options) {
        var _this = this;
        return new es6_promise_1.Promise(function (resolve, reject) {
            _this.routeResponseToCallback(request, options, function (err, body) {
                if (err != null) {
                    reject(err);
                }
                else {
                    resolve(body);
                }
            });
        });
    };
    /**
     * @private
     * Makes request to the service by getting auth token from the auth provider
     * @param {RequestInfo} request - The Request object or url string value
     * @param {FetchOptions} options - The options for the fetch api request
     * @param {GraphRequestCallback} callback - The callback function
     */
    GraphRequest.prototype.routeResponseToCallback = function (request, options, callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { }; }
        var self = this;
        self.config.authProvider(function (err, accessToken) {
            if (err == null && accessToken != null) {
                options = self.configureRequestOptions(options, accessToken);
                fetch(request, options).then(function (response) {
                    _this.convertResponseType(response).then(function (responseValue) {
                        ResponseHandler_1.ResponseHandler.init(response, undefined, responseValue, callback);
                    }).catch(function (error) {
                        ResponseHandler_1.ResponseHandler.init(response, error, undefined, callback);
                    });
                }).catch(function (error) {
                    ResponseHandler_1.ResponseHandler.init(undefined, error, undefined, callback);
                });
            }
            else {
                callback(err, null, null);
            }
        });
    };
    /**
     * @private
     * Customizes the fetch options with the Auth token, SDKVersion header and customization applied via init, .header, .headers, .option, .options etc
     * @param {FetchOptions} options - The options for the fetch api request
     * @param {string} accessToken - The access token value
     * @return The fetch options with customization
     */
    GraphRequest.prototype.configureRequestOptions = function (options, accessToken) {
        var self = this, defaultHeaders = {
            Authorization: "Bearer " + accessToken,
            SdkVersion: "graph-js-" + common_1.PACKAGE_VERSION
        };
        var configuredOptions = {
            headers: {}
        };
        Object.assign(configuredOptions, self.config.fetchOptions, self._options, options);
        Object.assign(configuredOptions.headers, defaultHeaders, self._headers, options.headers);
        return configuredOptions;
    };
    // append query strings to the url, accepts either a string like $select=displayName or a dictionary {"$select": "displayName"}
    GraphRequest.prototype.query = function (queryDictionaryOrString) {
        if (typeof queryDictionaryOrString === "string") { // is string
            var queryStr = queryDictionaryOrString;
            var queryKey = queryStr.split("=")[0];
            var queryValue = queryStr.split("=")[1];
            this.urlComponents.otherURLQueryParams[queryKey] = queryValue;
        }
        else { // is dictionary
            for (var key in queryDictionaryOrString) {
                this.urlComponents.otherURLQueryParams[key] = queryDictionaryOrString[key];
            }
        }
        return this;
    };
    // ex: ?$select=displayName&$filter=startsWith(displayName, 'A')
    // does not include starting ?
    GraphRequest.prototype.createQueryString = function () {
        // need to combine first this.urlComponents.oDataQueryParams and this.urlComponents.otherURLQueryParams
        var q = [];
        if (Object.keys(this.urlComponents.oDataQueryParams).length != 0) {
            for (var property in this.urlComponents.oDataQueryParams) {
                q.push(property + "=" + this.urlComponents.oDataQueryParams[property]);
            }
        }
        if (Object.keys(this.urlComponents.otherURLQueryParams).length != 0) {
            for (var property in this.urlComponents.otherURLQueryParams) {
                q.push(property + "=" + this.urlComponents.otherURLQueryParams[property]);
            }
        }
        if (q.length > 0) {
            return "?" + q.join("&");
        }
        return "";
    };
    GraphRequest.prototype.convertResponseType = function (response) {
        var responseValue;
        if (!this._responseType) {
            this._responseType = '';
        }
        switch (this._responseType.toLowerCase()) {
            case ResponseType_1.ResponseType.ARRAYBUFFER:
                responseValue = response.arrayBuffer();
                break;
            case ResponseType_1.ResponseType.BLOB:
                responseValue = response.blob();
                break;
            case ResponseType_1.ResponseType.DOCUMENT:
                // XMLHTTPRequest only :(
                responseValue = response.json();
                break;
            case ResponseType_1.ResponseType.JSON:
                responseValue = response.json();
                break;
            case ResponseType_1.ResponseType.STREAM:
                responseValue = es6_promise_1.Promise.resolve(response.body);
                break;
            case ResponseType_1.ResponseType.TEXT:
                responseValue = response.text();
                break;
            default:
                responseValue = response.json();
                break;
        }
        return responseValue;
    };
    return GraphRequest;
}());
exports.GraphRequest = GraphRequest;
//# sourceMappingURL=GraphRequest.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/Range.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/Range.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module Range
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Class representing Range
*/
var Range = /** @class */ (function () {
    /**
     * Creates a range for given min and max values
     * @param {number} [minVal = -1] - The minimum value.
     * @param {number} [maxVal = -1] - The maximum value.
     */
    function Range(minVal, maxVal) {
        if (minVal === void 0) { minVal = -1; }
        if (maxVal === void 0) { maxVal = -1; }
        var self = this;
        self.minValue = minVal;
        self.maxValue = maxVal;
    }
    return Range;
}());
exports.Range = Range;
//# sourceMappingURL=Range.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/RequestMethod.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/RequestMethod.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RequestMethod;
(function (RequestMethod) {
    RequestMethod["GET"] = "GET";
    RequestMethod["PATCH"] = "PATCH";
    RequestMethod["POST"] = "POST";
    RequestMethod["PUT"] = "PUT";
    RequestMethod["DELETE"] = "DELETE";
})(RequestMethod = exports.RequestMethod || (exports.RequestMethod = {}));
//# sourceMappingURL=RequestMethod.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/ResponseHandler.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/ResponseHandler.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ResponseHandler = /** @class */ (function () {
    function ResponseHandler() {
    }
    ResponseHandler.init = function (res, err, resContents, callback) {
        if (res && res.ok) { // 2xx
            callback(null, resContents, res);
        }
        else { // not OK response
            if (err == null && res != null)
                if (resContents != null && resContents.error != null) // if error was passed to body
                    callback(ResponseHandler.buildGraphErrorFromResponseObject(resContents.error, res.status), null, res);
                else
                    callback(ResponseHandler.defaultGraphError(res.status), null, res);
            else // pass back error as first param
                callback(ResponseHandler.ParseError(err), null, res);
        }
    };
    /*
        Example error for https://graph.microsoft.com/v1.0/me/events?$top=3&$search=foo
        {
            "error": {
                "code": "SearchEvents",
                "message": "The parameter $search is not currently supported on the Events resource.",
                "innerError": {
                    "request-id": "b31c83fd-944c-4663-aa50-5d9ceb367e19",
                    "date": "2016-11-17T18:37:45"
                }
            }
        }
    */
    ResponseHandler.ParseError = function (rawErr) {
        // if we couldn't find an error obj to parse, just return an object with a status code and date
        if (!rawErr) {
            return ResponseHandler.defaultGraphError(-1);
        }
        return ResponseHandler.buildGraphErrorFromErrorObject(rawErr);
    };
    ResponseHandler.defaultGraphError = function (statusCode) {
        return {
            statusCode: statusCode,
            code: null,
            message: null,
            requestId: null,
            date: new Date(),
            body: null
        };
    };
    ResponseHandler.buildGraphErrorFromErrorObject = function (errObj) {
        var error = ResponseHandler.defaultGraphError(-1);
        error.body = errObj.toString();
        error.message = errObj.message;
        error.date = new Date();
        return error;
    };
    ResponseHandler.buildGraphErrorFromResponseObject = function (errObj, statusCode) {
        return {
            statusCode: statusCode,
            code: errObj.code,
            message: errObj.message,
            requestId: (errObj.innerError !== undefined) ? errObj.innerError["request-id"] : "",
            date: (errObj.innerError !== undefined) ? new Date(errObj.innerError.date) : new Date(),
            body: errObj
        };
    };
    return ResponseHandler;
}());
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=ResponseHandler.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/ResponseType.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/ResponseType.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @enum
 * Enum for ResponseType values
 * @property {string} ARRAYBUFFER - To download response content as an [ArrayBuffer]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer}
 * @property {string} BLOB - To download content as a [binary/blob] {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob}
 * @property {string} DOCUMENT - This downloads content as a json, See [this for more info]{@link https://github.com/microsoftgraph/msgraph-sdk-javascript/pull/63}
 * @property {string} JSON - To download response content as a json
 * @property {string} STREAM - To download response as a [stream]{@link https://nodejs.org/api/stream.html}
 * @property {string} TEXT - For downloading response as a text
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseType;
(function (ResponseType) {
    ResponseType["ARRAYBUFFER"] = "arraybuffer";
    ResponseType["BLOB"] = "blob";
    ResponseType["DOCUMENT"] = "document";
    ResponseType["JSON"] = "json";
    ResponseType["STREAM"] = "stream";
    ResponseType["TEXT"] = "text";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
//# sourceMappingURL=ResponseType.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/common.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/common.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.oDataQueryNames = ["select", "expand", "orderby", "filter", "top", "skip", "skipToken", "count"];
exports.DEFAULT_VERSION = "v1.0";
exports.GRAPH_BASE_URL = "https://graph.microsoft.com/";
/**
 * @constant
 * A package version
 * @NOTE: This should be kept up to date with the version used in package.json.
 * If you are changing this please ensure you are also changing it in package.json.
 */
exports.PACKAGE_VERSION = "1.2.0";
/**
 * @extends
 * support oData params with and without $ prefix
 */
exports.oDataQueryNames = exports.oDataQueryNames.concat(exports.oDataQueryNames.map(function (s) { return "$" + s; }));
//# sourceMappingURL=common.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/content/BatchRequestContent.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/content/BatchRequestContent.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module BatchRequestContent
 */
var RequestMethod_1 = __webpack_require__(/*! ../RequestMethod */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/RequestMethod.js");
/**
 * Class for handling BatchRequestContent
 */
var BatchRequestContent = /** @class */ (function () {
    /**
     * Constructs a BatchRequestContent instance
     * @param {BatchRequestStep[]} [requests] - Array of requests value
     */
    function BatchRequestContent(requests) {
        var self = this;
        self.requests = new Map();
        if (typeof requests !== "undefined") {
            var limit = BatchRequestContent.requestLimit;
            if (requests.length > limit) {
                var error = new Error("Maximum requests limit exceeded, Max allowed number of requests are " + limit);
                error.name = "Limit Exceeded Error";
                throw error;
            }
            for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
                var req = requests_1[_i];
                self.addRequest(req);
            }
        }
    }
    /**
     * Adds a request to the batch request content
     * @param {BatchRequestStep} request - The request value
     * @return The id of the added request
     */
    BatchRequestContent.prototype.addRequest = function (request) {
        var self = this, limit = BatchRequestContent.requestLimit;
        if (request.id === "") {
            var error = new Error("Id for a request is empty, Please provide an unique id");
            error.name = "Empty Id For Request";
            throw error;
        }
        if (self.requests.size === limit) {
            var error = new Error("Maximum requests limit exceeded, Max allowed number of requests are " + limit);
            error.name = "Limit Exceeded Error";
            throw error;
        }
        if (self.requests.has(request.id)) {
            var error = new Error("Adding request with duplicate id " + request.id + ", Make the id of the requests unique");
            error.name = "Duplicate RequestId Error";
            throw error;
        }
        self.requests.set(request.id, request);
        return request.id;
    };
    /**
     * Removes request from the batch payload and its dependencies from all dependents
     * @param {string} requestId - The id of a request that needs to be removed
     * @return The boolean indicating removed status
     */
    BatchRequestContent.prototype.removeRequest = function (requestId) {
        var self = this, deleteStatus = self.requests.delete(requestId), iterator = self.requests.entries(), cur = iterator.next();
        /**
         * Removing dependencies where this request is present as a dependency
         */
        while (!cur.done) {
            var dependencies = cur.value[1].dependsOn;
            if (typeof dependencies !== "undefined") {
                var index = dependencies.indexOf(requestId);
                if (index !== -1) {
                    dependencies.splice(index, 1);
                }
                if (dependencies.length === 0) {
                    delete cur.value[1].dependsOn;
                }
            }
            cur = iterator.next();
        }
        return deleteStatus;
    };
    /**
     * @async
     * Serialize content from BatchRequestContent instance
     * @return The body content to make batch request
     */
    BatchRequestContent.prototype.getContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, requestBody, requests, iterator, cur, error, error, requestStep, batchRequestData, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this, requestBody = {}, requests = [], iterator = self.requests.entries(), cur = iterator.next();
                        if (cur.done) {
                            error = new Error("No requests added yet, Please add at least one request.");
                            error.name = "Empty Payload";
                            throw error;
                        }
                        if (!BatchRequestContent.validateDependencies(self.requests)) {
                            error = new Error("Invalid dependency found, Dependency should be:\n1. Parallel - no individual request states a dependency in the dependsOn property.\n2. Serial - all individual requests depend on the previous individual request.\n3. Same - all individual requests that state a dependency in the dependsOn property, state the same dependency.");
                            error.name = "Invalid Dependency";
                            throw error;
                        }
                        _a.label = 1;
                    case 1:
                        if (!!cur.done) return [3 /*break*/, 3];
                        requestStep = cur.value[1];
                        return [4 /*yield*/, BatchRequestContent.getRequestData(requestStep.request)];
                    case 2:
                        batchRequestData = _a.sent();
                        /**
                         * @see {@link https://developer.microsoft.com/en-us/graph/docs/concepts/json_batching#request-format}
                         */
                        if (batchRequestData.body !== undefined && (batchRequestData.headers === undefined || batchRequestData.headers["content-type"] === undefined)) {
                            error = new Error("Content-type header is not mentioned for request #" + requestStep.id + ", For request having body, Content-type header should be mentioned");
                            error.name = "Invalid Content-type header";
                            throw error;
                        }
                        batchRequestData.id = requestStep.id;
                        if (requestStep.dependsOn !== undefined && requestStep.dependsOn.length > 0) {
                            batchRequestData.dependsOn = requestStep.dependsOn;
                        }
                        requests.push(batchRequestData);
                        cur = iterator.next();
                        return [3 /*break*/, 1];
                    case 3:
                        requestBody.requests = requests;
                        return [2 /*return*/, requestBody];
                }
            });
        });
    };
    /**
     * @private
     * @static
     * Validates the dependency chain of the requests
     *
     * Note:
     * Individual requests can depend on other individual requests. Currently, requests can only depend on a single other request, and must follow one of these three patterns:
     * 1. Parallel - no individual request states a dependency in the dependsOn property.
     * 2. Serial - all individual requests depend on the previous individual request.
     * 3. Same - all individual requests that state a dependency in the dependsOn property, state the same dependency.
     * As JSON batching matures, these limitations will be removed.
     * @see {@link https://developer.microsoft.com/en-us/graph/docs/concepts/known_issues#json-batching}
     *
     * @return The boolean indicating the validation status
     */
    BatchRequestContent.validateDependencies = function (requests) {
        var isParallel = function (requests) {
            var iterator = requests.entries(), cur = iterator.next();
            while (!cur.done) {
                var curReq = cur.value[1];
                if (curReq.dependsOn !== undefined && curReq.dependsOn.length > 0) {
                    return false;
                }
                cur = iterator.next();
            }
            return true;
        };
        var isSerial = function (requests) {
            var iterator = requests.entries(), cur = iterator.next();
            var firstRequest = cur.value[1];
            if (firstRequest.dependsOn !== undefined && firstRequest.dependsOn.length > 0) {
                return false;
            }
            var prev = cur;
            cur = iterator.next();
            while (!cur.done) {
                var curReq = cur.value[1];
                if (curReq.dependsOn === undefined || curReq.dependsOn.length !== 1 || curReq.dependsOn[0] !== prev.value[1].id) {
                    return false;
                }
                prev = cur;
                cur = iterator.next();
            }
            return true;
        };
        var isSame = function (requests) {
            var iterator = requests.entries(), cur = iterator.next();
            var firstRequest = cur.value[1], dependencyId;
            if (firstRequest.dependsOn === undefined || firstRequest.dependsOn.length === 0) {
                dependencyId = firstRequest.id;
            }
            else {
                if (firstRequest.dependsOn.length === 1) {
                    var fDependencyId = firstRequest.dependsOn[0];
                    if (fDependencyId !== firstRequest.id && requests.has(fDependencyId)) {
                        dependencyId = fDependencyId;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            cur = iterator.next();
            while (!cur.done) {
                var curReq = cur.value[1];
                if ((curReq.dependsOn === undefined || curReq.dependsOn.length === 0) && dependencyId !== curReq.id) {
                    return false;
                }
                if (curReq.dependsOn !== undefined && curReq.dependsOn.length !== 0) {
                    if (curReq.dependsOn.length === 1 && (curReq.id === dependencyId || curReq.dependsOn[0] !== dependencyId)) {
                        return false;
                    }
                    if (curReq.dependsOn.length > 1) {
                        return false;
                    }
                }
                cur = iterator.next();
            }
            return true;
        };
        if (requests.size === 0) {
            var error = new Error("Empty requests map, Please provide at least one request.");
            error.name = "Empty Requests Error";
            throw error;
        }
        return (isParallel(requests) || isSerial(requests) || isSame(requests));
    };
    /**
     * @private
     * @static
     * @async
     * Converts Request Object instance to a JSON
     * @param {IsomorphicRequest} request - The IsomorphicRequest Object instance
     * @return A promise that resolves to JSON representation of a request
     */
    BatchRequestContent.getRequestData = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var requestData, hasHttpRegex, headers, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestData = {};
                        hasHttpRegex = new RegExp("^https?:\/\/");
                        if (hasHttpRegex.test(request.url)) {
                            // Stripping off hostname, port and url scheme
                            requestData.url = "/" + request.url.split(/.*?\/\/.*?\//)[1];
                        }
                        else {
                            requestData.url = request.url;
                        }
                        requestData.method = request.method;
                        headers = {};
                        request.headers.forEach(function (value, key) {
                            headers[key] = value;
                        });
                        if (Object.keys(headers).length) {
                            requestData.headers = headers;
                        }
                        if (!(request.method === RequestMethod_1.RequestMethod.PATCH || request.method === RequestMethod_1.RequestMethod.POST || request.method === RequestMethod_1.RequestMethod.PUT)) return [3 /*break*/, 2];
                        _a = requestData;
                        return [4 /*yield*/, BatchRequestContent.getRequestBody(request)];
                    case 1:
                        _a.body = _b.sent();
                        _b.label = 2;
                    case 2: 
                    /**
                     * TODO: Check any other property needs to be used from the Request object and add them
                     */
                    return [2 /*return*/, requestData];
                }
            });
        });
    };
    /**
     * @private
     * @static
     * @async
     * Gets the body of a Request object instance
     * @param {IsomorphicRequest} request - The IsomorphicRequest object instance
     * @return The Promise that resolves to a body value of a Request
     */
    BatchRequestContent.getRequestBody = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var bodyParsed, body, cloneReq, e_1, blob_1, reader_1, buffer, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bodyParsed = false;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        cloneReq = request.clone();
                        return [4 /*yield*/, cloneReq.json()];
                    case 2:
                        body = _a.sent();
                        bodyParsed = true;
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        if (!!bodyParsed) return [3 /*break*/, 12];
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 11, , 12]);
                        if (!(typeof Blob !== "undefined")) return [3 /*break*/, 8];
                        return [4 /*yield*/, request.blob()];
                    case 6:
                        blob_1 = _a.sent();
                        reader_1 = new FileReader();
                        return [4 /*yield*/, new Promise(function (resolve) {
                                reader_1.addEventListener("load", function () {
                                    var dataURL = reader_1.result, 
                                    /**
                                     * Some valid dataURL schemes:
                                     *  1. data:text/vnd-example+xyz;foo=bar;base64,R0lGODdh
                                     *  2. data:text/plain;charset=UTF-8;page=21,the%20data:1234,5678
                                     *  3. data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
                                     *  4. data:image/png,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
                                     *  5. data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
                                     * @see Syntax {@link https://en.wikipedia.org/wiki/Data_URI_scheme} for more
                                     */
                                    regex = new RegExp("^\s*data:(.+?\/.+?(;.+?\=.+?)*)?(;base64)?,(.*)\s*$"), segments = regex.exec(dataURL);
                                    resolve(segments[4]);
                                }, false);
                                reader_1.readAsDataURL(blob_1);
                            })];
                    case 7:
                        body = _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        if (!(typeof Buffer !== "undefined")) return [3 /*break*/, 10];
                        return [4 /*yield*/, request.buffer()];
                    case 9:
                        buffer = _a.sent();
                        body = buffer.toString("base64");
                        _a.label = 10;
                    case 10:
                        bodyParsed = true;
                        return [3 /*break*/, 12];
                    case 11:
                        e_2 = _a.sent();
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/, body];
                }
            });
        });
    };
    /**
     * Adds a dependency for a given dependent request
     *
     * @param {string} dependentId - The id of the dependent request
     * @param {string} [dependencyId] - The id of the dependency request, if not specified the preceding request will be considered as a dependency
     */
    BatchRequestContent.prototype.addDependency = function (dependentId, dependencyId) {
        var self = this;
        if (!self.requests.has(dependentId)) {
            var error = new Error("Dependent " + dependentId + " does not exists, Please check the id");
            error.name = "Invalid Dependent";
            throw error;
        }
        if (typeof dependencyId !== "undefined" && !self.requests.has(dependencyId)) {
            var error = new Error("Dependency " + dependencyId + " does not exists, Please check the id");
            error.name = "Invalid Dependency";
            throw error;
        }
        if (typeof dependencyId !== "undefined") {
            var dependent = self.requests.get(dependentId);
            if (dependent.dependsOn === undefined) {
                dependent.dependsOn = [];
            }
            if (dependent.dependsOn.includes(dependencyId)) {
                var error = new Error("Dependency " + dependencyId + " is already added for the request " + dependentId);
                error.name = "Duplicate Dependency";
                throw error;
            }
            dependent.dependsOn.push(dependencyId);
        }
        else {
            var prev = void 0, iterator = self.requests.entries(), cur = iterator.next();
            while (!cur.done && cur.value[1].id !== dependentId) {
                prev = cur;
                cur = iterator.next();
            }
            if (typeof prev !== "undefined") {
                var dependencyId_1 = prev.value[0];
                if (cur.value[1].dependsOn === undefined) {
                    cur.value[1].dependsOn = [];
                }
                if (cur.value[1].dependsOn.includes(dependencyId_1)) {
                    var error = new Error("Dependency " + dependencyId_1 + " is already added for the request " + dependentId);
                    error.name = "Duplicate Dependency";
                    throw error;
                }
                cur.value[1].dependsOn.push(dependencyId_1);
            }
            else {
                var error = new Error("Can't add dependency " + dependencyId + ", There is only a dependent request in the batch");
                error.name = "Invalid Dependency Addition";
                throw error;
            }
        }
    };
    /**
     * Removes a dependency for a given dependent request id
     * @param {string} dependentId - The id of the dependent request
     * @param {string} [dependencyId] - The id of the dependency request, if not specified will remove all the dependencies of that request
     * @return The boolean indicating removed status
     */
    BatchRequestContent.prototype.removeDependency = function (dependentId, dependencyId) {
        var request = this.requests.get(dependentId);
        if (typeof request === "undefined" || request.dependsOn === undefined || request.dependsOn.length === 0) {
            return false;
        }
        if (typeof dependencyId !== "undefined") {
            var index = request.dependsOn.indexOf(dependencyId);
            if (index === -1) {
                return false;
            }
            request.dependsOn.splice(index, 1);
            return true;
        }
        else {
            delete request.dependsOn;
            return true;
        }
    };
    /**
     * @private
     * @static
     * Limit for number of requests {@link - https://developer.microsoft.com/en-us/graph/docs/concepts/known_issues#json-batching}
     */
    BatchRequestContent.requestLimit = 20;
    return BatchRequestContent;
}());
exports.BatchRequestContent = BatchRequestContent;
//# sourceMappingURL=BatchRequestContent.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/content/BatchResponseContent.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/content/BatchResponseContent.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module BatchResponseContent
 */
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class that handles BatchResponseContent
 */
var BatchResponseContent = /** @class */ (function () {
    /**
     * Creates the BatchResponseContent instance
     * @param {BatchResponseBody} response - The response body returned for batch request from server
     */
    function BatchResponseContent(response) {
        var self = this;
        self.responses = new Map();
        self.update(response);
    }
    /**
     * Updates the Batch response content instance with given responses.
     * @param {BatchResponseBody} response - The response json representing batch response message
     */
    BatchResponseContent.prototype.update = function (response) {
        var self = this;
        self.nextLink = response["@nextLink"];
        var responses = response.responses;
        for (var i = 0, l = responses.length; i < l; i++) {
            self.responses.set(responses[i].id, self.createResponseObject(responses[i]));
        }
    };
    /**
     * Creates native Response object from the json representation of it.
     * @param {KeyValuePairObject} responseJSON - The response json value
     * @return The Response Object instance
     */
    BatchResponseContent.prototype.createResponseObject = function (responseJSON) {
        var body = responseJSON.body, options = {};
        options.status = responseJSON.status;
        if (responseJSON.statusText !== undefined) {
            options.statusText = responseJSON.statusText;
        }
        options.headers = responseJSON.headers;
        return new Response(body, options);
    };
    /**
     * To get the response of a request for a given request id
     * @param {string} requestId - The request id value
     * @return The Response object instance for the particular request
     */
    BatchResponseContent.prototype.getResponseById = function (requestId) {
        return this.responses.get(requestId);
    };
    /**
     * To get all the responses of the batch request
     * @return The Map of id and Response objects
     */
    BatchResponseContent.prototype.getResponses = function () {
        return this.responses;
    };
    /**
     * To get the iterator for the responses
     * @return The Iterable generator for the response objects
     */
    BatchResponseContent.prototype.getResponsesIterator = function () {
        var self, iterator, cur;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    self = this, iterator = self.responses.entries(), cur = iterator.next();
                    _a.label = 1;
                case 1:
                    if (!!cur.done) return [3 /*break*/, 3];
                    return [4 /*yield*/, cur.value];
                case 2:
                    _a.sent();
                    cur = iterator.next();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    };
    return BatchResponseContent;
}());
exports.BatchResponseContent = BatchResponseContent;
//# sourceMappingURL=BatchResponseContent.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/index.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(/*! ./common */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/common.js");
var GraphRequest_1 = __webpack_require__(/*! ./GraphRequest */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/GraphRequest.js");
var Client = /** @class */ (function () {
    function Client() {
        // specify client defaults
        this.config = {
            debugLogging: false,
            defaultVersion: common_1.DEFAULT_VERSION,
            baseUrl: common_1.GRAPH_BASE_URL
        };
    }
    Client.init = function (clientOptions) {
        var graphClient = new Client();
        for (var key in clientOptions) {
            graphClient.config[key] = clientOptions[key];
        }
        return graphClient;
    };
    /*
     * Entry point for calling api
     */
    Client.prototype.api = function (path) {
        return new GraphRequest_1.GraphRequest(this.config, path);
    };
    return Client;
}());
exports.Client = Client;
__export(__webpack_require__(/*! ./GraphRequest */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/GraphRequest.js"));
__export(__webpack_require__(/*! ./common */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/common.js"));
__export(__webpack_require__(/*! ./ResponseHandler */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/ResponseHandler.js"));
__export(__webpack_require__(/*! ./tasks/OneDriveLargeFileUploadTask */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/tasks/OneDriveLargeFileUploadTask.js"));
__export(__webpack_require__(/*! ./ResponseType */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/ResponseType.js"));
__export(__webpack_require__(/*! ./content/BatchRequestContent */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/content/BatchRequestContent.js"));
__export(__webpack_require__(/*! ./content/BatchResponseContent */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/content/BatchResponseContent.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/tasks/LargeFileUploadTask.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/tasks/LargeFileUploadTask.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module LargeFileUploadTask
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Range_1 = __webpack_require__(/*! ../Range */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/Range.js");
;
/**
 * Class representing LargeFileUploadTask
 */
var LargeFileUploadTask = /** @class */ (function () {
    /**
     * Constructs a LargeFileUploadTask
     * @param {Client} client - The GraphClient instance
     * @param {FileObject} file - The FileObject holding details of a file that needs to be uploaded
     * @param {LargeFileUploadSession} uploadSession - The upload session to which the upload has to be done
     * @param {LargeFileUploadTaskOptions} options - The upload task options
     */
    function LargeFileUploadTask(client, file, uploadSession, options) {
        /**
        * Default value for the rangeSize
        */
        this.DEFAULT_FILE_SIZE = 5 * 1024 * 1024;
        var self = this;
        self.client = client;
        self.file = file;
        if (options.rangeSize === undefined) {
            options.rangeSize = self.DEFAULT_FILE_SIZE;
        }
        self.options = options;
        self.uploadSession = uploadSession;
        self.nextRange = new Range_1.Range(0, self.options.rangeSize - 1);
    }
    /**
     * Parses given range string to the Range instance
     * @param {string[]} ranges - The ranges value
     * @return The range instance
     */
    LargeFileUploadTask.prototype.parseRange = function (ranges) {
        var rangeStr = ranges[0];
        if (typeof rangeStr === "undefined" || rangeStr === "") {
            return new Range_1.Range();
        }
        var firstRange = rangeStr.split("-"), minVal = parseInt(firstRange[0]), maxVal = parseInt(firstRange[1]);
        if (Number.isNaN(maxVal)) {
            maxVal = this.file.size - 1;
        }
        return new Range_1.Range(minVal, maxVal);
    };
    /**
     * Updates the expiration date and the next range
     * @param {UploadStatusResponse} response - The response of the upload status
     */
    LargeFileUploadTask.prototype.updateTaskStatus = function (response) {
        var self = this;
        self.uploadSession.expiry = new Date(response.expirationDateTime);
        self.nextRange = self.parseRange(response.nextExpectedRanges);
    };
    /**
     * Gets next range that needs to be uploaded
     * @return The range instance
     */
    LargeFileUploadTask.prototype.getNextRange = function () {
        var self = this;
        if (self.nextRange.minValue === -1) {
            return self.nextRange;
        }
        var minVal = self.nextRange.minValue, maxValue = minVal + self.options.rangeSize - 1;
        if (maxValue >= self.file.size) {
            maxValue = self.file.size - 1;
        }
        return new Range_1.Range(minVal, maxValue);
    };
    /**
     * Slices the file content to the given range
     * @param {Range} range - The range value
     * @return The sliced ArrayBuffer or Blob
     */
    LargeFileUploadTask.prototype.sliceFile = function (range) {
        var blob = this.file.content.slice(range.minValue, range.maxValue + 1);
        return blob;
    };
    /**
     * @async
     * Uploads file to the server in a sequential order by slicing the file
     * @return The promise resolves to uploaded response
     */
    LargeFileUploadTask.prototype.upload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, nextRange, err, fileSlice, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        _a.label = 2;
                    case 2:
                        if (false) {}
                        nextRange = self.getNextRange();
                        if (nextRange.maxValue === -1) {
                            err = new Error("Task with which you are trying to upload is already completed, Please check for your uploaded file");
                            err.name = "Invalid Session";
                            throw err;
                        }
                        fileSlice = self.sliceFile(nextRange);
                        return [4 /*yield*/, self.uploadSlice(fileSlice, nextRange, self.file.size)];
                    case 3:
                        response = _a.sent();
                        // Upon completion of upload process incase of onedrive, driveItem is returned, which contains id
                        if (response.id !== undefined) {
                            return [2 /*return*/, response];
                        }
                        else {
                            self.updateTaskStatus(response);
                        }
                        return [3 /*break*/, 2];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        throw err_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @async
     * Uploads given slice to the server
     * @param {ArrayBuffer | Blob | File} fileSlice - The file slice
     * @param {Range} range - The range value
     * @param {number} totalSize - The total size of a complete file
     */
    LargeFileUploadTask.prototype.uploadSlice = function (fileSlice, range, totalSize) {
        return __awaiter(this, void 0, void 0, function () {
            var self, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, self.client
                                .api(self.uploadSession.url)
                                .headers({
                                "Content-Length": "" + (range.maxValue - range.minValue + 1),
                                "Content-Range": "bytes " + range.minValue + "-" + range.maxValue + "/" + totalSize
                            })
                                .put(fileSlice)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @async
     * Deletes upload session in the server
     * @return The promise resolves to cancelled response
     */
    LargeFileUploadTask.prototype.cancel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, self.client
                                .api(self.uploadSession.url)
                                .delete()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_3 = _a.sent();
                        throw err_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @async
     * Gets status for the upload session
     * @return The promise resolves to the status enquiry response
     */
    LargeFileUploadTask.prototype.getStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, self.client
                                .api(self.uploadSession.url)
                                .get()];
                    case 2:
                        response = _a.sent();
                        self.updateTaskStatus(response);
                        return [2 /*return*/, response];
                    case 3:
                        err_4 = _a.sent();
                        throw err_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @async
     * Resumes upload session and continue uploading the file from the last sent range
     * @return The promise resolves to the uploaded response
     */
    LargeFileUploadTask.prototype.resume = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, self.getStatus()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, self.upload()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_5 = _a.sent();
                        throw err_5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return LargeFileUploadTask;
}());
exports.LargeFileUploadTask = LargeFileUploadTask;
//# sourceMappingURL=LargeFileUploadTask.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/tasks/OneDriveLargeFileUploadTask.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/tasks/OneDriveLargeFileUploadTask.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module OneDriveLargeFileUploadTask
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var LargeFileUploadTask_1 = __webpack_require__(/*! ./LargeFileUploadTask */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/tasks/LargeFileUploadTask.js");
var OneDriveLargeFileUploadTaskUtil_1 = __webpack_require__(/*! ./OneDriveLargeFileUploadTaskUtil */ "./node_modules/@microsoft/microsoft-graph-client/lib/src/tasks/OneDriveLargeFileUploadTaskUtil.js");
;
/**
 * Class representing OneDriveLargeFileUploadTask
 */
var OneDriveLargeFileUploadTask = /** @class */ (function (_super) {
    __extends(OneDriveLargeFileUploadTask, _super);
    /**
     * Constructs a OneDriveLargeFileUploadTask
     * @param {Client} client - The GraphClient instance
     * @param {FileObject} file - The FileObject holding details of a file that needs to be uploaded
     * @param {LargeFileUploadSession} uploadSession - The upload session to which the upload has to be done
     * @param {LargeFileUploadTaskOptions} options - The upload task options
     */
    function OneDriveLargeFileUploadTask(client, file, uploadSession, options) {
        return _super.call(this, client, file, uploadSession, options) || this;
    }
    /**
     * @static
     * @async
     * Creates a OneDriveLargeFileUploadTask
     * @param {Client} client - The GraphClient instance
     * @param {Blob | Buffer | File} file - File represented as Blob, Buffer or File
     * @param {OneDriveLargeFileUploadOptions} options - The options for upload task
     * @return The promise that will be resolves to OneDriveLargeFileUploadTask instance
     */
    OneDriveLargeFileUploadTask.create = function (client, file, options) {
        return __awaiter(this, void 0, void 0, function () {
            var fileObj, _file, b, requestUrl, session, rangeSize, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileObj = {};
                        fileObj.name = options.fileName;
                        switch (file.constructor.name) {
                            case "Blob":
                                fileObj.content = new File([file], fileObj.name);
                                fileObj.size = fileObj.content.size;
                                break;
                            case "File":
                                _file = file;
                                fileObj.content = _file;
                                fileObj.size = _file.size;
                                break;
                            case "Buffer":
                                b = file;
                                fileObj.size = b.byteLength - b.byteOffset;
                                fileObj.content = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
                                break;
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        requestUrl = OneDriveLargeFileUploadTask.constructCreateSessionUrl(options.fileName, options.path);
                        return [4 /*yield*/, OneDriveLargeFileUploadTask.createUploadSession(client, requestUrl, options.fileName)];
                    case 2:
                        session = _a.sent();
                        rangeSize = OneDriveLargeFileUploadTaskUtil_1.getValidRangeSize(options.rangeSize);
                        return [2 /*return*/, new OneDriveLargeFileUploadTask(client, fileObj, session, { rangeSize: rangeSize })];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @static
     * Constructs the create session url for Onedrive
     * @param {string} fileName - The name of the file
     * @param {path} [path = OneDriveLargeFileUploadTask.DEFAULT_UPLOAD_PATH] - The path for the upload
     * @return The constructed create session url
     */
    OneDriveLargeFileUploadTask.constructCreateSessionUrl = function (fileName, path) {
        if (path === void 0) { path = OneDriveLargeFileUploadTask.DEFAULT_UPLOAD_PATH; }
        fileName = fileName.trim();
        path = path.trim();
        if (path === "") {
            path = "/";
        }
        if (path[0] !== "/") {
            path = "/" + path;
        }
        if (path[path.length - 1] !== "/") {
            path = path + "/";
        }
        return encodeURI("/me/drive/root:" + path + fileName + ":/createUploadSession");
    };
    /**
     * @static
     * @async
     * Makes request to the server to create an upload session
     * @param {Client} client - The GraphClient instance
     * @param {string} requestUrl - The URL to create the upload session
     * @param {string} fileName - The name of a file to upload, (with extension)
     * @return The promise that resolves to LargeFileUploadSession
     */
    OneDriveLargeFileUploadTask.createUploadSession = function (client, requestUrl, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, session, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            item: {
                                "@microsoft.graph.conflictBehavior": "rename",
                                name: fileName
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, client.api(requestUrl).post(payload)];
                    case 2:
                        session = _a.sent();
                        return [2 /*return*/, {
                                url: session.uploadUrl,
                                expiry: new Date(session.expirationDateTime)
                            }];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Commits upload session to end uploading
     * @param {string} requestUrl - The URL to commit the upload session
     * @return The promise resolves to committed response
     */
    OneDriveLargeFileUploadTask.prototype.commit = function (requestUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var self, payload, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        payload = {
                            name: self.file.name,
                            "@microsoft.graph.conflictBehavior": "rename",
                            "@microsoft.graph.sourceUrl": self.uploadSession.url
                        };
                        return [4 /*yield*/, self.client
                                .api(requestUrl)
                                .put(payload)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        err_3 = _a.sent();
                        throw err_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Default path for the file being uploaded
     */
    OneDriveLargeFileUploadTask.DEFAULT_UPLOAD_PATH = "/";
    return OneDriveLargeFileUploadTask;
}(LargeFileUploadTask_1.LargeFileUploadTask));
exports.OneDriveLargeFileUploadTask = OneDriveLargeFileUploadTask;
//# sourceMappingURL=OneDriveLargeFileUploadTask.js.map

/***/ }),

/***/ "./node_modules/@microsoft/microsoft-graph-client/lib/src/tasks/OneDriveLargeFileUploadTaskUtil.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@microsoft/microsoft-graph-client/lib/src/tasks/OneDriveLargeFileUploadTaskUtil.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @module OneDriveLargeFileUploadTaskUtil
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Default value for the rangeSize
 * Recommended size is between 5 - 10 MB {@link https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/driveitem_createuploadsession#best-practices}
 */
var DEFAULT_FILE_SIZE = 5 * 1024 * 1024;
/**
 * Rounds off the given value to a multiple of 320 KB
 * @param {number} value - The value
 * @return The rounded off value
 */
var roundTo320KB = function (value) {
    if (value > (320 * 1024)) {
        value = Math.floor(value / (320 * 1024)) * 320 * 1024;
    }
    return value;
};
/**
 * Get the valid rangeSize for a file slicing (validity is based on the constrains mentioned in here {@link https://developer.microsoft.com/en-us/graph/docs/api-reference/v1.0/api/driveitem_createuploadsession#upload-bytes-to-the-upload-session})
 *
 * @param {number} [rangeSize = DEFAULT_FILE_SIZE] - The rangeSize value.
 * @return The valid rangeSize
 */
exports.getValidRangeSize = function (rangeSize) {
    if (rangeSize === void 0) { rangeSize = DEFAULT_FILE_SIZE; }
    var sixtyMB = 60 * 1024 * 1024;
    if (rangeSize > sixtyMB) {
        rangeSize = sixtyMB;
    }
    return roundTo320KB(rangeSize);
};
//# sourceMappingURL=OneDriveLargeFileUploadTaskUtil.js.map

/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "./node_modules/isomorphic-fetch/fetch-npm-browserify.js":
/*!***************************************************************!*\
  !*** ./node_modules/isomorphic-fetch/fetch-npm-browserify.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
__webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
module.exports = self.fetch.bind(self);


/***/ }),

/***/ "./node_modules/msal/lib-commonjs/AadAuthority.js":
/*!********************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/AadAuthority.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var Authority_1 = __webpack_require__(/*! ./Authority */ "./node_modules/msal/lib-commonjs/Authority.js");
var XHRClient_1 = __webpack_require__(/*! ./XHRClient */ "./node_modules/msal/lib-commonjs/XHRClient.js");
/**
 * @hidden
 */
var AadAuthority = /** @class */ (function (_super) {
    tslib_1.__extends(AadAuthority, _super);
    function AadAuthority(authority, validateAuthority) {
        return _super.call(this, authority, validateAuthority) || this;
    }
    Object.defineProperty(AadAuthority.prototype, "AadInstanceDiscoveryEndpointUrl", {
        get: function () {
            return AadAuthority.AadInstanceDiscoveryEndpoint + "?api-version=1.0&authorization_endpoint=" + this.CanonicalAuthority + "oauth2/v2.0/authorize";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AadAuthority.prototype, "AuthorityType", {
        get: function () {
            return Authority_1.AuthorityType.Aad;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a promise which resolves to the OIDC endpoint
     * Only responds with the endpoint
     */
    AadAuthority.prototype.GetOpenIdConfigurationEndpointAsync = function () {
        var _this = this;
        var resultPromise = new Promise(function (resolve, reject) {
            return resolve(_this.DefaultOpenIdConfigurationEndpoint);
        });
        if (!this.IsValidationEnabled) {
            return resultPromise;
        }
        var host = this.CanonicalAuthorityUrlComponents.HostNameAndPort;
        if (this.IsInTrustedHostList(host)) {
            return resultPromise;
        }
        var client = new XHRClient_1.XhrClient();
        return client.sendRequestAsync(this.AadInstanceDiscoveryEndpointUrl, "GET", true)
            .then(function (response) {
            return response.tenant_discovery_endpoint;
        });
    };
    /**
     * Checks to see if the host is in a list of trusted hosts
     * @param {string} The host to look up
     */
    AadAuthority.prototype.IsInTrustedHostList = function (host) {
        return AadAuthority.TrustedHostList[host.toLowerCase()];
    };
    AadAuthority.AadInstanceDiscoveryEndpoint = "https://login.microsoftonline.com/common/discovery/instance";
    AadAuthority.TrustedHostList = {
        "login.windows.net": "login.windows.net",
        "login.chinacloudapi.cn": "login.chinacloudapi.cn",
        "login.cloudgovapi.us": "login.cloudgovapi.us",
        "login.microsoftonline.com": "login.microsoftonline.com",
        "login.microsoftonline.de": "login.microsoftonline.de",
        "login.microsoftonline.us": "login.microsoftonline.us"
    };
    return AadAuthority;
}(Authority_1.Authority));
exports.AadAuthority = AadAuthority;
//# sourceMappingURL=AadAuthority.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/AccessTokenCacheItem.js":
/*!****************************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/AccessTokenCacheItem.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @hidden
 */
var AccessTokenCacheItem = /** @class */ (function () {
    function AccessTokenCacheItem(key, value) {
        this.key = key;
        this.value = value;
    }
    return AccessTokenCacheItem;
}());
exports.AccessTokenCacheItem = AccessTokenCacheItem;
//# sourceMappingURL=AccessTokenCacheItem.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/AccessTokenKey.js":
/*!**********************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/AccessTokenKey.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./node_modules/msal/lib-commonjs/Utils.js");
/*
 * @hidden
 */
var AccessTokenKey = /** @class */ (function () {
    function AccessTokenKey(authority, clientId, scopes, uid, utid) {
        this.authority = authority;
        this.clientId = clientId;
        this.scopes = scopes;
        this.userIdentifier = Utils_1.Utils.base64EncodeStringUrlSafe(uid) + "." + Utils_1.Utils.base64EncodeStringUrlSafe(utid);
    }
    return AccessTokenKey;
}());
exports.AccessTokenKey = AccessTokenKey;
//# sourceMappingURL=AccessTokenKey.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/AccessTokenValue.js":
/*!************************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/AccessTokenValue.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @hidden
 */
var AccessTokenValue = /** @class */ (function () {
    function AccessTokenValue(accessToken, idToken, expiresIn, clientInfo) {
        this.accessToken = accessToken;
        this.idToken = idToken;
        this.expiresIn = expiresIn;
        this.clientInfo = clientInfo;
    }
    return AccessTokenValue;
}());
exports.AccessTokenValue = AccessTokenValue;
//# sourceMappingURL=AccessTokenValue.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/AuthenticationRequestParameters.js":
/*!***************************************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/AuthenticationRequestParameters.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./node_modules/msal/lib-commonjs/Utils.js");
/*
 * @hidden
 */
var AuthenticationRequestParameters = /** @class */ (function () {
    function AuthenticationRequestParameters(authority, clientId, scope, responseType, redirectUri) {
        this.authorityInstance = authority;
        this.clientId = clientId;
        this.scopes = scope;
        this.responseType = responseType;
        this.redirectUri = redirectUri;
        // randomly generated values
        this.correlationId = Utils_1.Utils.createNewGuid();
        this.state = Utils_1.Utils.createNewGuid();
        this.nonce = Utils_1.Utils.createNewGuid();
        // telemetry information
        this.xClientSku = "MSAL.JS";
        this.xClientVer = Utils_1.Utils.getLibraryVersion();
    }
    Object.defineProperty(AuthenticationRequestParameters.prototype, "authority", {
        get: function () {
            return this.authorityInstance.CanonicalAuthority;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationRequestParameters.prototype.createNavigateUrl = function (scopes) {
        if (!scopes) {
            scopes = [this.clientId];
        }
        if (scopes.indexOf(this.clientId) === -1) {
            scopes.push(this.clientId);
        }
        var str = [];
        str.push("response_type=" + this.responseType);
        this.translateclientIdUsedInScope(scopes);
        str.push("scope=" + encodeURIComponent(this.parseScope(scopes)));
        str.push("client_id=" + encodeURIComponent(this.clientId));
        str.push("redirect_uri=" + encodeURIComponent(this.redirectUri));
        str.push("state=" + encodeURIComponent(this.state));
        str.push("nonce=" + encodeURIComponent(this.nonce));
        str.push("client_info=1");
        str.push("x-client-SKU=" + this.xClientSku);
        str.push("x-client-Ver=" + this.xClientVer);
        if (this.extraQueryParameters) {
            str.push(this.extraQueryParameters);
        }
        str.push("client-request-id=" + encodeURIComponent(this.correlationId));
        var authEndpoint = this.authorityInstance.AuthorizationEndpoint;
        // if the endpoint already has queryparams, lets add to it, otherwise add the first one
        if (authEndpoint.indexOf("?") < 0) {
            authEndpoint += "?";
        }
        else {
            authEndpoint += "&";
        }
        var requestUrl = "" + authEndpoint + str.join("&");
        return requestUrl;
    };
    AuthenticationRequestParameters.prototype.translateclientIdUsedInScope = function (scopes) {
        var clientIdIndex = scopes.indexOf(this.clientId);
        if (clientIdIndex >= 0) {
            scopes.splice(clientIdIndex, 1);
            if (scopes.indexOf("openid") === -1) {
                scopes.push("openid");
            }
            if (scopes.indexOf("profile") === -1) {
                scopes.push("profile");
            }
        }
    };
    AuthenticationRequestParameters.prototype.parseScope = function (scopes) {
        var scopeList = "";
        if (scopes) {
            for (var i = 0; i < scopes.length; ++i) {
                scopeList += (i !== scopes.length - 1) ? scopes[i] + " " : scopes[i];
            }
        }
        return scopeList;
    };
    return AuthenticationRequestParameters;
}());
exports.AuthenticationRequestParameters = AuthenticationRequestParameters;
//# sourceMappingURL=AuthenticationRequestParameters.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/Authority.js":
/*!*****************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/Authority.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./node_modules/msal/lib-commonjs/Utils.js");
var ErrorMessage_1 = __webpack_require__(/*! ./ErrorMessage */ "./node_modules/msal/lib-commonjs/ErrorMessage.js");
var XHRClient_1 = __webpack_require__(/*! ./XHRClient */ "./node_modules/msal/lib-commonjs/XHRClient.js");
/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*
 * @hidden
 */
var AuthorityType;
(function (AuthorityType) {
    AuthorityType[AuthorityType["Aad"] = 0] = "Aad";
    AuthorityType[AuthorityType["Adfs"] = 1] = "Adfs";
    AuthorityType[AuthorityType["B2C"] = 2] = "B2C";
})(AuthorityType = exports.AuthorityType || (exports.AuthorityType = {}));
/*
 * @hidden
 */
var Authority = /** @class */ (function () {
    function Authority(authority, validateAuthority) {
        this.IsValidationEnabled = validateAuthority;
        this.CanonicalAuthority = authority;
        this.validateAsUri();
    }
    Object.defineProperty(Authority.prototype, "Tenant", {
        get: function () {
            return this.CanonicalAuthorityUrlComponents.PathSegments[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "AuthorizationEndpoint", {
        get: function () {
            this.validateResolved();
            return this.tenantDiscoveryResponse.AuthorizationEndpoint.replace("{tenant}", this.Tenant);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "EndSessionEndpoint", {
        get: function () {
            this.validateResolved();
            return this.tenantDiscoveryResponse.EndSessionEndpoint.replace("{tenant}", this.Tenant);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "SelfSignedJwtAudience", {
        get: function () {
            this.validateResolved();
            return this.tenantDiscoveryResponse.Issuer.replace("{tenant}", this.Tenant);
        },
        enumerable: true,
        configurable: true
    });
    Authority.prototype.validateResolved = function () {
        if (!this.tenantDiscoveryResponse) {
            throw "Please call ResolveEndpointsAsync first";
        }
    };
    Object.defineProperty(Authority.prototype, "CanonicalAuthority", {
        /*
         * A URL that is the authority set by the developer
         */
        get: function () {
            return this.canonicalAuthority;
        },
        set: function (url) {
            this.canonicalAuthority = Utils_1.Utils.CanonicalizeUri(url);
            this.canonicalAuthorityUrlComponents = null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "CanonicalAuthorityUrlComponents", {
        get: function () {
            if (!this.canonicalAuthorityUrlComponents) {
                this.canonicalAuthorityUrlComponents = Utils_1.Utils.GetUrlComponents(this.CanonicalAuthority);
            }
            return this.canonicalAuthorityUrlComponents;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Authority.prototype, "DefaultOpenIdConfigurationEndpoint", {
        /*
         * // http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata
         */
        get: function () {
            return this.CanonicalAuthority + "v2.0/.well-known/openid-configuration";
        },
        enumerable: true,
        configurable: true
    });
    /*
     * Given a string, validate that it is of the form https://domain/path
     */
    Authority.prototype.validateAsUri = function () {
        var components;
        try {
            components = this.CanonicalAuthorityUrlComponents;
        }
        catch (e) {
            throw ErrorMessage_1.ErrorMessage.invalidAuthorityType;
        }
        if (!components.Protocol || components.Protocol.toLowerCase() !== "https:") {
            throw ErrorMessage_1.ErrorMessage.authorityUriInsecure;
        }
        if (!components.PathSegments || components.PathSegments.length < 1) {
            throw ErrorMessage_1.ErrorMessage.authorityUriInvalidPath;
        }
    };
    /*
     * Calls the OIDC endpoint and returns the response
     */
    Authority.prototype.DiscoverEndpoints = function (openIdConfigurationEndpoint) {
        var client = new XHRClient_1.XhrClient();
        return client.sendRequestAsync(openIdConfigurationEndpoint, "GET", /*enableCaching: */ true)
            .then(function (response) {
            return {
                AuthorizationEndpoint: response.authorization_endpoint,
                EndSessionEndpoint: response.end_session_endpoint,
                Issuer: response.issuer
            };
        });
    };
    /*
     * Returns a promise.
     * Checks to see if the authority is in the cache
     * Discover endpoints via openid-configuration
     * If successful, caches the endpoint for later use in OIDC
     */
    Authority.prototype.ResolveEndpointsAsync = function () {
        var _this = this;
        var openIdConfigurationEndpoint = "";
        return this.GetOpenIdConfigurationEndpointAsync().then(function (openIdConfigurationEndpointResponse) {
            openIdConfigurationEndpoint = openIdConfigurationEndpointResponse;
            return _this.DiscoverEndpoints(openIdConfigurationEndpoint);
        }).then(function (tenantDiscoveryResponse) {
            _this.tenantDiscoveryResponse = tenantDiscoveryResponse;
            return _this;
        });
    };
    return Authority;
}());
exports.Authority = Authority;
//# sourceMappingURL=Authority.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/AuthorityFactory.js":
/*!************************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/AuthorityFactory.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @hidden
 */
var Utils_1 = __webpack_require__(/*! ./Utils */ "./node_modules/msal/lib-commonjs/Utils.js");
var AadAuthority_1 = __webpack_require__(/*! ./AadAuthority */ "./node_modules/msal/lib-commonjs/AadAuthority.js");
var B2cAuthority_1 = __webpack_require__(/*! ./B2cAuthority */ "./node_modules/msal/lib-commonjs/B2cAuthority.js");
var Authority_1 = __webpack_require__(/*! ./Authority */ "./node_modules/msal/lib-commonjs/Authority.js");
var ErrorMessage_1 = __webpack_require__(/*! ./ErrorMessage */ "./node_modules/msal/lib-commonjs/ErrorMessage.js");
var AuthorityFactory = /** @class */ (function () {
    function AuthorityFactory() {
    }
    /*
    * Parse the url and determine the type of authority
    */
    AuthorityFactory.DetectAuthorityFromUrl = function (authorityUrl) {
        authorityUrl = Utils_1.Utils.CanonicalizeUri(authorityUrl);
        var components = Utils_1.Utils.GetUrlComponents(authorityUrl);
        var pathSegments = components.PathSegments;
        switch (pathSegments[0]) {
            case "tfp":
                return Authority_1.AuthorityType.B2C;
            case "adfs":
                return Authority_1.AuthorityType.Adfs;
            default:
                return Authority_1.AuthorityType.Aad;
        }
    };
    /*
    * Create an authority object of the correct type based on the url
    * Performs basic authority validation - checks to see if the authority is of a valid type (eg aad, b2c)
    */
    AuthorityFactory.CreateInstance = function (authorityUrl, validateAuthority) {
        var type = AuthorityFactory.DetectAuthorityFromUrl(authorityUrl);
        // Depending on above detection, create the right type.
        switch (type) {
            case Authority_1.AuthorityType.B2C:
                return new B2cAuthority_1.B2cAuthority(authorityUrl, validateAuthority);
            case Authority_1.AuthorityType.Aad:
                return new AadAuthority_1.AadAuthority(authorityUrl, validateAuthority);
            default:
                throw ErrorMessage_1.ErrorMessage.invalidAuthorityType;
        }
    };
    return AuthorityFactory;
}());
exports.AuthorityFactory = AuthorityFactory;
//# sourceMappingURL=AuthorityFactory.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/B2cAuthority.js":
/*!********************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/B2cAuthority.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var AadAuthority_1 = __webpack_require__(/*! ./AadAuthority */ "./node_modules/msal/lib-commonjs/AadAuthority.js");
var Authority_1 = __webpack_require__(/*! ./Authority */ "./node_modules/msal/lib-commonjs/Authority.js");
var ErrorMessage_1 = __webpack_require__(/*! ./ErrorMessage */ "./node_modules/msal/lib-commonjs/ErrorMessage.js");
var Utils_1 = __webpack_require__(/*! ./Utils */ "./node_modules/msal/lib-commonjs/Utils.js");
/*
 * @hidden
 */
var B2cAuthority = /** @class */ (function (_super) {
    tslib_1.__extends(B2cAuthority, _super);
    function B2cAuthority(authority, validateAuthority) {
        var _this = _super.call(this, authority, validateAuthority) || this;
        var urlComponents = Utils_1.Utils.GetUrlComponents(authority);
        var pathSegments = urlComponents.PathSegments;
        if (pathSegments.length < 3) {
            throw ErrorMessage_1.ErrorMessage.b2cAuthorityUriInvalidPath;
        }
        _this.CanonicalAuthority = "https://" + urlComponents.HostNameAndPort + "/" + pathSegments[0] + "/" + pathSegments[1] + "/" + pathSegments[2] + "/";
        return _this;
    }
    Object.defineProperty(B2cAuthority.prototype, "AuthorityType", {
        get: function () {
            return Authority_1.AuthorityType.B2C;
        },
        enumerable: true,
        configurable: true
    });
    /*
     * Returns a promise with the TenantDiscoveryEndpoint
     */
    B2cAuthority.prototype.GetOpenIdConfigurationEndpointAsync = function () {
        var _this = this;
        var resultPromise = new Promise(function (resolve, reject) {
            return resolve(_this.DefaultOpenIdConfigurationEndpoint);
        });
        if (!this.IsValidationEnabled) {
            return resultPromise;
        }
        if (this.IsInTrustedHostList(this.CanonicalAuthorityUrlComponents.HostNameAndPort)) {
            return resultPromise;
        }
        return new Promise(function (resolve, reject) {
            return reject(ErrorMessage_1.ErrorMessage.unsupportedAuthorityValidation);
        });
    };
    return B2cAuthority;
}(AadAuthority_1.AadAuthority));
exports.B2cAuthority = B2cAuthority;
//# sourceMappingURL=B2cAuthority.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/ClientInfo.js":
/*!******************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/ClientInfo.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./node_modules/msal/lib-commonjs/Utils.js");
/*
 * @hidden
 */
var ClientInfo = /** @class */ (function () {
    function ClientInfo(rawClientInfo) {
        if (!rawClientInfo || Utils_1.Utils.isEmpty(rawClientInfo)) {
            this.uid = "";
            this.utid = "";
            return;
        }
        try {
            var decodedClientInfo = Utils_1.Utils.base64DecodeStringUrlSafe(rawClientInfo);
            var clientInfo = JSON.parse(decodedClientInfo);
            if (clientInfo) {
                if (clientInfo.hasOwnProperty("uid")) {
                    this.uid = clientInfo.uid;
                }
                if (clientInfo.hasOwnProperty("utid")) {
                    this.utid = clientInfo.utid;
                }
            }
        }
        catch (e) {
            throw new Error(e);
        }
    }
    Object.defineProperty(ClientInfo.prototype, "uid", {
        get: function () {
            return this._uid ? this._uid : "";
        },
        set: function (uid) {
            this._uid = uid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientInfo.prototype, "utid", {
        get: function () {
            return this._utid ? this._utid : "";
        },
        set: function (utid) {
            this._utid = utid;
        },
        enumerable: true,
        configurable: true
    });
    return ClientInfo;
}());
exports.ClientInfo = ClientInfo;
//# sourceMappingURL=ClientInfo.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/Constants.js":
/*!*****************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/Constants.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  * Copyright (c) Microsoft Corporation
  *  All Rights Reserved
  *  MIT License
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy of this
  * software and associated documentation files (the "Software"), to deal in the Software
  * without restriction, including without limitation the rights to use, copy, modify,
  * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  * permit persons to whom the Software is furnished to do so, subject to the following
  * conditions:
  *
  * The above copyright notice and this permission notice shall be
  * included in all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
  * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
  * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @hidden
 */
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Object.defineProperty(Constants, "errorDescription", {
        get: function () { return "error_description"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "error", {
        get: function () { return "error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "scope", {
        get: function () { return "scope"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "acquireTokenUser", {
        get: function () { return "msal.acquireTokenUser"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "clientInfo", {
        get: function () { return "client_info"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "clientId", {
        get: function () { return "clientId"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "authority", {
        get: function () { return "msal.authority"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "idToken", {
        get: function () { return "id_token"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "accessToken", {
        get: function () { return "access_token"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "expiresIn", {
        get: function () { return "expires_in"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "sessionState", {
        get: function () { return "session_state"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "msalClientInfo", {
        get: function () { return "msal.client.info"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "msalError", {
        get: function () { return "msal.error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "msalErrorDescription", {
        get: function () { return "msal.error.description"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "msalSessionState", {
        get: function () { return "msal.session.state"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "tokenKeys", {
        get: function () { return "msal.token.keys"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "accessTokenKey", {
        get: function () { return "msal.access.token.key"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "expirationKey", {
        get: function () { return "msal.expiration.key"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "stateLogin", {
        get: function () { return "msal.state.login"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "stateAcquireToken", {
        get: function () { return "msal.state.acquireToken"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "stateRenew", {
        get: function () { return "msal.state.renew"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "nonceIdToken", {
        get: function () { return "msal.nonce.idtoken"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "userName", {
        get: function () { return "msal.username"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "idTokenKey", {
        get: function () { return "msal.idtoken"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "loginRequest", {
        get: function () { return "msal.login.request"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "loginError", {
        get: function () { return "msal.login.error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "renewStatus", {
        get: function () { return "msal.token.renew.status"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "msal", {
        get: function () { return "msal"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "resourceDelimeter", {
        get: function () { return "|"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "tokenRenewStatusCancelled", {
        get: function () { return "Canceled"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "tokenRenewStatusCompleted", {
        get: function () { return "Completed"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "tokenRenewStatusInProgress", {
        get: function () { return "In Progress"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "popUpWidth", {
        get: function () { return this._popUpWidth; },
        set: function (width) {
            this._popUpWidth = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "popUpHeight", {
        get: function () { return this._popUpHeight; },
        set: function (height) {
            this._popUpHeight = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "login", {
        get: function () { return "LOGIN"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "renewToken", {
        get: function () { return "RENEW_TOKEN"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "unknown", {
        get: function () { return "UNKNOWN"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "urlHash", {
        get: function () { return "msal.urlHash"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "angularLoginRequest", {
        get: function () { return "msal.angular.login.request"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Constants, "userIdentifier", {
        get: function () { return "userIdentifier"; },
        enumerable: true,
        configurable: true
    });
    Constants._popUpWidth = 483;
    Constants._popUpHeight = 600;
    return Constants;
}());
exports.Constants = Constants;
/*
 * @hidden
 */
var ErrorCodes = /** @class */ (function () {
    function ErrorCodes() {
    }
    Object.defineProperty(ErrorCodes, "loginProgressError", {
        get: function () { return "login_progress_error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorCodes, "acquireTokenProgressError", {
        get: function () { return "acquiretoken_progress_error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorCodes, "inputScopesError", {
        get: function () { return "input_scopes_error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorCodes, "endpointResolutionError", {
        get: function () { return "endpoints_resolution_error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorCodes, "popUpWindowError", {
        get: function () { return "popup_window_error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorCodes, "userLoginError", {
        get: function () { return "user_login_error"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorCodes, "userCancelledError", {
        get: function () { return "user_cancelled"; },
        enumerable: true,
        configurable: true
    });
    return ErrorCodes;
}());
exports.ErrorCodes = ErrorCodes;
/*
 * @hidden
 */
var ErrorDescription = /** @class */ (function () {
    function ErrorDescription() {
    }
    Object.defineProperty(ErrorDescription, "loginProgressError", {
        get: function () { return "Login is in progress"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorDescription, "acquireTokenProgressError", {
        get: function () { return "Acquire token is in progress"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorDescription, "inputScopesError", {
        get: function () { return "Invalid value of input scopes provided"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorDescription, "endpointResolutionError", {
        get: function () { return "Endpoints cannot be resolved"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorDescription, "popUpWindowError", {
        get: function () { return "Error opening popup window. This can happen if you are using IE or if popups are blocked in the browser."; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorDescription, "userLoginError", {
        get: function () { return "User login is required"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorDescription, "userCancelledError", {
        get: function () { return "User closed the popup window window and cancelled the flow"; },
        enumerable: true,
        configurable: true
    });
    return ErrorDescription;
}());
exports.ErrorDescription = ErrorDescription;
//# sourceMappingURL=Constants.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/ErrorMessage.js":
/*!********************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/ErrorMessage.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  * Copyright (c) Microsoft Corporation
  *  All Rights Reserved
  *  MIT License
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy of this
  * software and associated documentation files (the "Software"), to deal in the Software
  * without restriction, including without limitation the rights to use, copy, modify,
  * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  * permit persons to whom the Software is furnished to do so, subject to the following
  * conditions:
  *
  * The above copyright notice and this permission notice shall be
  * included in all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
  * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
  * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @hidden
 */
var ErrorMessage = /** @class */ (function () {
    function ErrorMessage() {
    }
    Object.defineProperty(ErrorMessage, "authorityUriInvalidPath", {
        get: function () { return "AuthorityUriInvalidPath"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorMessage, "authorityUriInsecure", {
        get: function () { return "AuthorityUriInsecure"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorMessage, "invalidAuthorityType", {
        get: function () { return "InvalidAuthorityType"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorMessage, "unsupportedAuthorityValidation", {
        get: function () { return "UnsupportedAuthorityValidation"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorMessage, "b2cAuthorityUriInvalidPath", {
        get: function () { return "B2cAuthorityUriInvalidPath"; },
        enumerable: true,
        configurable: true
    });
    return ErrorMessage;
}());
exports.ErrorMessage = ErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/IdToken.js":
/*!***************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/IdToken.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  * Copyright (c) Microsoft Corporation
  *  All Rights Reserved
  *  MIT License
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy of this
  * software and associated documentation files (the "Software"), to deal in the Software
  * without restriction, including without limitation the rights to use, copy, modify,
  * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  * permit persons to whom the Software is furnished to do so, subject to the following
  * conditions:
  *
  * The above copyright notice and this permission notice shall be
  * included in all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
  * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
  * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./node_modules/msal/lib-commonjs/Utils.js");
/*
 * @hidden
 */
var IdToken = /** @class */ (function () {
    function IdToken(rawIdToken) {
        if (Utils_1.Utils.isEmpty(rawIdToken)) {
            throw new Error("null or empty raw idtoken");
        }
        try {
            this.rawIdToken = rawIdToken;
            this.decodedIdToken = Utils_1.Utils.extractIdToken(rawIdToken);
            if (this.decodedIdToken) {
                if (this.decodedIdToken.hasOwnProperty("iss")) {
                    this.issuer = this.decodedIdToken["iss"];
                }
                if (this.decodedIdToken.hasOwnProperty("oid")) {
                    this.objectId = this.decodedIdToken['oid'];
                }
                if (this.decodedIdToken.hasOwnProperty("sub")) {
                    this.subject = this.decodedIdToken["sub"];
                }
                if (this.decodedIdToken.hasOwnProperty("tid")) {
                    this.tenantId = this.decodedIdToken["tid"];
                }
                if (this.decodedIdToken.hasOwnProperty("ver")) {
                    this.version = this.decodedIdToken["ver"];
                }
                if (this.decodedIdToken.hasOwnProperty("preferred_username")) {
                    this.preferredName = this.decodedIdToken["preferred_username"];
                }
                if (this.decodedIdToken.hasOwnProperty("name")) {
                    this.name = this.decodedIdToken["name"];
                }
                if (this.decodedIdToken.hasOwnProperty("nonce")) {
                    this.nonce = this.decodedIdToken["nonce"];
                }
                if (this.decodedIdToken.hasOwnProperty("exp")) {
                    this.expiration = this.decodedIdToken["exp"];
                }
                if (this.decodedIdToken.hasOwnProperty("home_oid")) {
                    this.homeObjectId = this.decodedIdToken["home_oid"];
                }
            }
        }
        catch (e) {
            throw new Error("Failed to parse the returned id token");
        }
    }
    return IdToken;
}());
exports.IdToken = IdToken;
//# sourceMappingURL=IdToken.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/Logger.js":
/*!**************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/Logger.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./node_modules/msal/lib-commonjs/Utils.js");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 0] = "Error";
    LogLevel[LogLevel["Warning"] = 1] = "Warning";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var Logger = /** @class */ (function () {
    function Logger(localCallback, options) {
        if (options === void 0) { options = {}; }
        /*
         * @hidden
         */
        this._level = LogLevel.Info;
        var _a = options.correlationId, correlationId = _a === void 0 ? "" : _a, _b = options.level, level = _b === void 0 ? LogLevel.Info : _b, _c = options.piiLoggingEnabled, piiLoggingEnabled = _c === void 0 ? false : _c;
        this._localCallback = localCallback;
        this._correlationId = correlationId;
        this._level = level;
        this._piiLoggingEnabled = piiLoggingEnabled;
    }
    /*
     * @hidden
     */
    Logger.prototype.logMessage = function (logLevel, logMessage, containsPii) {
        if ((logLevel > this._level) || (!this._piiLoggingEnabled && containsPii)) {
            return;
        }
        var timestamp = new Date().toUTCString();
        var log;
        if (!Utils_1.Utils.isEmpty(this._correlationId)) {
            log = timestamp + ":" + this._correlationId + "-" + Utils_1.Utils.getLibraryVersion() + "-" + LogLevel[logLevel] + " " + logMessage;
        }
        else {
            log = timestamp + ":" + Utils_1.Utils.getLibraryVersion() + "-" + LogLevel[logLevel] + " " + logMessage;
        }
        this.executeCallback(logLevel, log, containsPii);
    };
    /*
     * @hidden
     */
    Logger.prototype.executeCallback = function (level, message, containsPii) {
        if (this._localCallback) {
            this._localCallback(level, message, containsPii);
        }
    };
    /*
     * @hidden
     */
    Logger.prototype.error = function (message) {
        this.logMessage(LogLevel.Error, message, false);
    };
    /*
     * @hidden
     */
    Logger.prototype.errorPii = function (message) {
        this.logMessage(LogLevel.Error, message, true);
    };
    /*
     * @hidden
     */
    Logger.prototype.warning = function (message) {
        this.logMessage(LogLevel.Warning, message, false);
    };
    /*
     * @hidden
     */
    Logger.prototype.warningPii = function (message) {
        this.logMessage(LogLevel.Warning, message, true);
    };
    /*
     * @hidden
     */
    Logger.prototype.info = function (message) {
        this.logMessage(LogLevel.Info, message, false);
    };
    /*
     * @hidden
     */
    Logger.prototype.infoPii = function (message) {
        this.logMessage(LogLevel.Info, message, true);
    };
    /*
     * @hidden
     */
    Logger.prototype.verbose = function (message) {
        this.logMessage(LogLevel.Verbose, message, false);
    };
    /*
     * @hidden
     */
    Logger.prototype.verbosePii = function (message) {
        this.logMessage(LogLevel.Verbose, message, true);
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/RequestInfo.js":
/*!*******************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/RequestInfo.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @hidden
 */
var TokenResponse = /** @class */ (function () {
    function TokenResponse() {
        this.valid = false;
        this.parameters = {};
        this.stateMatch = false;
        this.stateResponse = "";
        this.requestType = "unknown";
    }
    return TokenResponse;
}());
exports.TokenResponse = TokenResponse;
//# sourceMappingURL=RequestInfo.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/Storage.js":
/*!***************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/Storage.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = __webpack_require__(/*! ./Constants */ "./node_modules/msal/lib-commonjs/Constants.js");
var AccessTokenCacheItem_1 = __webpack_require__(/*! ./AccessTokenCacheItem */ "./node_modules/msal/lib-commonjs/AccessTokenCacheItem.js");
/*
 * @hidden
 */
var Storage = /** @class */ (function () {
    function Storage(cacheLocation) {
        if (Storage._instance) {
            return Storage._instance;
        }
        this._cacheLocation = cacheLocation;
        this._localStorageSupported = typeof window[this._cacheLocation] !== "undefined" && window[this._cacheLocation] != null;
        this._sessionStorageSupported = typeof window[cacheLocation] !== "undefined" && window[cacheLocation] != null;
        Storage._instance = this;
        if (!this._localStorageSupported && !this._sessionStorageSupported) {
            throw new Error("localStorage and sessionStorage not supported");
        }
        return Storage._instance;
    }
    // add value to storage
    Storage.prototype.setItem = function (key, value) {
        if (window[this._cacheLocation]) {
            window[this._cacheLocation].setItem(key, value);
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    // get one item by key from storage
    Storage.prototype.getItem = function (key) {
        if (window[this._cacheLocation]) {
            return window[this._cacheLocation].getItem(key);
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    // remove value from storage
    Storage.prototype.removeItem = function (key) {
        if (window[this._cacheLocation]) {
            return window[this._cacheLocation].removeItem(key);
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    // clear storage (remove all items from it)
    Storage.prototype.clear = function () {
        if (window[this._cacheLocation]) {
            return window[this._cacheLocation].clear();
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    Storage.prototype.getAllAccessTokens = function (clientId, userIdentifier) {
        var results = [];
        var accessTokenCacheItem;
        var storage = window[this._cacheLocation];
        if (storage) {
            var key = void 0;
            for (key in storage) {
                if (storage.hasOwnProperty(key)) {
                    if (key.match(clientId) && key.match(userIdentifier)) {
                        var value = this.getItem(key);
                        if (value) {
                            accessTokenCacheItem = new AccessTokenCacheItem_1.AccessTokenCacheItem(JSON.parse(key), JSON.parse(value));
                            results.push(accessTokenCacheItem);
                        }
                    }
                }
            }
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
        return results;
    };
    Storage.prototype.removeAcquireTokenEntries = function (authorityKey, acquireTokenUserKey) {
        var storage = window[this._cacheLocation];
        if (storage) {
            var key = void 0;
            for (key in storage) {
                if (storage.hasOwnProperty(key)) {
                    if ((authorityKey != "" && key.indexOf(authorityKey) > -1) || (acquireTokenUserKey != "" && key.indexOf(acquireTokenUserKey) > -1)) {
                        this.removeItem(key);
                    }
                }
            }
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    Storage.prototype.resetCacheItems = function () {
        var storage = window[this._cacheLocation];
        if (storage) {
            var key = void 0;
            for (key in storage) {
                if (storage.hasOwnProperty(key) && key.indexOf(Constants_1.Constants.msal) !== -1) {
                    this.setItem(key, "");
                }
                if (storage.hasOwnProperty(key) && key.indexOf(Constants_1.Constants.renewStatus) !== -1)
                    this.removeItem(key);
            }
        }
        else {
            throw new Error("localStorage and sessionStorage are not supported");
        }
    };
    return Storage;
}());
exports.Storage = Storage;
//# sourceMappingURL=Storage.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/User.js":
/*!************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/User.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(/*! ./Utils */ "./node_modules/msal/lib-commonjs/Utils.js");
var User = /** @class */ (function () {
    /*
     * @hidden
     */
    function User(displayableId, name, identityProvider, userIdentifier, idToken) {
        this.displayableId = displayableId;
        this.name = name;
        this.identityProvider = identityProvider;
        this.userIdentifier = userIdentifier;
        this.idToken = idToken;
    }
    /*
     * @hidden
     */
    User.createUser = function (idToken, clientInfo, authority) {
        var uid;
        var utid;
        if (!clientInfo) {
            uid = "";
            utid = "";
        }
        else {
            uid = clientInfo.uid;
            utid = clientInfo.utid;
        }
        var userIdentifier = Utils_1.Utils.base64EncodeStringUrlSafe(uid) + "." + Utils_1.Utils.base64EncodeStringUrlSafe(utid);
        return new User(idToken.preferredName, idToken.name, idToken.issuer, userIdentifier, idToken.decodedIdToken);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/UserAgentApplication.js":
/*!****************************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/UserAgentApplication.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
var AccessTokenKey_1 = __webpack_require__(/*! ./AccessTokenKey */ "./node_modules/msal/lib-commonjs/AccessTokenKey.js");
var AccessTokenValue_1 = __webpack_require__(/*! ./AccessTokenValue */ "./node_modules/msal/lib-commonjs/AccessTokenValue.js");
var AuthenticationRequestParameters_1 = __webpack_require__(/*! ./AuthenticationRequestParameters */ "./node_modules/msal/lib-commonjs/AuthenticationRequestParameters.js");
var ClientInfo_1 = __webpack_require__(/*! ./ClientInfo */ "./node_modules/msal/lib-commonjs/ClientInfo.js");
var Constants_1 = __webpack_require__(/*! ./Constants */ "./node_modules/msal/lib-commonjs/Constants.js");
var IdToken_1 = __webpack_require__(/*! ./IdToken */ "./node_modules/msal/lib-commonjs/IdToken.js");
var Logger_1 = __webpack_require__(/*! ./Logger */ "./node_modules/msal/lib-commonjs/Logger.js");
var Storage_1 = __webpack_require__(/*! ./Storage */ "./node_modules/msal/lib-commonjs/Storage.js");
var RequestInfo_1 = __webpack_require__(/*! ./RequestInfo */ "./node_modules/msal/lib-commonjs/RequestInfo.js");
var User_1 = __webpack_require__(/*! ./User */ "./node_modules/msal/lib-commonjs/User.js");
var Utils_1 = __webpack_require__(/*! ./Utils */ "./node_modules/msal/lib-commonjs/Utils.js");
var AuthorityFactory_1 = __webpack_require__(/*! ./AuthorityFactory */ "./node_modules/msal/lib-commonjs/AuthorityFactory.js");
/*
 * @hidden
 */
var ResponseTypes = {
    id_token: "id_token",
    token: "token",
    id_token_token: "id_token token"
};
var resolveTokenOnlyIfOutOfIframe = function (target, propertyKey, descriptor) {
    var tokenAcquisitionMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.isInIframe()
            ? new Promise(function () { })
            : tokenAcquisitionMethod.apply(this, args);
    };
    return descriptor;
};
var UserAgentApplication = /** @class */ (function () {
    /*
     * Initialize a UserAgentApplication with a given clientId and authority.
     * @constructor
     * @param {string} clientId - The clientID of your application, you should get this from the application registration portal.
     * @param {string} authority - A URL indicating a directory that MSAL can use to obtain tokens.
     * - In Azure AD, it is of the form https://&lt;instance>/&lt;tenant&gt;,\ where &lt;instance&gt; is the directory host (e.g. https://login.microsoftonline.com) and &lt;tenant&gt; is a identifier within the directory itself (e.g. a domain associated to the tenant, such as contoso.onmicrosoft.com, or the GUID representing the TenantID property of the directory)
     * - In Azure B2C, it is of the form https://&lt;instance&gt;/tfp/&lt;tenantId&gt;/&lt;policyName&gt;/
     * - Default value is: "https://login.microsoftonline.com/common"
     * @param _tokenReceivedCallback -  The function that will get the call back once this API is completed (either successfully or with a failure).
     * @param {boolean} validateAuthority -  boolean to turn authority validation on/off.
     */
    function UserAgentApplication(clientId, authority, tokenReceivedCallback, options) {
        if (options === void 0) { options = {}; }
        /*
         * @hidden
         */
        this._cacheLocations = {
            localStorage: "localStorage",
            sessionStorage: "sessionStorage"
        };
        /*
         * @hidden
         */
        this._clockSkew = 300;
        /*
         * @hidden
         */
        this._tokenReceivedCallback = null;
        this._isAngular = false;
        var _a = options.validateAuthority, validateAuthority = _a === void 0 ? true : _a, _b = options.cacheLocation, cacheLocation = _b === void 0 ? "sessionStorage" : _b, _c = options.redirectUri, redirectUri = _c === void 0 ? window.location.href.split("?")[0].split("#")[0] : _c, _d = options.postLogoutRedirectUri, postLogoutRedirectUri = _d === void 0 ? window.location.href.split("?")[0].split("#")[0] : _d, _e = options.logger, logger = _e === void 0 ? new Logger_1.Logger(null) : _e, _f = options.loadFrameTimeout, loadFrameTimeout = _f === void 0 ? 6000 : _f, _g = options.navigateToLoginRequestUrl, navigateToLoginRequestUrl = _g === void 0 ? true : _g, _h = options.isAngular, isAngular = _h === void 0 ? false : _h, _j = options.anonymousEndpoints, anonymousEndpoints = _j === void 0 ? new Array() : _j, _k = options.endPoints, endPoints = _k === void 0 ? new Map() : _k;
        this.loadFrameTimeout = loadFrameTimeout;
        this.clientId = clientId;
        this.validateAuthority = validateAuthority;
        this.authority = authority || "https://login.microsoftonline.com/common";
        this._tokenReceivedCallback = tokenReceivedCallback;
        this._redirectUri = redirectUri;
        this._postLogoutredirectUri = postLogoutRedirectUri;
        this._loginInProgress = false;
        this._acquireTokenInProgress = false;
        this._cacheLocation = cacheLocation;
        this._navigateToLoginRequestUrl = navigateToLoginRequestUrl;
        this._isAngular = isAngular;
        this._anonymousEndpoints = anonymousEndpoints;
        this._endpoints = endPoints;
        if (!this._cacheLocations[cacheLocation]) {
            throw new Error("Cache Location is not valid. Provided value:" + this._cacheLocation + ".Possible values are: " + this._cacheLocations.localStorage + ", " + this._cacheLocations.sessionStorage);
        }
        this._cacheStorage = new Storage_1.Storage(this._cacheLocation); //cache keys msal
        this._logger = logger;
        window.openedWindows = [];
        window.activeRenewals = {};
        window.renewStates = [];
        window.callBackMappedToRenewStates = {};
        window.callBacksMappedToRenewStates = {};
        window.msal = this;
        var urlHash = window.location.hash;
        var isCallback = this.isCallback(urlHash);
        if (!this._isAngular) {
            if (isCallback) {
                this.handleAuthenticationResponse.call(this, urlHash);
            }
            else {
                var pendingCallback = this._cacheStorage.getItem(Constants_1.Constants.urlHash);
                if (pendingCallback) {
                    this.processCallBack(pendingCallback);
                }
            }
        }
    }
    Object.defineProperty(UserAgentApplication.prototype, "cacheLocation", {
        /*
         * Used to get the cache location
         */
        get: function () {
            return this._cacheLocation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserAgentApplication.prototype, "authority", {
        /*
         * Used to get the authority.
         */
        get: function () {
            return this.authorityInstance.CanonicalAuthority;
        },
        /*
         * Used to set the authority.
         * @param {string} authority - A URL indicating a directory that MSAL can use to obtain tokens.
         * - In Azure AD, it is of the form https://&lt;tenant&gt;/&lt;tenant&gt;, where &lt;tenant&gt; is the directory host (e.g. https://login.microsoftonline.com) and &lt;tenant&gt; is a identifier within the directory itself (e.g. a domain associated to the tenant, such as contoso.onmicrosoft.com, or the GUID representing the TenantID property of the directory)
         * - In Azure B2C, it is of the form https://&lt;instance&gt;/tfp/&lt;tenant&gt;/<policyName>/
         * - Default value is: "https://login.microsoftonline.com/common"
         */
        set: function (val) {
            this.authorityInstance = AuthorityFactory_1.AuthorityFactory.CreateInstance(val, this.validateAuthority);
        },
        enumerable: true,
        configurable: true
    });
    /*
     * Used to call the constructor callback with the token/error
     * @param {string} [hash=window.location.hash] - Hash fragment of Url.
     * @hidden
     */
    UserAgentApplication.prototype.processCallBack = function (hash) {
        this._logger.info('Processing the callback from redirect response');
        var requestInfo = this.getRequestInfo(hash);
        this.saveTokenFromHash(requestInfo);
        var token = requestInfo.parameters[Constants_1.Constants.accessToken] || requestInfo.parameters[Constants_1.Constants.idToken];
        var errorDesc = requestInfo.parameters[Constants_1.Constants.errorDescription];
        var error = requestInfo.parameters[Constants_1.Constants.error];
        var tokenType;
        if (requestInfo.parameters[Constants_1.Constants.accessToken]) {
            tokenType = Constants_1.Constants.accessToken;
        }
        else {
            tokenType = Constants_1.Constants.idToken;
        }
        this._cacheStorage.removeItem(Constants_1.Constants.urlHash);
        try {
            if (this._tokenReceivedCallback) {
                this._tokenReceivedCallback.call(this, errorDesc, token, error, tokenType);
            }
        }
        catch (err) {
            this._logger.error("Error occurred in token received callback function: " + err);
        }
    };
    /*
     * Initiate the login process by redirecting the user to the STS authorization endpoint.
     * @param {Array.<string>} scopes - Permissions you want included in the access token. Not all scopes are guaranteed to be included in the access token returned.
     * @param {string} extraQueryParameters - Key-value pairs to pass to the authentication server during the interactive authentication flow.
     */
    UserAgentApplication.prototype.loginRedirect = function (scopes, extraQueryParameters) {
        var _this = this;
        /*
        1. Create navigate url
        2. saves value in cache
        3. redirect user to AAD
         */
        if (this._loginInProgress) {
            if (this._tokenReceivedCallback) {
                this._tokenReceivedCallback(Constants_1.ErrorDescription.loginProgressError, null, Constants_1.ErrorCodes.loginProgressError, Constants_1.Constants.idToken);
                return;
            }
        }
        if (scopes) {
            var isValidScope = this.validateInputScope(scopes);
            if (isValidScope && !Utils_1.Utils.isEmpty(isValidScope)) {
                if (this._tokenReceivedCallback) {
                    this._tokenReceivedCallback(Constants_1.ErrorDescription.inputScopesError, null, Constants_1.ErrorCodes.inputScopesError, Constants_1.Constants.idToken);
                    return;
                }
            }
            scopes = this.filterScopes(scopes);
        }
        this._loginInProgress = true;
        this.authorityInstance.ResolveEndpointsAsync()
            .then(function () {
            var authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(_this.authorityInstance, _this.clientId, scopes, ResponseTypes.id_token, _this._redirectUri);
            if (extraQueryParameters) {
                authenticationRequest.extraQueryParameters = extraQueryParameters;
            }
            var loginStartPage = _this._cacheStorage.getItem(Constants_1.Constants.angularLoginRequest);
            if (!loginStartPage || loginStartPage === "") {
                loginStartPage = window.location.href;
            }
            else {
                _this._cacheStorage.setItem(Constants_1.Constants.angularLoginRequest, "");
            }
            _this._cacheStorage.setItem(Constants_1.Constants.loginRequest, loginStartPage);
            _this._cacheStorage.setItem(Constants_1.Constants.loginError, "");
            _this._cacheStorage.setItem(Constants_1.Constants.stateLogin, authenticationRequest.state);
            _this._cacheStorage.setItem(Constants_1.Constants.nonceIdToken, authenticationRequest.nonce);
            _this._cacheStorage.setItem(Constants_1.Constants.msalError, "");
            _this._cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, "");
            var authorityKey = Constants_1.Constants.authority + Constants_1.Constants.resourceDelimeter + authenticationRequest.state;
            if (Utils_1.Utils.isEmpty(_this._cacheStorage.getItem(authorityKey))) {
                _this._cacheStorage.setItem(authorityKey, _this.authority);
            }
            var urlNavigate = authenticationRequest.createNavigateUrl(scopes) + "&prompt=select_account" + "&response_mode=fragment";
            _this.promptUser(urlNavigate);
        });
    };
    /*
     * Initiate the login process by opening a popup window.
     * @param {Array.<string>} scopes - Permissions you want included in the access token. Not all scopes are  guaranteed to be included in the access token returned.
     * @param {string} extraQueryParameters - Key-value pairs to pass to the STS during the interactive authentication flow.
     * @returns {Promise.<string>} - A Promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the token or error.
     */
    UserAgentApplication.prototype.loginPopup = function (scopes, extraQueryParameters) {
        var _this = this;
        /*
        1. Create navigate url
        2. saves value in cache
        3. redirect user to AAD
         */
        return new Promise(function (resolve, reject) {
            if (_this._loginInProgress) {
                reject(Constants_1.ErrorCodes.loginProgressError + "|" + Constants_1.ErrorDescription.loginProgressError);
                return;
            }
            if (scopes) {
                var isValidScope = _this.validateInputScope(scopes);
                if (isValidScope && !Utils_1.Utils.isEmpty(isValidScope)) {
                    reject(Constants_1.ErrorCodes.inputScopesError + "|" + Constants_1.ErrorDescription.inputScopesError);
                    return;
                }
                scopes = _this.filterScopes(scopes);
            }
            else {
                scopes = [_this.clientId];
            }
            var scope = scopes.join(" ").toLowerCase();
            var popUpWindow = _this.openWindow("about:blank", "_blank", 1, _this, resolve, reject);
            if (!popUpWindow) {
                return;
            }
            _this._loginInProgress = true;
            _this.authorityInstance.ResolveEndpointsAsync().then(function () {
                var authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(_this.authorityInstance, _this.clientId, scopes, ResponseTypes.id_token, _this._redirectUri);
                if (extraQueryParameters) {
                    authenticationRequest.extraQueryParameters = extraQueryParameters;
                }
                _this._cacheStorage.setItem(Constants_1.Constants.loginRequest, window.location.href);
                _this._cacheStorage.setItem(Constants_1.Constants.loginError, "");
                _this._cacheStorage.setItem(Constants_1.Constants.nonceIdToken, authenticationRequest.nonce);
                _this._cacheStorage.setItem(Constants_1.Constants.msalError, "");
                _this._cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, "");
                var authorityKey = Constants_1.Constants.authority + Constants_1.Constants.resourceDelimeter + authenticationRequest.state;
                if (Utils_1.Utils.isEmpty(_this._cacheStorage.getItem(authorityKey))) {
                    _this._cacheStorage.setItem(authorityKey, _this.authority);
                }
                var urlNavigate = authenticationRequest.createNavigateUrl(scopes) + "&prompt=select_account" + "&response_mode=fragment";
                window.renewStates.push(authenticationRequest.state);
                window.requestType = Constants_1.Constants.login;
                _this.registerCallback(authenticationRequest.state, scope, resolve, reject);
                if (popUpWindow) {
                    _this._logger.infoPii("Navigated Popup window to:" + urlNavigate);
                    popUpWindow.location.href = urlNavigate;
                }
            }, function () {
                _this._logger.info(Constants_1.ErrorCodes.endpointResolutionError + ":" + Constants_1.ErrorDescription.endpointResolutionError);
                _this._cacheStorage.setItem(Constants_1.Constants.msalError, Constants_1.ErrorCodes.endpointResolutionError);
                _this._cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, Constants_1.ErrorDescription.endpointResolutionError);
                if (reject) {
                    reject(Constants_1.ErrorCodes.endpointResolutionError + ":" + Constants_1.ErrorDescription.endpointResolutionError);
                }
                if (popUpWindow) {
                    popUpWindow.close();
                }
            }).catch(function (err) {
                _this._logger.warning("could not resolve endpoints");
                reject(err);
            });
        });
    };
    /*
      * Used to redirect the browser to the STS authorization endpoint
      * @param {string} urlNavigate - URL of the authorization endpoint
      * @hidden
      */
    UserAgentApplication.prototype.promptUser = function (urlNavigate) {
        if (urlNavigate && !Utils_1.Utils.isEmpty(urlNavigate)) {
            this._logger.infoPii("Navigate to:" + urlNavigate);
            window.location.replace(urlNavigate);
        }
        else {
            this._logger.info("Navigate url is empty");
        }
    };
    /*
     * Used to send the user to the redirect_uri after authentication is complete. The user"s bearer token is attached to the URI fragment as an id_token/access_token field.
     * This function also closes the popup window after redirection.
     * @hidden
     * @ignore
     */
    UserAgentApplication.prototype.openWindow = function (urlNavigate, title, interval, instance, resolve, reject) {
        var _this = this;
        var popupWindow = this.openPopup(urlNavigate, title, Constants_1.Constants.popUpWidth, Constants_1.Constants.popUpHeight);
        if (popupWindow == null) {
            instance._loginInProgress = false;
            instance._acquireTokenInProgress = false;
            this._logger.info(Constants_1.ErrorCodes.popUpWindowError + ":" + Constants_1.ErrorDescription.popUpWindowError);
            this._cacheStorage.setItem(Constants_1.Constants.msalError, Constants_1.ErrorCodes.popUpWindowError);
            this._cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, Constants_1.ErrorDescription.popUpWindowError);
            if (reject) {
                reject(Constants_1.ErrorCodes.popUpWindowError + "|" + Constants_1.ErrorDescription.popUpWindowError);
            }
            return null;
        }
        window.openedWindows.push(popupWindow);
        var pollTimer = window.setInterval(function () {
            if (popupWindow && popupWindow.closed && instance._loginInProgress) {
                if (reject) {
                    reject(Constants_1.ErrorCodes.userCancelledError + "|" + Constants_1.ErrorDescription.userCancelledError);
                }
                window.clearInterval(pollTimer);
                if (_this._isAngular) {
                    _this.broadcast('msal:popUpClosed', Constants_1.ErrorCodes.userCancelledError + "|" + Constants_1.ErrorDescription.userCancelledError);
                    return;
                }
                instance._loginInProgress = false;
                instance._acquireTokenInProgress = false;
            }
            try {
                var popUpWindowLocation = popupWindow.location;
                if (popUpWindowLocation.href.indexOf(_this._redirectUri) !== -1) {
                    window.clearInterval(pollTimer);
                    instance._loginInProgress = false;
                    instance._acquireTokenInProgress = false;
                    _this._logger.info("Closing popup window");
                    if (_this._isAngular) {
                        _this.broadcast('msal:popUpHashChanged', popUpWindowLocation.hash);
                        for (var i = 0; i < window.openedWindows.length; i++) {
                            window.openedWindows[i].close();
                        }
                    }
                }
            }
            catch (e) {
                //Cross Domain url check error. Will be thrown until AAD redirects the user back to the app"s root page with the token. No need to log or throw this error as it will create unnecessary traffic.
            }
        }, interval);
        return popupWindow;
    };
    UserAgentApplication.prototype.broadcast = function (eventName, data) {
        var evt = new CustomEvent(eventName, { detail: data });
        window.dispatchEvent(evt);
    };
    /*
     * Used to log out the current user, and redirect the user to the postLogoutRedirectUri.
     * Defaults behaviour is to redirect the user to `window.location.href`.
     */
    UserAgentApplication.prototype.logout = function () {
        this.clearCache();
        this._user = null;
        var logout = "";
        if (this._postLogoutredirectUri) {
            logout = "post_logout_redirect_uri=" + encodeURIComponent(this._postLogoutredirectUri);
        }
        var urlNavigate = this.authority + "/oauth2/v2.0/logout?" + logout;
        this.promptUser(urlNavigate);
    };
    /*
     * Used to configure the popup window for login.
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.clearCache = function () {
        window.renewStates = [];
        var accessTokenItems = this._cacheStorage.getAllAccessTokens(Constants_1.Constants.clientId, Constants_1.Constants.userIdentifier);
        for (var i = 0; i < accessTokenItems.length; i++) {
            this._cacheStorage.removeItem(JSON.stringify(accessTokenItems[i].key));
        }
        this._cacheStorage.resetCacheItems();
    };
    UserAgentApplication.prototype.clearCacheForScope = function (accessToken) {
        var accessTokenItems = this._cacheStorage.getAllAccessTokens(Constants_1.Constants.clientId, Constants_1.Constants.userIdentifier);
        for (var i = 0; i < accessTokenItems.length; i++) {
            var token = accessTokenItems[i];
            if (token.value.accessToken == accessToken) {
                this._cacheStorage.removeItem(JSON.stringify(token.key));
            }
        }
    };
    /*
     * Configures popup window for login.
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.openPopup = function (urlNavigate, title, popUpWidth, popUpHeight) {
        try {
            /*
             * adding winLeft and winTop to account for dual monitor
             * using screenLeft and screenTop for IE8 and earlier
             */
            var winLeft = window.screenLeft ? window.screenLeft : window.screenX;
            var winTop = window.screenTop ? window.screenTop : window.screenY;
            /*
             * window.innerWidth displays browser window"s height and width excluding toolbars
             * using document.documentElement.clientWidth for IE8 and earlier
             */
            var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var left = ((width / 2) - (popUpWidth / 2)) + winLeft;
            var top_1 = ((height / 2) - (popUpHeight / 2)) + winTop;
            var popupWindow = window.open(urlNavigate, title, "width=" + popUpWidth + ", height=" + popUpHeight + ", top=" + top_1 + ", left=" + left);
            if (popupWindow.focus) {
                popupWindow.focus();
            }
            return popupWindow;
        }
        catch (e) {
            this._logger.error("error opening popup " + e.message);
            this._loginInProgress = false;
            this._acquireTokenInProgress = false;
            return null;
        }
    };
    /*
     * Used to validate the scopes input parameter requested  by the developer.
     * @param {Array<string>} scopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.validateInputScope = function (scopes) {
        if (!scopes || scopes.length < 1) {
            return "Scopes cannot be passed as an empty array";
        }
        if (!Array.isArray(scopes)) {
            throw new Error("API does not accept non-array scopes");
        }
        if (scopes.indexOf(this.clientId) > -1) {
            if (scopes.length > 1) {
                return "ClientId can only be provided as a single scope";
            }
        }
        return "";
    };
    /*
      * Used to remove openid and profile from the list of scopes passed by the developer.These scopes are added by default
      * @hidden
      */
    UserAgentApplication.prototype.filterScopes = function (scopes) {
        scopes = scopes.filter(function (element) {
            return element !== "openid";
        });
        scopes = scopes.filter(function (element) {
            return element !== "profile";
        });
        return scopes;
    };
    /*
     * Used to add the developer requested callback to the array of callbacks for the specified scopes. The updated array is stored on the window object
     * @param {string} scope - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {string} expectedState - Unique state identifier (guid).
     * @param {Function} resolve - The resolve function of the promise object.
     * @param {Function} reject - The reject function of the promise object.
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.registerCallback = function (expectedState, scope, resolve, reject) {
        var _this = this;
        window.activeRenewals[scope] = expectedState;
        if (!window.callBacksMappedToRenewStates[expectedState]) {
            window.callBacksMappedToRenewStates[expectedState] = [];
        }
        window.callBacksMappedToRenewStates[expectedState].push({ resolve: resolve, reject: reject });
        if (!window.callBackMappedToRenewStates[expectedState]) {
            window.callBackMappedToRenewStates[expectedState] =
                function (errorDesc, token, error, tokenType) {
                    window.activeRenewals[scope] = null;
                    for (var i = 0; i < window.callBacksMappedToRenewStates[expectedState].length; ++i) {
                        try {
                            if (errorDesc || error) {
                                window.callBacksMappedToRenewStates[expectedState][i].reject(errorDesc + "|" + error);
                            }
                            else if (token) {
                                window.callBacksMappedToRenewStates[expectedState][i].resolve(token);
                            }
                        }
                        catch (e) {
                            _this._logger.warning(e);
                        }
                    }
                    window.callBacksMappedToRenewStates[expectedState] = null;
                    window.callBackMappedToRenewStates[expectedState] = null;
                };
        }
    };
    UserAgentApplication.prototype.getCachedTokenInternal = function (scopes, user) {
        var userObject = user ? user : this.getUser();
        if (!userObject) {
            return;
        }
        var authenticationRequest;
        var newAuthority = this.authorityInstance ? this.authorityInstance : AuthorityFactory_1.AuthorityFactory.CreateInstance(this.authority, this.validateAuthority);
        if (Utils_1.Utils.compareObjects(userObject, this.getUser())) {
            if (scopes.indexOf(this.clientId) > -1) {
                authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(newAuthority, this.clientId, scopes, ResponseTypes.id_token, this._redirectUri);
            }
            else {
                authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(newAuthority, this.clientId, scopes, ResponseTypes.token, this._redirectUri);
            }
        }
        else {
            authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(newAuthority, this.clientId, scopes, ResponseTypes.id_token_token, this._redirectUri);
        }
        return this.getCachedToken(authenticationRequest, user);
    };
    /*
     * Used to get token for the specified set of scopes from the cache
     * @param {AuthenticationRequestParameters} authenticationRequest - Request sent to the STS to obtain an id_token/access_token
     * @param {User} user - User for which the scopes were requested
     * @hidden
     */
    UserAgentApplication.prototype.getCachedToken = function (authenticationRequest, user) {
        var accessTokenCacheItem = null;
        var scopes = authenticationRequest.scopes;
        var tokenCacheItems = this._cacheStorage.getAllAccessTokens(this.clientId, user ? user.userIdentifier : null); //filter by clientId and user
        if (tokenCacheItems.length === 0) { // No match found after initial filtering
            return null;
        }
        var filteredItems = [];
        //if no authority passed
        if (!authenticationRequest.authority) {
            //filter by scope
            for (var i = 0; i < tokenCacheItems.length; i++) {
                var cacheItem = tokenCacheItems[i];
                var cachedScopes = cacheItem.key.scopes.split(" ");
                if (Utils_1.Utils.containsScope(cachedScopes, scopes)) {
                    filteredItems.push(cacheItem);
                }
            }
            //if only one cached token found
            if (filteredItems.length === 1) {
                accessTokenCacheItem = filteredItems[0];
                authenticationRequest.authorityInstance = AuthorityFactory_1.AuthorityFactory.CreateInstance(accessTokenCacheItem.key.authority, this.validateAuthority);
            }
            else if (filteredItems.length > 1) {
                return {
                    errorDesc: "The cache contains multiple tokens satisfying the requirements. Call AcquireToken again providing more requirements like authority",
                    token: null,
                    error: "multiple_matching_tokens_detected"
                };
            }
            else {
                //no match found. check if there was a single authority used
                var authorityList = this.getUniqueAuthority(tokenCacheItems, "authority");
                if (authorityList.length > 1) {
                    return {
                        errorDesc: "Multiple authorities found in the cache. Pass authority in the API overload.",
                        token: null,
                        error: "multiple_matching_tokens_detected"
                    };
                }
                authenticationRequest.authorityInstance = AuthorityFactory_1.AuthorityFactory.CreateInstance(authorityList[0], this.validateAuthority);
            }
        }
        else {
            //authority was passed in the API, filter by authority and scope
            for (var i = 0; i < tokenCacheItems.length; i++) {
                var cacheItem = tokenCacheItems[i];
                var cachedScopes = cacheItem.key.scopes.split(" ");
                if (Utils_1.Utils.containsScope(cachedScopes, scopes) && cacheItem.key.authority === authenticationRequest.authority) {
                    filteredItems.push(cacheItem);
                }
            }
            //no match
            if (filteredItems.length === 0) {
                return null;
            }
            //only one cachedToken Found
            else if (filteredItems.length === 1) {
                accessTokenCacheItem = filteredItems[0];
            }
            else {
                //more than one match found.
                return {
                    errorDesc: "The cache contains multiple tokens satisfying the requirements.Call AcquireToken again providing more requirements like authority",
                    token: null,
                    error: "multiple_matching_tokens_detected"
                };
            }
        }
        if (accessTokenCacheItem != null) {
            var expired = Number(accessTokenCacheItem.value.expiresIn);
            // If expiration is within offset, it will force renew
            var offset = this._clockSkew || 300;
            if (expired && (expired > Utils_1.Utils.now() + offset)) {
                return {
                    errorDesc: null,
                    token: accessTokenCacheItem.value.accessToken,
                    error: null
                };
            }
            else {
                this._cacheStorage.removeItem(JSON.stringify(filteredItems[0].key));
                return null;
            }
        }
        else {
            return null;
        }
    };
    /*
     * Used to filter all cached items and return a list of unique users based on userIdentifier.
     * @param {Array<User>} Users - users saved in the cache.
     */
    UserAgentApplication.prototype.getAllUsers = function () {
        var users = [];
        var accessTokenCacheItems = this._cacheStorage.getAllAccessTokens(Constants_1.Constants.clientId, Constants_1.Constants.userIdentifier);
        for (var i = 0; i < accessTokenCacheItems.length; i++) {
            var idToken = new IdToken_1.IdToken(accessTokenCacheItems[i].value.idToken);
            var clientInfo = new ClientInfo_1.ClientInfo(accessTokenCacheItems[i].value.clientInfo);
            var user = User_1.User.createUser(idToken, clientInfo, this.authority);
            users.push(user);
        }
        return this.getUniqueUsers(users);
    };
    /*
     * Used to filter users based on userIdentifier
     * @param {Array<User>}  Users - users saved in the cache
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.getUniqueUsers = function (users) {
        if (!users || users.length <= 1) {
            return users;
        }
        var flags = [];
        var uniqueUsers = [];
        for (var index = 0; index < users.length; ++index) {
            if (users[index].userIdentifier && flags.indexOf(users[index].userIdentifier) === -1) {
                flags.push(users[index].userIdentifier);
                uniqueUsers.push(users[index]);
            }
        }
        return uniqueUsers;
    };
    /*
    * Used to get a unique list of authoritues from the cache
    * @param {Array<AccessTokenCacheItem>}  accessTokenCacheItems - accessTokenCacheItems saved in the cache
    * @ignore
    * @hidden
    */
    UserAgentApplication.prototype.getUniqueAuthority = function (accessTokenCacheItems, property) {
        var authorityList = [];
        var flags = [];
        accessTokenCacheItems.forEach(function (element) {
            if (element.key.hasOwnProperty(property) && (flags.indexOf(element.key[property]) === -1)) {
                flags.push(element.key[property]);
                authorityList.push(element.key[property]);
            }
        });
        return authorityList;
    };
    /*
     * Adds login_hint to authorization URL which is used to pre-fill the username field of sign in page for the user if known ahead of time
     * domain_hint can be one of users/organisations which when added skips the email based discovery process of the user
     * domain_req utid received as part of the clientInfo
     * login_req uid received as part of clientInfo
     * @param {string} urlNavigate - Authentication request url
     * @param {User} user - User for which the token is requested
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.addHintParameters = function (urlNavigate, user) {
        var userObject = user ? user : this.getUser();
        var decodedClientInfo = userObject.userIdentifier.split(".");
        var uid = Utils_1.Utils.base64DecodeStringUrlSafe(decodedClientInfo[0]);
        var utid = Utils_1.Utils.base64DecodeStringUrlSafe(decodedClientInfo[1]);
        if (!this.urlContainsQueryStringParameter("login_hint", urlNavigate) && userObject.displayableId && !Utils_1.Utils.isEmpty(userObject.displayableId)) {
            urlNavigate += "&login_hint=" + encodeURIComponent(user.displayableId);
        }
        if (!Utils_1.Utils.isEmpty(uid) && !Utils_1.Utils.isEmpty(utid)) {
            if (!this.urlContainsQueryStringParameter("domain_req", urlNavigate) && !Utils_1.Utils.isEmpty(utid)) {
                urlNavigate += "&domain_req=" + encodeURIComponent(utid);
            }
            if (!this.urlContainsQueryStringParameter("login_req", urlNavigate) && !Utils_1.Utils.isEmpty(uid)) {
                urlNavigate += "&login_req=" + encodeURIComponent(uid);
            }
            if (!this.urlContainsQueryStringParameter("domain_hint", urlNavigate) && !Utils_1.Utils.isEmpty(utid)) {
                if (utid === "9188040d-6c67-4c5b-b112-36a304b66dad") {
                    urlNavigate += "&domain_hint=" + encodeURIComponent("consumers");
                }
                else {
                    urlNavigate += "&domain_hint=" + encodeURIComponent("organizations");
                }
            }
        }
        return urlNavigate;
    };
    /*
     * Checks if the authorization endpoint URL contains query string parameters
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.urlContainsQueryStringParameter = function (name, url) {
        // regex to detect pattern of a ? or & followed by the name parameter and an equals character
        var regex = new RegExp("[\\?&]" + name + "=");
        return regex.test(url);
    };
    UserAgentApplication.prototype.acquireTokenRedirect = function (scopes, authority, user, extraQueryParameters) {
        var _this = this;
        var isValidScope = this.validateInputScope(scopes);
        if (isValidScope && !Utils_1.Utils.isEmpty(isValidScope)) {
            if (this._tokenReceivedCallback) {
                this._tokenReceivedCallback(Constants_1.ErrorDescription.inputScopesError, null, Constants_1.ErrorCodes.inputScopesError, Constants_1.Constants.accessToken);
                return;
            }
        }
        if (scopes) {
            scopes = this.filterScopes(scopes);
        }
        var userObject = user ? user : this.getUser();
        if (this._acquireTokenInProgress) {
            return;
        }
        var scope = scopes.join(" ").toLowerCase();
        if (!userObject) {
            if (this._tokenReceivedCallback) {
                this._tokenReceivedCallback(Constants_1.ErrorDescription.userLoginError, null, Constants_1.ErrorCodes.userLoginError, Constants_1.Constants.accessToken);
                return;
            }
        }
        this._acquireTokenInProgress = true;
        var authenticationRequest;
        var acquireTokenAuthority = authority ? AuthorityFactory_1.AuthorityFactory.CreateInstance(authority, this.validateAuthority) : this.authorityInstance;
        acquireTokenAuthority.ResolveEndpointsAsync().then(function () {
            if (Utils_1.Utils.compareObjects(userObject, _this.getUser())) {
                if (scopes.indexOf(_this.clientId) > -1) {
                    authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(acquireTokenAuthority, _this.clientId, scopes, ResponseTypes.id_token, _this._redirectUri);
                }
                else {
                    authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(acquireTokenAuthority, _this.clientId, scopes, ResponseTypes.token, _this._redirectUri);
                }
            }
            else {
                authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(acquireTokenAuthority, _this.clientId, scopes, ResponseTypes.id_token_token, _this._redirectUri);
            }
            _this._cacheStorage.setItem(Constants_1.Constants.nonceIdToken, authenticationRequest.nonce);
            var acquireTokenUserKey = Constants_1.Constants.acquireTokenUser + Constants_1.Constants.resourceDelimeter + userObject.userIdentifier + Constants_1.Constants.resourceDelimeter + authenticationRequest.state;
            if (Utils_1.Utils.isEmpty(_this._cacheStorage.getItem(acquireTokenUserKey))) {
                _this._cacheStorage.setItem(acquireTokenUserKey, JSON.stringify(userObject));
            }
            var authorityKey = Constants_1.Constants.authority + Constants_1.Constants.resourceDelimeter + authenticationRequest.state;
            if (Utils_1.Utils.isEmpty(_this._cacheStorage.getItem(authorityKey))) {
                _this._cacheStorage.setItem(authorityKey, acquireTokenAuthority.CanonicalAuthority);
            }
            if (extraQueryParameters) {
                authenticationRequest.extraQueryParameters = extraQueryParameters;
            }
            var urlNavigate = authenticationRequest.createNavigateUrl(scopes) + "&prompt=select_account" + "&response_mode=fragment";
            urlNavigate = _this.addHintParameters(urlNavigate, userObject);
            if (urlNavigate) {
                _this._cacheStorage.setItem(Constants_1.Constants.stateAcquireToken, authenticationRequest.state);
                window.location.replace(urlNavigate);
            }
        });
    };
    UserAgentApplication.prototype.acquireTokenPopup = function (scopes, authority, user, extraQueryParameters) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var isValidScope = _this.validateInputScope(scopes);
            if (isValidScope && !Utils_1.Utils.isEmpty(isValidScope)) {
                reject(Constants_1.ErrorCodes.inputScopesError + "|" + isValidScope);
            }
            if (scopes) {
                scopes = _this.filterScopes(scopes);
            }
            var userObject = user ? user : _this.getUser();
            if (_this._acquireTokenInProgress) {
                reject(Constants_1.ErrorCodes.acquireTokenProgressError + "|" + Constants_1.ErrorDescription.acquireTokenProgressError);
                return;
            }
            var scope = scopes.join(" ").toLowerCase();
            if (!userObject) {
                reject(Constants_1.ErrorCodes.userLoginError + "|" + Constants_1.ErrorDescription.userLoginError);
                return;
            }
            _this._acquireTokenInProgress = true;
            var authenticationRequest;
            var acquireTokenAuthority = authority ? AuthorityFactory_1.AuthorityFactory.CreateInstance(authority, _this.validateAuthority) : _this.authorityInstance;
            var popUpWindow = _this.openWindow("about:blank", "_blank", 1, _this, resolve, reject);
            if (!popUpWindow) {
                return;
            }
            acquireTokenAuthority.ResolveEndpointsAsync().then(function () {
                if (Utils_1.Utils.compareObjects(userObject, _this.getUser())) {
                    if (scopes.indexOf(_this.clientId) > -1) {
                        authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(acquireTokenAuthority, _this.clientId, scopes, ResponseTypes.id_token, _this._redirectUri);
                    }
                    else {
                        authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(acquireTokenAuthority, _this.clientId, scopes, ResponseTypes.token, _this._redirectUri);
                    }
                }
                else {
                    authenticationRequest = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(acquireTokenAuthority, _this.clientId, scopes, ResponseTypes.id_token_token, _this._redirectUri);
                }
                _this._cacheStorage.setItem(Constants_1.Constants.nonceIdToken, authenticationRequest.nonce);
                authenticationRequest.state = authenticationRequest.state;
                var acquireTokenUserKey = Constants_1.Constants.acquireTokenUser + Constants_1.Constants.resourceDelimeter + userObject.userIdentifier + Constants_1.Constants.resourceDelimeter + authenticationRequest.state;
                if (Utils_1.Utils.isEmpty(_this._cacheStorage.getItem(acquireTokenUserKey))) {
                    _this._cacheStorage.setItem(acquireTokenUserKey, JSON.stringify(userObject));
                }
                var authorityKey = Constants_1.Constants.authority + Constants_1.Constants.resourceDelimeter + authenticationRequest.state;
                if (Utils_1.Utils.isEmpty(_this._cacheStorage.getItem(authorityKey))) {
                    _this._cacheStorage.setItem(authorityKey, acquireTokenAuthority.CanonicalAuthority);
                }
                if (extraQueryParameters) {
                    authenticationRequest.extraQueryParameters = extraQueryParameters;
                }
                var urlNavigate = authenticationRequest.createNavigateUrl(scopes) + "&prompt=select_account" + "&response_mode=fragment";
                urlNavigate = _this.addHintParameters(urlNavigate, userObject);
                window.renewStates.push(authenticationRequest.state);
                window.requestType = Constants_1.Constants.renewToken;
                _this.registerCallback(authenticationRequest.state, scope, resolve, reject);
                if (popUpWindow) {
                    popUpWindow.location.href = urlNavigate;
                }
            }, function () {
                _this._logger.info(Constants_1.ErrorCodes.endpointResolutionError + ":" + Constants_1.ErrorDescription.endpointResolutionError);
                _this._cacheStorage.setItem(Constants_1.Constants.msalError, Constants_1.ErrorCodes.endpointResolutionError);
                _this._cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, Constants_1.ErrorDescription.endpointResolutionError);
                if (reject) {
                    reject(Constants_1.ErrorCodes.endpointResolutionError + "|" + Constants_1.ErrorDescription.endpointResolutionError);
                }
                if (popUpWindow) {
                    popUpWindow.close();
                }
            }).catch(function (err) {
                _this._logger.warning("could not resolve endpoints");
                reject(err);
            });
        });
    };
    /*
     * Used to get the token from cache.
     * MSAL will return the cached token if it is not expired.
     * Or it will send a request to the STS to obtain an access_token using a hidden iframe. To renew idToken, clientId should be passed as the only scope in the scopes array.
     * @param {Array<string>} scopes - Permissions you want included in the access token. Not all scopes are  guaranteed to be included in the access token. Scopes like "openid" and "profile" are sent with every request.
     * @param {string} authority - A URL indicating a directory that MSAL can use to obtain tokens.
     * - In Azure AD, it is of the form https://&lt;tenant&gt;/&lt;tenant&gt;, where &lt;tenant&gt; is the directory host (e.g. https://login.microsoftonline.com) and &lt;tenant&gt; is a identifier within the directory itself (e.g. a domain associated to the tenant, such as contoso.onmicrosoft.com, or the GUID representing the TenantID property of the directory)
     * - In Azure B2C, it is of the form https://&lt;instance&gt;/tfp/&lt;tenant&gt;/<policyName>/
     * - Default value is: "https://login.microsoftonline.com/common"
     * @param {User} user - The user for which the scopes are requested.The default user is the logged in user.
     * @param {string} extraQueryParameters - Key-value pairs to pass to the STS during the  authentication flow.
     * @returns {Promise.<string>} - A Promise that is fulfilled when this function has completed, or rejected if an error was raised. Resolved with token or rejected with error.
     */
    UserAgentApplication.prototype.acquireTokenSilent = function (scopes, authority, user, extraQueryParameters) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var isValidScope = _this.validateInputScope(scopes);
            if (isValidScope && !Utils_1.Utils.isEmpty(isValidScope)) {
                reject(Constants_1.ErrorCodes.inputScopesError + "|" + isValidScope);
            }
            else {
                if (scopes) {
                    scopes = _this.filterScopes(scopes);
                }
                var scope_1 = scopes.join(" ").toLowerCase();
                var userObject_1 = user ? user : _this.getUser();
                if (!userObject_1) {
                    reject(Constants_1.ErrorCodes.userLoginError + "|" + Constants_1.ErrorDescription.userLoginError);
                    return;
                }
                var authenticationRequest_1;
                var newAuthority = authority ? AuthorityFactory_1.AuthorityFactory.CreateInstance(authority, _this.validateAuthority) : _this.authorityInstance;
                if (Utils_1.Utils.compareObjects(userObject_1, _this.getUser())) {
                    if (scopes.indexOf(_this.clientId) > -1) {
                        authenticationRequest_1 = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(newAuthority, _this.clientId, scopes, ResponseTypes.id_token, _this._redirectUri);
                    }
                    else {
                        authenticationRequest_1 = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(newAuthority, _this.clientId, scopes, ResponseTypes.token, _this._redirectUri);
                    }
                }
                else {
                    authenticationRequest_1 = new AuthenticationRequestParameters_1.AuthenticationRequestParameters(newAuthority, _this.clientId, scopes, ResponseTypes.id_token_token, _this._redirectUri);
                }
                var cacheResult = _this.getCachedToken(authenticationRequest_1, userObject_1);
                if (cacheResult) {
                    if (cacheResult.token) {
                        _this._logger.info("Token is already in cache for scope:" + scope_1);
                        resolve(cacheResult.token);
                        return;
                    }
                    else if (cacheResult.errorDesc || cacheResult.error) {
                        _this._logger.infoPii(cacheResult.errorDesc + ":" + cacheResult.error);
                        reject(cacheResult.errorDesc + "|" + cacheResult.error);
                        return;
                    }
                }
                else {
                    _this._logger.verbose("Token is not in cache for scope:" + scope_1);
                }
                // cache miss
                return newAuthority.ResolveEndpointsAsync()
                    .then(function () {
                    // refresh attept with iframe
                    //Already renewing for this scope, callback when we get the token.
                    if (window.activeRenewals[scope_1]) {
                        _this._logger.verbose("Renew token for scope: " + scope_1 + " is in progress. Registering callback");
                        //Active renewals contains the state for each renewal.
                        _this.registerCallback(window.activeRenewals[scope_1], scope_1, resolve, reject);
                    }
                    else {
                        if (scopes && scopes.indexOf(_this.clientId) > -1 && scopes.length === 1) {
                            // App uses idToken to send to api endpoints
                            // Default scope is tracked as clientId to store this token
                            _this._logger.verbose("renewing idToken");
                            _this.renewIdToken(scopes, resolve, reject, userObject_1, authenticationRequest_1, extraQueryParameters);
                        }
                        else {
                            _this._logger.verbose("renewing accesstoken");
                            _this.renewToken(scopes, resolve, reject, userObject_1, authenticationRequest_1, extraQueryParameters);
                        }
                    }
                }).catch(function (err) {
                    _this._logger.warning("could not resolve endpoints");
                    reject(err);
                });
            }
        });
    };
    /*
     * Calling _loadFrame but with a timeout to signal failure in loadframeStatus. Callbacks are left.
     * registered when network errors occur and subsequent token requests for same resource are registered to the pending request.
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.loadIframeTimeout = function (urlNavigate, frameName, scope) {
        var _this = this;
        //set iframe session to pending
        var expectedState = window.activeRenewals[scope];
        this._logger.verbose("Set loading state to pending for: " + scope + ":" + expectedState);
        this._cacheStorage.setItem(Constants_1.Constants.renewStatus + expectedState, Constants_1.Constants.tokenRenewStatusInProgress);
        this.loadFrame(urlNavigate, frameName);
        setTimeout(function () {
            if (_this._cacheStorage.getItem(Constants_1.Constants.renewStatus + expectedState) === Constants_1.Constants.tokenRenewStatusInProgress) {
                // fail the iframe session if it"s in pending state
                _this._logger.verbose("Loading frame has timed out after: " + (_this.loadFrameTimeout / 1000) + " seconds for scope " + scope + ":" + expectedState);
                if (expectedState && window.callBackMappedToRenewStates[expectedState]) {
                    window.callBackMappedToRenewStates[expectedState]("Token renewal operation failed due to timeout", null, "Token Renewal Failed", Constants_1.Constants.accessToken);
                }
                _this._cacheStorage.setItem(Constants_1.Constants.renewStatus + expectedState, Constants_1.Constants.tokenRenewStatusCancelled);
            }
        }, this.loadFrameTimeout);
    };
    /*
     * Loads iframe with authorization endpoint URL
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.loadFrame = function (urlNavigate, frameName) {
        var _this = this;
        // This trick overcomes iframe navigation in IE
        // IE does not load the page consistently in iframe
        this._logger.info("LoadFrame: " + frameName);
        var frameCheck = frameName;
        setTimeout(function () {
            var frameHandle = _this.addAdalFrame(frameCheck);
            if (frameHandle.src === "" || frameHandle.src === "about:blank") {
                frameHandle.src = urlNavigate;
                _this._logger.infoPii("Frame Name : " + frameName + " Navigated to: " + urlNavigate);
            }
        }, 500);
    };
    /*
     * Adds the hidden iframe for silent token renewal.
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.addAdalFrame = function (iframeId) {
        if (typeof iframeId === "undefined") {
            return null;
        }
        this._logger.info("Add msal frame to document:" + iframeId);
        var adalFrame = document.getElementById(iframeId);
        if (!adalFrame) {
            if (document.createElement &&
                document.documentElement &&
                (window.navigator.userAgent.indexOf("MSIE 5.0") === -1)) {
                var ifr = document.createElement("iframe");
                ifr.setAttribute("id", iframeId);
                ifr.style.visibility = "hidden";
                ifr.style.position = "absolute";
                ifr.style.width = ifr.style.height = "0";
                ifr.style.border = "0";
                adalFrame = document.getElementsByTagName("body")[0].appendChild(ifr);
            }
            else if (document.body && document.body.insertAdjacentHTML) {
                document.body.insertAdjacentHTML('beforeend', '<iframe name="' + iframeId + '" id="' + iframeId + '" style="display:none"></iframe>');
            }
            if (window.frames && window.frames[iframeId]) {
                adalFrame = window.frames[iframeId];
            }
        }
        return adalFrame;
    };
    /*
     * Acquires access token using a hidden iframe.
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.renewToken = function (scopes, resolve, reject, user, authenticationRequest, extraQueryParameters) {
        var scope = scopes.join(" ").toLowerCase();
        this._logger.verbose("renewToken is called for scope:" + scope);
        var frameHandle = this.addAdalFrame("msalRenewFrame" + scope);
        if (extraQueryParameters) {
            authenticationRequest.extraQueryParameters = extraQueryParameters;
        }
        var acquireTokenUserKey = Constants_1.Constants.acquireTokenUser + Constants_1.Constants.resourceDelimeter + user.userIdentifier + Constants_1.Constants.resourceDelimeter + authenticationRequest.state;
        if (Utils_1.Utils.isEmpty(this._cacheStorage.getItem(acquireTokenUserKey))) {
            this._cacheStorage.setItem(acquireTokenUserKey, JSON.stringify(user));
        }
        var authorityKey = Constants_1.Constants.authority + Constants_1.Constants.resourceDelimeter + authenticationRequest.state;
        if (Utils_1.Utils.isEmpty(this._cacheStorage.getItem(authorityKey))) {
            this._cacheStorage.setItem(authorityKey, authenticationRequest.authority);
        }
        // renew happens in iframe, so it keeps javascript context
        this._cacheStorage.setItem(Constants_1.Constants.nonceIdToken, authenticationRequest.nonce);
        this._logger.verbose("Renew token Expected state: " + authenticationRequest.state);
        var urlNavigate = authenticationRequest.createNavigateUrl(scopes) + "&prompt=none";
        urlNavigate = this.addHintParameters(urlNavigate, user);
        window.renewStates.push(authenticationRequest.state);
        window.requestType = Constants_1.Constants.renewToken;
        this.registerCallback(authenticationRequest.state, scope, resolve, reject);
        this._logger.infoPii("Navigate to:" + urlNavigate);
        frameHandle.src = "about:blank";
        this.loadIframeTimeout(urlNavigate, "msalRenewFrame" + scope, scope);
    };
    /*
     * Renews idtoken for app"s own backend when clientId is passed as a single scope in the scopes array.
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.renewIdToken = function (scopes, resolve, reject, user, authenticationRequest, extraQueryParameters) {
        var scope = scopes.join(" ").toLowerCase();
        this._logger.info("renewidToken is called");
        var frameHandle = this.addAdalFrame("msalIdTokenFrame");
        if (extraQueryParameters) {
            authenticationRequest.extraQueryParameters = extraQueryParameters;
        }
        var acquireTokenUserKey = Constants_1.Constants.acquireTokenUser + Constants_1.Constants.resourceDelimeter + user.userIdentifier + Constants_1.Constants.resourceDelimeter + authenticationRequest.state;
        if (Utils_1.Utils.isEmpty(this._cacheStorage.getItem(acquireTokenUserKey))) {
            this._cacheStorage.setItem(acquireTokenUserKey, JSON.stringify(user));
        }
        var authorityKey = Constants_1.Constants.authority + Constants_1.Constants.resourceDelimeter + authenticationRequest.state;
        if (Utils_1.Utils.isEmpty(this._cacheStorage.getItem(authorityKey))) {
            this._cacheStorage.setItem(authorityKey, authenticationRequest.authority);
        }
        this._cacheStorage.setItem(Constants_1.Constants.nonceIdToken, authenticationRequest.nonce);
        this._logger.verbose("Renew Idtoken Expected state: " + authenticationRequest.state);
        var urlNavigate = authenticationRequest.createNavigateUrl(scopes) + "&prompt=none";
        urlNavigate = this.addHintParameters(urlNavigate, user);
        window.renewStates.push(authenticationRequest.state);
        window.requestType = Constants_1.Constants.renewToken;
        this.registerCallback(authenticationRequest.state, this.clientId, resolve, reject);
        this._logger.infoPii("Navigate to:" + urlNavigate);
        frameHandle.src = "about:blank";
        this.loadIframeTimeout(urlNavigate, "msalIdTokenFrame", this.clientId);
    };
    /*
      * Returns the signed in user (received from a user object created at the time of login) or null.
      */
    UserAgentApplication.prototype.getUser = function () {
        // idToken is first call
        if (this._user) {
            return this._user;
        }
        // frame is used to get idToken
        var rawIdToken = this._cacheStorage.getItem(Constants_1.Constants.idTokenKey);
        var rawClientInfo = this._cacheStorage.getItem(Constants_1.Constants.msalClientInfo);
        if (!Utils_1.Utils.isEmpty(rawIdToken) && !Utils_1.Utils.isEmpty(rawClientInfo)) {
            var idToken = new IdToken_1.IdToken(rawIdToken);
            var clientInfo = new ClientInfo_1.ClientInfo(rawClientInfo);
            this._user = User_1.User.createUser(idToken, clientInfo, this.authority);
            return this._user;
        }
        return null;
    };
    /*
     * This method must be called for processing the response received from the STS. It extracts the hash, processes the token or error information and saves it in the cache. It then
     * calls the registered callbacks in case of redirect or resolves the promises with the result.
     * @param {string} [hash=window.location.hash] - Hash fragment of Url.
     * @hidden
     */
    UserAgentApplication.prototype.handleAuthenticationResponse = function (hash) {
        if (hash == null) {
            hash = window.location.hash;
        }
        var self = null;
        var isPopup = false;
        var isWindowOpenerMsal = false;
        try {
            isWindowOpenerMsal = window.opener && window.opener.msal && window.opener.msal !== window.msal;
        }
        catch (err) {
            // err = SecurityError: Blocked a frame with origin "[url]" from accessing a cross-origin frame.
            isWindowOpenerMsal = false;
        }
        if (isWindowOpenerMsal) {
            self = window.opener.msal;
            isPopup = true;
        }
        else if (window.parent && window.parent.msal) {
            self = window.parent.msal;
        }
        var requestInfo = self.getRequestInfo(hash); //if(window.parent!==window), by using self, window.parent becomes equal to window in getRequestInfo method specifically
        var token = null, tokenReceivedCallback = null, tokenType, saveToken = true;
        self._logger.info("Returned from redirect url");
        if (window.parent !== window && window.parent.msal) {
            tokenReceivedCallback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse];
        }
        else if (isWindowOpenerMsal) {
            tokenReceivedCallback = window.opener.callBackMappedToRenewStates[requestInfo.stateResponse];
        }
        else {
            if (self._navigateToLoginRequestUrl) {
                tokenReceivedCallback = null;
                self._cacheStorage.setItem(Constants_1.Constants.urlHash, hash);
                saveToken = false;
                if (window.parent === window && !isPopup) {
                    window.location.href = self._cacheStorage.getItem(Constants_1.Constants.loginRequest);
                }
                return;
            }
            else {
                tokenReceivedCallback = self._tokenReceivedCallback;
                window.location.hash = '';
            }
        }
        self.saveTokenFromHash(requestInfo);
        if ((requestInfo.requestType === Constants_1.Constants.renewToken) && window.parent) {
            if (window.parent !== window) {
                self._logger.verbose("Window is in iframe, acquiring token silently");
            }
            else {
                self._logger.verbose("acquiring token interactive in progress");
            }
            token = requestInfo.parameters[Constants_1.Constants.accessToken] || requestInfo.parameters[Constants_1.Constants.idToken];
            tokenType = Constants_1.Constants.accessToken;
        }
        else if (requestInfo.requestType === Constants_1.Constants.login) {
            token = requestInfo.parameters[Constants_1.Constants.idToken];
            tokenType = Constants_1.Constants.idToken;
        }
        var errorDesc = requestInfo.parameters[Constants_1.Constants.errorDescription];
        var error = requestInfo.parameters[Constants_1.Constants.error];
        try {
            if (tokenReceivedCallback) {
                tokenReceivedCallback.call(self, errorDesc, token, error, tokenType);
            }
        }
        catch (err) {
            self._logger.error("Error occurred in token received callback function: " + err);
        }
        if (isWindowOpenerMsal) {
            for (var i = 0; i < window.opener.openedWindows.length; i++) {
                window.opener.openedWindows[i].close();
            }
        }
    };
    /*
     * This method must be called for processing the response received from AAD. It extracts the hash, processes the token or error, saves it in the cache and calls the registered callbacks with the result.
     * @param {string} authority authority received in the redirect response from AAD.
     * @param {TokenResponse} requestInfo an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
     * @param {User} user user object for which scopes are consented for. The default user is the logged in user.
     * @param {ClientInfo} clientInfo clientInfo received as part of the response comprising of fields uid and utid.
     * @param {IdToken} idToken idToken received as part of the response.
     * @ignore
     * @private
     * @hidden
     */
    UserAgentApplication.prototype.saveAccessToken = function (authority, tokenResponse, user, clientInfo, idToken) {
        var scope;
        var clientObj = new ClientInfo_1.ClientInfo(clientInfo);
        if (tokenResponse.parameters.hasOwnProperty("scope")) {
            scope = tokenResponse.parameters["scope"];
            var consentedScopes = scope.split(" ");
            var accessTokenCacheItems = this._cacheStorage.getAllAccessTokens(this.clientId, authority);
            for (var i = 0; i < accessTokenCacheItems.length; i++) {
                var accessTokenCacheItem = accessTokenCacheItems[i];
                if (accessTokenCacheItem.key.userIdentifier === user.userIdentifier) {
                    var cachedScopes = accessTokenCacheItem.key.scopes.split(" ");
                    if (Utils_1.Utils.isIntersectingScopes(cachedScopes, consentedScopes)) {
                        this._cacheStorage.removeItem(JSON.stringify(accessTokenCacheItem.key));
                    }
                }
            }
            var accessTokenKey = new AccessTokenKey_1.AccessTokenKey(authority, this.clientId, scope, clientObj.uid, clientObj.utid);
            var accessTokenValue = new AccessTokenValue_1.AccessTokenValue(tokenResponse.parameters[Constants_1.Constants.accessToken], idToken.rawIdToken, Utils_1.Utils.expiresIn(tokenResponse.parameters[Constants_1.Constants.expiresIn]).toString(), clientInfo);
            this._cacheStorage.setItem(JSON.stringify(accessTokenKey), JSON.stringify(accessTokenValue));
        }
        else {
            scope = this.clientId;
            var accessTokenKey = new AccessTokenKey_1.AccessTokenKey(authority, this.clientId, scope, clientObj.uid, clientObj.utid);
            var accessTokenValue = new AccessTokenValue_1.AccessTokenValue(tokenResponse.parameters[Constants_1.Constants.idToken], tokenResponse.parameters[Constants_1.Constants.idToken], idToken.expiration, clientInfo);
            this._cacheStorage.setItem(JSON.stringify(accessTokenKey), JSON.stringify(accessTokenValue));
        }
    };
    /*
     * Saves token or error received in the response from AAD in the cache. In case of id_token, it also creates the user object.
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.saveTokenFromHash = function (tokenResponse) {
        this._logger.info("State status:" + tokenResponse.stateMatch + "; Request type:" + tokenResponse.requestType);
        this._cacheStorage.setItem(Constants_1.Constants.msalError, "");
        this._cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, "");
        var scope = "";
        var authorityKey = "";
        var acquireTokenUserKey = "";
        if (tokenResponse.parameters.hasOwnProperty("scope")) {
            scope = tokenResponse.parameters["scope"].toLowerCase();
        }
        else {
            scope = this.clientId;
        }
        // Record error
        if (tokenResponse.parameters.hasOwnProperty(Constants_1.Constants.errorDescription) || tokenResponse.parameters.hasOwnProperty(Constants_1.Constants.error)) {
            this._logger.infoPii("Error :" + tokenResponse.parameters[Constants_1.Constants.error] + "; Error description:" + tokenResponse.parameters[Constants_1.Constants.errorDescription]);
            this._cacheStorage.setItem(Constants_1.Constants.msalError, tokenResponse.parameters["error"]);
            this._cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, tokenResponse.parameters[Constants_1.Constants.errorDescription]);
            if (tokenResponse.requestType === Constants_1.Constants.login) {
                this._loginInProgress = false;
                this._cacheStorage.setItem(Constants_1.Constants.loginError, tokenResponse.parameters[Constants_1.Constants.errorDescription] + ":" + tokenResponse.parameters[Constants_1.Constants.error]);
                authorityKey = Constants_1.Constants.authority + Constants_1.Constants.resourceDelimeter + tokenResponse.stateResponse;
            }
            if (tokenResponse.requestType === Constants_1.Constants.renewToken) {
                this._acquireTokenInProgress = false;
                authorityKey = Constants_1.Constants.authority + Constants_1.Constants.resourceDelimeter + tokenResponse.stateResponse;
                var userKey = this.getUser() !== null ? this.getUser().userIdentifier : "";
                acquireTokenUserKey = Constants_1.Constants.acquireTokenUser + Constants_1.Constants.resourceDelimeter + userKey + Constants_1.Constants.resourceDelimeter + tokenResponse.stateResponse;
            }
        }
        else {
            // It must verify the state from redirect
            if (tokenResponse.stateMatch) {
                // record tokens to storage if exists
                this._logger.info("State is right");
                if (tokenResponse.parameters.hasOwnProperty(Constants_1.Constants.sessionState)) {
                    this._cacheStorage.setItem(Constants_1.Constants.msalSessionState, tokenResponse.parameters[Constants_1.Constants.sessionState]);
                }
                var idToken;
                var clientInfo = "";
                if (tokenResponse.parameters.hasOwnProperty(Constants_1.Constants.accessToken)) {
                    this._logger.info("Fragment has access token");
                    this._acquireTokenInProgress = false;
                    var user = void 0;
                    if (tokenResponse.parameters.hasOwnProperty(Constants_1.Constants.idToken)) {
                        idToken = new IdToken_1.IdToken(tokenResponse.parameters[Constants_1.Constants.idToken]);
                    }
                    else {
                        idToken = new IdToken_1.IdToken(this._cacheStorage.getItem(Constants_1.Constants.idTokenKey));
                    }
                    authorityKey = Constants_1.Constants.authority + Constants_1.Constants.resourceDelimeter + tokenResponse.stateResponse;
                    var authority = void 0;
                    if (!Utils_1.Utils.isEmpty(this._cacheStorage.getItem(authorityKey))) {
                        authority = this._cacheStorage.getItem(authorityKey);
                        authority = Utils_1.Utils.replaceFirstPath(authority, idToken.tenantId);
                    }
                    if (tokenResponse.parameters.hasOwnProperty(Constants_1.Constants.clientInfo)) {
                        clientInfo = tokenResponse.parameters[Constants_1.Constants.clientInfo];
                        user = User_1.User.createUser(idToken, new ClientInfo_1.ClientInfo(clientInfo), authority);
                    }
                    else {
                        this._logger.warning("ClientInfo not received in the response from AAD");
                        user = User_1.User.createUser(idToken, new ClientInfo_1.ClientInfo(clientInfo), authority);
                    }
                    acquireTokenUserKey = Constants_1.Constants.acquireTokenUser + Constants_1.Constants.resourceDelimeter + user.userIdentifier + Constants_1.Constants.resourceDelimeter + tokenResponse.stateResponse;
                    var acquireTokenUser = void 0;
                    if (!Utils_1.Utils.isEmpty(this._cacheStorage.getItem(acquireTokenUserKey))) {
                        acquireTokenUser = JSON.parse(this._cacheStorage.getItem(acquireTokenUserKey));
                        if (user && acquireTokenUser && Utils_1.Utils.compareObjects(user, acquireTokenUser)) {
                            this.saveAccessToken(authority, tokenResponse, user, clientInfo, idToken);
                            this._logger.info("The user object received in the response is the same as the one passed in the acquireToken request");
                        }
                        else {
                            this._logger.warning("The user object created from the response is not the same as the one passed in the acquireToken request");
                        }
                    }
                }
                if (tokenResponse.parameters.hasOwnProperty(Constants_1.Constants.idToken)) {
                    if (scope.indexOf(this.clientId) > -1) {
                        this._logger.info("Fragment has id token");
                        this._loginInProgress = false;
                        idToken = new IdToken_1.IdToken(tokenResponse.parameters[Constants_1.Constants.idToken]);
                        if (tokenResponse.parameters.hasOwnProperty(Constants_1.Constants.clientInfo)) {
                            clientInfo = tokenResponse.parameters[Constants_1.Constants.clientInfo];
                        }
                        else {
                            this._logger.warning("ClientInfo not received in the response from AAD");
                        }
                        authorityKey = Constants_1.Constants.authority + Constants_1.Constants.resourceDelimeter + tokenResponse.stateResponse;
                        var authority = void 0;
                        if (!Utils_1.Utils.isEmpty(this._cacheStorage.getItem(authorityKey))) {
                            authority = this._cacheStorage.getItem(authorityKey);
                            authority = Utils_1.Utils.replaceFirstPath(authority, idToken.tenantId);
                        }
                        this._user = User_1.User.createUser(idToken, new ClientInfo_1.ClientInfo(clientInfo), authority);
                        if (idToken && idToken.nonce) {
                            if (idToken.nonce !== this._cacheStorage.getItem(Constants_1.Constants.nonceIdToken)) {
                                this._user = null;
                                this._cacheStorage.setItem(Constants_1.Constants.loginError, "Nonce Mismatch. Expected Nonce: " + this._cacheStorage.getItem(Constants_1.Constants.nonceIdToken) + "," + "Actual Nonce: " + idToken.nonce);
                                this._logger.error("Nonce Mismatch.Expected Nonce: " + this._cacheStorage.getItem(Constants_1.Constants.nonceIdToken) + "," + "Actual Nonce: " + idToken.nonce);
                            }
                            else {
                                this._cacheStorage.setItem(Constants_1.Constants.idTokenKey, tokenResponse.parameters[Constants_1.Constants.idToken]);
                                this._cacheStorage.setItem(Constants_1.Constants.msalClientInfo, clientInfo);
                                // Save idToken as access token for app itself
                                this.saveAccessToken(authority, tokenResponse, this._user, clientInfo, idToken);
                            }
                        }
                        else {
                            authorityKey = tokenResponse.stateResponse;
                            acquireTokenUserKey = tokenResponse.stateResponse;
                            this._logger.error("Invalid id_token received in the response");
                            tokenResponse.parameters['error'] = 'invalid idToken';
                            tokenResponse.parameters['error_description'] = 'Invalid idToken. idToken: ' + tokenResponse.parameters[Constants_1.Constants.idToken];
                            this._cacheStorage.setItem(Constants_1.Constants.msalError, "invalid idToken");
                            this._cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, "Invalid idToken. idToken: " + tokenResponse.parameters[Constants_1.Constants.idToken]);
                        }
                    }
                }
            }
            else {
                authorityKey = tokenResponse.stateResponse;
                acquireTokenUserKey = tokenResponse.stateResponse;
                this._logger.error("State Mismatch.Expected State: " + this._cacheStorage.getItem(Constants_1.Constants.stateLogin) + "," + "Actual State: " + tokenResponse.stateResponse);
                tokenResponse.parameters['error'] = 'Invalid_state';
                tokenResponse.parameters['error_description'] = 'Invalid_state. state: ' + tokenResponse.stateResponse;
                this._cacheStorage.setItem(Constants_1.Constants.msalError, "Invalid_state");
                this._cacheStorage.setItem(Constants_1.Constants.msalErrorDescription, "Invalid_state. state: " + tokenResponse.stateResponse);
            }
        }
        this._cacheStorage.setItem(Constants_1.Constants.renewStatus + tokenResponse.stateResponse, Constants_1.Constants.tokenRenewStatusCompleted);
        this._cacheStorage.removeAcquireTokenEntries(authorityKey, acquireTokenUserKey);
    };
    /*
     * Checks if the redirect response is received from the STS. In case of redirect, the url fragment has either id_token, access_token or error.
     * @param {string} hash - Hash passed from redirect page.
     * @returns {Boolean} - true if response contains id_token, access_token or error, false otherwise.
     * @hidden
     */
    UserAgentApplication.prototype.isCallback = function (hash) {
        hash = this.getHash(hash);
        var parameters = Utils_1.Utils.deserialize(hash);
        return (parameters.hasOwnProperty(Constants_1.Constants.errorDescription) ||
            parameters.hasOwnProperty(Constants_1.Constants.error) ||
            parameters.hasOwnProperty(Constants_1.Constants.accessToken) ||
            parameters.hasOwnProperty(Constants_1.Constants.idToken));
    };
    /*
     * Returns the anchor part(#) of the URL
     * @ignore
     * @hidden
     */
    UserAgentApplication.prototype.getHash = function (hash) {
        if (hash.indexOf("#/") > -1) {
            hash = hash.substring(hash.indexOf("#/") + 2);
        }
        else if (hash.indexOf("#") > -1) {
            hash = hash.substring(1);
        }
        return hash;
    };
    /*
      * Creates a requestInfo object from the URL fragment and returns it.
      * @param {string} hash  -  Hash passed from redirect page
      * @returns {TokenResponse} an object created from the redirect response from AAD comprising of the keys - parameters, requestType, stateMatch, stateResponse and valid.
      * @ignore
      * @hidden
      */
    UserAgentApplication.prototype.getRequestInfo = function (hash) {
        hash = this.getHash(hash);
        var parameters = Utils_1.Utils.deserialize(hash);
        var tokenResponse = new RequestInfo_1.TokenResponse();
        if (parameters) {
            tokenResponse.parameters = parameters;
            if (parameters.hasOwnProperty(Constants_1.Constants.errorDescription) ||
                parameters.hasOwnProperty(Constants_1.Constants.error) ||
                parameters.hasOwnProperty(Constants_1.Constants.accessToken) ||
                parameters.hasOwnProperty(Constants_1.Constants.idToken)) {
                tokenResponse.valid = true;
                // which call
                var stateResponse = void 0;
                if (parameters.hasOwnProperty("state")) {
                    stateResponse = parameters.state;
                }
                else {
                    return tokenResponse;
                }
                tokenResponse.stateResponse = stateResponse;
                // async calls can fire iframe and login request at the same time if developer does not use the API as expected
                // incoming callback needs to be looked up to find the request type
                if (stateResponse === this._cacheStorage.getItem(Constants_1.Constants.stateLogin)) { // loginRedirect
                    tokenResponse.requestType = Constants_1.Constants.login;
                    tokenResponse.stateMatch = true;
                    return tokenResponse;
                }
                else if (stateResponse === this._cacheStorage.getItem(Constants_1.Constants.stateAcquireToken)) { //acquireTokenRedirect
                    tokenResponse.requestType = Constants_1.Constants.renewToken;
                    tokenResponse.stateMatch = true;
                    return tokenResponse;
                }
                // external api requests may have many renewtoken requests for different resource
                if (!tokenResponse.stateMatch) {
                    tokenResponse.requestType = window.requestType;
                    var statesInParentContext = window.renewStates;
                    for (var i = 0; i < statesInParentContext.length; i++) {
                        if (statesInParentContext[i] === tokenResponse.stateResponse) {
                            tokenResponse.stateMatch = true;
                            break;
                        }
                    }
                }
            }
        }
        return tokenResponse;
    };
    /*
      * Extracts scope value from the state sent with the authentication request.
      * @returns {string} scope.
      * @ignore
      * @hidden
      */
    UserAgentApplication.prototype.getScopeFromState = function (state) {
        if (state) {
            var splitIndex = state.indexOf("|");
            if (splitIndex > -1 && splitIndex + 1 < state.length) {
                return state.substring(splitIndex + 1);
            }
        }
        return "";
    };
    /*
      * Returns whether current window is in ifram for token renewal
      * @ignore
      * @hidden
      */
    UserAgentApplication.prototype.isInIframe = function () {
        return window.parent !== window;
    };
    UserAgentApplication.prototype.loginInProgress = function () {
        var pendingCallback = this._cacheStorage.getItem(Constants_1.Constants.urlHash);
        if (pendingCallback)
            return true;
        return this._loginInProgress;
    };
    UserAgentApplication.prototype.getHostFromUri = function (uri) {
        // remove http:// or https:// from uri
        var extractedUri = String(uri).replace(/^(https?:)\/\//, '');
        extractedUri = extractedUri.split('/')[0];
        return extractedUri;
    };
    UserAgentApplication.prototype.getScopesForEndpoint = function (endpoint) {
        // if user specified list of anonymous endpoints, no need to send token to these endpoints, return null.
        if (this._anonymousEndpoints.length > 0) {
            for (var i = 0; i < this._anonymousEndpoints.length; i++) {
                if (endpoint.indexOf(this._anonymousEndpoints[i]) > -1) {
                    return null;
                }
            }
        }
        if (this._endpoints.size > 0) {
            for (var _i = 0, _a = Array.from(this._endpoints.keys()); _i < _a.length; _i++) {
                var key = _a[_i];
                // configEndpoint is like /api/Todo requested endpoint can be /api/Todo/1
                if (endpoint.indexOf(key) > -1) {
                    return this._endpoints.get(key);
                }
            }
        }
        // default resource will be clientid if nothing specified
        // App will use idtoken for calls to itself
        // check if it's staring from http or https, needs to match with app host
        if (endpoint.indexOf('http://') > -1 || endpoint.indexOf('https://') > -1) {
            if (this.getHostFromUri(endpoint) === this.getHostFromUri(this._redirectUri)) {
                return new Array(this.clientId);
            }
        }
        else {
            // in angular level, the url for $http interceptor call could be relative url,
            // if it's relative call, we'll treat it as app backend call.            
            return new Array(this.clientId);
        }
        // if not the app's own backend or not a domain listed in the endpoints structure
        return null;
    };
    //These APIS are exposed for msalAngular wrapper only
    UserAgentApplication.prototype.setloginInProgress = function (loginInProgress) {
        this._loginInProgress = loginInProgress;
    };
    UserAgentApplication.prototype.getAcquireTokenInProgress = function () {
        return this._acquireTokenInProgress;
    };
    UserAgentApplication.prototype.setAcquireTokenInProgress = function (acquireTokenInProgress) {
        this._acquireTokenInProgress = acquireTokenInProgress;
    };
    UserAgentApplication.prototype.getLogger = function () {
        return this._logger;
    };
    tslib_1.__decorate([
        resolveTokenOnlyIfOutOfIframe
    ], UserAgentApplication.prototype, "acquireTokenSilent", null);
    return UserAgentApplication;
}());
exports.UserAgentApplication = UserAgentApplication;
//# sourceMappingURL=UserAgentApplication.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/Utils.js":
/*!*************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/Utils.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @hidden
 */
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.compareObjects = function (u1, u2) {
        if (!u1 || !u2) {
            return false;
        }
        if (u1.userIdentifier && u2.userIdentifier) {
            if (u1.userIdentifier === u2.userIdentifier) {
                return true;
            }
        }
        return false;
    };
    Utils.expiresIn = function (expires) {
        // if AAD did not send "expires_in" property, use default expiration of 3599 seconds, for some reason AAD sends 3599 as "expires_in" value instead of 3600
        if (!expires) {
            expires = "3599";
        }
        return this.now() + parseInt(expires, 10);
    };
    Utils.now = function () {
        return Math.round(new Date().getTime() / 1000.0);
    };
    Utils.isEmpty = function (str) {
        return (typeof str === "undefined" || !str || 0 === str.length);
    };
    Utils.extractIdToken = function (encodedIdToken) {
        // id token will be decoded to get the username
        var decodedToken = this.decodeJwt(encodedIdToken);
        if (!decodedToken) {
            return null;
        }
        try {
            var base64IdToken = decodedToken.JWSPayload;
            var base64Decoded = this.base64DecodeStringUrlSafe(base64IdToken);
            if (!base64Decoded) {
                //this._requestContext.logger.info("The returned id_token could not be base64 url safe decoded.");
                return null;
            }
            // ECMA script has JSON built-in support
            return JSON.parse(base64Decoded);
        }
        catch (err) {
            //this._requestContext.logger.error("The returned id_token could not be decoded" + err);
        }
        return null;
    };
    Utils.base64EncodeStringUrlSafe = function (input) {
        // html5 should support atob function for decoding
        if (window.btoa) {
            return window.btoa(input);
        }
        else {
            return this.encode(input);
        }
    };
    Utils.base64DecodeStringUrlSafe = function (base64IdToken) {
        // html5 should support atob function for decoding
        base64IdToken = base64IdToken.replace(/-/g, "+").replace(/_/g, "/");
        if (window.atob) {
            return decodeURIComponent(encodeURIComponent(window.atob(base64IdToken))); // jshint ignore:line
        }
        else {
            return decodeURIComponent(encodeURIComponent(this.decode(base64IdToken)));
        }
    };
    Utils.encode = function (input) {
        var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this.utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    };
    Utils.utf8Encode = function (input) {
        input = input.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < input.length; n++) {
            var c = input.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    Utils.decode = function (base64IdToken) {
        var codes = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        base64IdToken = String(base64IdToken).replace(/=+$/, "");
        var length = base64IdToken.length;
        if (length % 4 === 1) {
            throw new Error("The token to be decoded is not correctly encoded.");
        }
        var h1, h2, h3, h4, bits, c1, c2, c3, decoded = "";
        for (var i = 0; i < length; i += 4) {
            //Every 4 base64 encoded character will be converted to 3 byte string, which is 24 bits
            // then 6 bits per base64 encoded character
            h1 = codes.indexOf(base64IdToken.charAt(i));
            h2 = codes.indexOf(base64IdToken.charAt(i + 1));
            h3 = codes.indexOf(base64IdToken.charAt(i + 2));
            h4 = codes.indexOf(base64IdToken.charAt(i + 3));
            // For padding, if last two are "="
            if (i + 2 === length - 1) {
                bits = h1 << 18 | h2 << 12 | h3 << 6;
                c1 = bits >> 16 & 255;
                c2 = bits >> 8 & 255;
                decoded += String.fromCharCode(c1, c2);
                break;
            }
            // if last one is "="
            else if (i + 1 === length - 1) {
                bits = h1 << 18 | h2 << 12;
                c1 = bits >> 16 & 255;
                decoded += String.fromCharCode(c1);
                break;
            }
            bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
            // then convert to 3 byte chars
            c1 = bits >> 16 & 255;
            c2 = bits >> 8 & 255;
            c3 = bits & 255;
            decoded += String.fromCharCode(c1, c2, c3);
        }
        return decoded;
    };
    Utils.decodeJwt = function (jwtToken) {
        if (this.isEmpty(jwtToken)) {
            return null;
        }
        var idTokenPartsRegex = /^([^\.\s]*)\.([^\.\s]+)\.([^\.\s]*)$/;
        var matches = idTokenPartsRegex.exec(jwtToken);
        if (!matches || matches.length < 4) {
            //this._requestContext.logger.warn("The returned id_token is not parseable.");
            return null;
        }
        var crackedToken = {
            header: matches[1],
            JWSPayload: matches[2],
            JWSSig: matches[3]
        };
        return crackedToken;
    };
    Utils.deserialize = function (query) {
        var match; // Regex for replacing addition symbol with a space
        var pl = /\+/g;
        var search = /([^&=]+)=([^&]*)/g;
        var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
        var obj = {};
        match = search.exec(query);
        while (match) {
            obj[decode(match[1])] = decode(match[2]);
            match = search.exec(query);
        }
        return obj;
    };
    Utils.isIntersectingScopes = function (cachedScopes, scopes) {
        cachedScopes = this.convertToLowerCase(cachedScopes);
        for (var i = 0; i < scopes.length; i++) {
            if (cachedScopes.indexOf(scopes[i].toLowerCase()) > -1) {
                return true;
            }
        }
        return false;
    };
    Utils.containsScope = function (cachedScopes, scopes) {
        cachedScopes = this.convertToLowerCase(cachedScopes);
        return scopes.every(function (value) { return cachedScopes.indexOf(value.toString().toLowerCase()) >= 0; });
    };
    Utils.convertToLowerCase = function (scopes) {
        return scopes.map(function (scope) { return scope.toLowerCase(); });
    };
    Utils.removeElement = function (scopes, scope) {
        return scopes.filter(function (value) { return value !== scope; });
    };
    Utils.decimalToHex = function (num) {
        var hex = num.toString(16);
        while (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };
    Utils.getLibraryVersion = function () {
        return "0.1.9";
    };
    /*
      * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
      * @param href The url
      * @param tenantId The tenant id to replace
      */
    Utils.replaceFirstPath = function (href, tenantId) {
        var match = href.match(/^(https?\:)\/\/(([^:\/?#] *)(?:\:([0-9]+))?)([\/]{0,1}[^?#] *)(\?[^#] *|)(#. *|)$/);
        if (match) {
            var urlObject = Utils.GetUrlComponents(href);
            var pathArray = urlObject.PathSegments;
            pathArray.shift();
            if (pathArray[0] && pathArray[0] === "common" || pathArray[0] === "organizations") {
                pathArray[0] = tenantId;
                href = urlObject.Protocol + "//" + urlObject.HostNameAndPort + "/" + pathArray.join("/");
            }
        }
        return href;
    };
    Utils.createNewGuid = function () {
        // RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or
        // pseudo-random numbers.
        // The algorithm is as follows:
        //     Set the two most significant bits (bits 6 and 7) of the
        //        clock_seq_hi_and_reserved to zero and one, respectively.
        //     Set the four most significant bits (bits 12 through 15) of the
        //        time_hi_and_version field to the 4-bit version number from
        //        Section 4.1.3. Version4
        //     Set all the other bits to randomly (or pseudo-randomly) chosen
        //     values.
        // UUID                   = time-low "-" time-mid "-"time-high-and-version "-"clock-seq-reserved and low(2hexOctet)"-" node
        // time-low               = 4hexOctet
        // time-mid               = 2hexOctet
        // time-high-and-version  = 2hexOctet
        // clock-seq-and-reserved = hexOctet:
        // clock-seq-low          = hexOctet
        // node                   = 6hexOctet
        // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        // y could be 1000, 1001, 1010, 1011 since most significant two bits needs to be 10
        // y values are 8, 9, A, B
        var cryptoObj = window.crypto; // for IE 11
        if (cryptoObj && cryptoObj.getRandomValues) {
            var buffer = new Uint8Array(16);
            cryptoObj.getRandomValues(buffer);
            //buffer[6] and buffer[7] represents the time_hi_and_version field. We will set the four most significant bits (4 through 7) of buffer[6] to represent decimal number 4 (UUID version number).
            buffer[6] |= 0x40; //buffer[6] | 01000000 will set the 6 bit to 1.
            buffer[6] &= 0x4f; //buffer[6] & 01001111 will set the 4, 5, and 7 bit to 0 such that bits 4-7 == 0100 = "4".
            //buffer[8] represents the clock_seq_hi_and_reserved field. We will set the two most significant bits (6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively.
            buffer[8] |= 0x80; //buffer[8] | 10000000 will set the 7 bit to 1.
            buffer[8] &= 0xbf; //buffer[8] & 10111111 will set the 6 bit to 0.
            return Utils.decimalToHex(buffer[0]) + Utils.decimalToHex(buffer[1])
                + Utils.decimalToHex(buffer[2]) + Utils.decimalToHex(buffer[3])
                + "-" + Utils.decimalToHex(buffer[4]) + Utils.decimalToHex(buffer[5])
                + "-" + Utils.decimalToHex(buffer[6]) + Utils.decimalToHex(buffer[7])
                + "-" + Utils.decimalToHex(buffer[8]) + Utils.decimalToHex(buffer[9])
                + "-" + Utils.decimalToHex(buffer[10]) + Utils.decimalToHex(buffer[11])
                + Utils.decimalToHex(buffer[12]) + Utils.decimalToHex(buffer[13])
                + Utils.decimalToHex(buffer[14]) + Utils.decimalToHex(buffer[15]);
        }
        else {
            var guidHolder = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
            var hex = "0123456789abcdef";
            var r = 0;
            var guidResponse = "";
            for (var i = 0; i < 36; i++) {
                if (guidHolder[i] !== "-" && guidHolder[i] !== "4") {
                    // each x and y needs to be random
                    r = Math.random() * 16 | 0;
                }
                if (guidHolder[i] === "x") {
                    guidResponse += hex[r];
                }
                else if (guidHolder[i] === "y") {
                    // clock-seq-and-reserved first hex is filtered and remaining hex values are random
                    r &= 0x3; // bit and with 0011 to set pos 2 to zero ?0??
                    r |= 0x8; // set pos 3 to 1 as 1???
                    guidResponse += hex[r];
                }
                else {
                    guidResponse += guidHolder[i];
                }
            }
            return guidResponse;
        }
    };
    /*
     * Parses out the components from a url string.
     * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
     */
    Utils.GetUrlComponents = function (url) {
        if (!url) {
            throw "Url required";
        }
        // https://gist.github.com/curtisz/11139b2cfcaef4a261e0
        var regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        var match = url.match(regEx);
        if (!match || match.length < 6) {
            throw "Valid url required";
        }
        var urlComponents = {
            Protocol: match[1],
            HostNameAndPort: match[4],
            AbsolutePath: match[5]
        };
        var pathSegments = urlComponents.AbsolutePath.split("/");
        pathSegments = pathSegments.filter(function (val) { return val && val.length > 0; }); // remove empty elements
        urlComponents.PathSegments = pathSegments;
        return urlComponents;
    };
    /*
     * Given a url or path, append a trailing slash if one doesnt exist
     */
    Utils.CanonicalizeUri = function (url) {
        if (url) {
            url = url.toLowerCase();
        }
        if (url && !Utils.endsWith(url, "/")) {
            url += "/";
        }
        return url;
    };
    /*
      * Checks to see if the url ends with the suffix
      * Required because we are compiling for es5 instead of es6
      * @param url
      * @param str
      */
    Utils.endsWith = function (url, suffix) {
        if (!url || !suffix) {
            return false;
        }
        return url.indexOf(suffix, url.length - suffix.length) !== -1;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/XHRClient.js":
/*!*****************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/XHRClient.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Copyright (c) Microsoft Corporation
 *  All Rights Reserved
 *  MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the 'Software'), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
 * OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
 * OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * XHR client for JSON endpoints
 * https://www.npmjs.com/package/async-promise
 * @hidden
 */
var XhrClient = /** @class */ (function () {
    function XhrClient() {
    }
    XhrClient.prototype.sendRequestAsync = function (url, method, enableCaching) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, /*async: */ true);
            if (enableCaching) {
                // TODO: (shivb) ensure that this can be cached
                // xhr.setRequestHeader("Cache-Control", "Public");
            }
            xhr.onload = function (ev) {
                if (xhr.status < 200 || xhr.status >= 300) {
                    reject(_this.handleError(xhr.responseText));
                }
                try {
                    var jsonResponse = JSON.parse(xhr.responseText);
                }
                catch (e) {
                    reject(_this.handleError(xhr.responseText));
                }
                resolve(jsonResponse);
            };
            xhr.onerror = function (ev) {
                reject(xhr.status);
            };
            if (method === "GET") {
                xhr.send();
            }
            else {
                throw "not implemented";
            }
        });
    };
    XhrClient.prototype.handleError = function (responseText) {
        var jsonResponse;
        try {
            jsonResponse = JSON.parse(responseText);
            if (jsonResponse.error) {
                return jsonResponse.error;
            }
            else {
                throw responseText;
            }
        }
        catch (e) {
            return responseText;
        }
    };
    return XhrClient;
}());
exports.XhrClient = XhrClient;
//# sourceMappingURL=XHRClient.js.map

/***/ }),

/***/ "./node_modules/msal/lib-commonjs/index.js":
/*!*************************************************!*\
  !*** ./node_modules/msal/lib-commonjs/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserAgentApplication_1 = __webpack_require__(/*! ./UserAgentApplication */ "./node_modules/msal/lib-commonjs/UserAgentApplication.js");
exports.UserAgentApplication = UserAgentApplication_1.UserAgentApplication;
var Logger_1 = __webpack_require__(/*! ./Logger */ "./node_modules/msal/lib-commonjs/Logger.js");
exports.Logger = Logger_1.Logger;
var Logger_2 = __webpack_require__(/*! ./Logger */ "./node_modules/msal/lib-commonjs/Logger.js");
exports.LogLevel = Logger_2.LogLevel;
var User_1 = __webpack_require__(/*! ./User */ "./node_modules/msal/lib-commonjs/User.js");
exports.User = User_1.User;
var Constants_1 = __webpack_require__(/*! ./Constants */ "./node_modules/msal/lib-commonjs/Constants.js");
exports.Constants = Constants_1.Constants;
var RequestInfo_1 = __webpack_require__(/*! ./RequestInfo */ "./node_modules/msal/lib-commonjs/RequestInfo.js");
exports.TokenResponse = RequestInfo_1.TokenResponse;
var Authority_1 = __webpack_require__(/*! ./Authority */ "./node_modules/msal/lib-commonjs/Authority.js");
exports.Authority = Authority_1.Authority;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob:
    'FileReader' in self &&
    'Blob' in self &&
    (function() {
      try {
        new Blob()
        return true
      } catch (e) {
        return false
      }
    })(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
}

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj)
}

if (support.arrayBuffer) {
  var viewClasses = [
    '[object Int8Array]',
    '[object Uint8Array]',
    '[object Uint8ClampedArray]',
    '[object Int16Array]',
    '[object Uint16Array]',
    '[object Int32Array]',
    '[object Uint32Array]',
    '[object Float32Array]',
    '[object Float64Array]'
  ]

  var isArrayBufferView =
    ArrayBuffer.isView ||
    function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name)
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name')
  }
  return name.toLowerCase()
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value)
  }
  return value
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  var iterator = {
    next: function() {
      var value = items.shift()
      return {done: value === undefined, value: value}
    }
  }

  if (support.iterable) {
    iterator[Symbol.iterator] = function() {
      return iterator
    }
  }

  return iterator
}

function Headers(headers) {
  this.map = {}

  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value)
    }, this)
  } else if (Array.isArray(headers)) {
    headers.forEach(function(header) {
      this.append(header[0], header[1])
    }, this)
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name])
    }, this)
  }
}

Headers.prototype.append = function(name, value) {
  name = normalizeName(name)
  value = normalizeValue(value)
  var oldValue = this.map[name]
  this.map[name] = oldValue ? oldValue + ', ' + value : value
}

Headers.prototype['delete'] = function(name) {
  delete this.map[normalizeName(name)]
}

Headers.prototype.get = function(name) {
  name = normalizeName(name)
  return this.has(name) ? this.map[name] : null
}

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name))
}

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = normalizeValue(value)
}

Headers.prototype.forEach = function(callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this)
    }
  }
}

Headers.prototype.keys = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push(name)
  })
  return iteratorFor(items)
}

Headers.prototype.values = function() {
  var items = []
  this.forEach(function(value) {
    items.push(value)
  })
  return iteratorFor(items)
}

Headers.prototype.entries = function() {
  var items = []
  this.forEach(function(value, name) {
    items.push([name, value])
  })
  return iteratorFor(items)
}

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'))
  }
  body.bodyUsed = true
}

function fileReaderReady(reader) {
  return new Promise(function(resolve, reject) {
    reader.onload = function() {
      resolve(reader.result)
    }
    reader.onerror = function() {
      reject(reader.error)
    }
  })
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsArrayBuffer(blob)
  return promise
}

function readBlobAsText(blob) {
  var reader = new FileReader()
  var promise = fileReaderReady(reader)
  reader.readAsText(blob)
  return promise
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf)
  var chars = new Array(view.length)

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i])
  }
  return chars.join('')
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0)
  } else {
    var view = new Uint8Array(buf.byteLength)
    view.set(new Uint8Array(buf))
    return view.buffer
  }
}

function Body() {
  this.bodyUsed = false

  this._initBody = function(body) {
    this._bodyInit = body
    if (!body) {
      this._bodyText = ''
    } else if (typeof body === 'string') {
      this._bodyText = body
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer)
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer])
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body)
    } else {
      this._bodyText = body = Object.prototype.toString.call(body)
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    this.blob = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      } else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }

    this.arrayBuffer = function() {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
      } else {
        return this.blob().then(readBlobAsArrayBuffer)
      }
    }
  }

  this.text = function() {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode)
    }
  }

  this.json = function() {
    return this.text().then(JSON.parse)
  }

  return this
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
  var upcased = method.toUpperCase()
  return methods.indexOf(upcased) > -1 ? upcased : method
}

function Request(input, options) {
  options = options || {}
  var body = options.body

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read')
    }
    this.url = input.url
    this.credentials = input.credentials
    if (!options.headers) {
      this.headers = new Headers(input.headers)
    }
    this.method = input.method
    this.mode = input.mode
    this.signal = input.signal
    if (!body && input._bodyInit != null) {
      body = input._bodyInit
      input.bodyUsed = true
    }
  } else {
    this.url = String(input)
  }

  this.credentials = options.credentials || this.credentials || 'same-origin'
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers)
  }
  this.method = normalizeMethod(options.method || this.method || 'GET')
  this.mode = options.mode || this.mode || null
  this.signal = options.signal || this.signal
  this.referrer = null

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests')
  }
  this._initBody(body)
}

Request.prototype.clone = function() {
  return new Request(this, {body: this._bodyInit})
}

function decode(body) {
  var form = new FormData()
  body
    .trim()
    .split('&')
    .forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
  return form
}

function parseHeaders(rawHeaders) {
  var headers = new Headers()
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
  preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
    var parts = line.split(':')
    var key = parts.shift().trim()
    if (key) {
      var value = parts.join(':').trim()
      headers.append(key, value)
    }
  })
  return headers
}

Body.call(Request.prototype)

function Response(bodyInit, options) {
  if (!options) {
    options = {}
  }

  this.type = 'default'
  this.status = options.status === undefined ? 200 : options.status
  this.ok = this.status >= 200 && this.status < 300
  this.statusText = 'statusText' in options ? options.statusText : 'OK'
  this.headers = new Headers(options.headers)
  this.url = options.url || ''
  this._initBody(bodyInit)
}

Body.call(Response.prototype)

Response.prototype.clone = function() {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function() {
  var response = new Response(null, {status: 0, statusText: ''})
  response.type = 'error'
  return response
}

var redirectStatuses = [301, 302, 303, 307, 308]

Response.redirect = function(url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code')
  }

  return new Response(null, {status: status, headers: {location: url}})
}

var DOMException = self.DOMException
try {
  new DOMException()
} catch (err) {
  DOMException = function(message, name) {
    this.message = message
    this.name = name
    var error = Error(message)
    this.stack = error.stack
  }
  DOMException.prototype = Object.create(Error.prototype)
  DOMException.prototype.constructor = DOMException
}

function fetch(input, init) {
  return new Promise(function(resolve, reject) {
    var request = new Request(input, init)

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'))
    }

    var xhr = new XMLHttpRequest()

    function abortXhr() {
      xhr.abort()
    }

    xhr.onload = function() {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      }
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
      var body = 'response' in xhr ? xhr.response : xhr.responseText
      resolve(new Response(body, options))
    }

    xhr.onerror = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.ontimeout = function() {
      reject(new TypeError('Network request failed'))
    }

    xhr.onabort = function() {
      reject(new DOMException('Aborted', 'AbortError'))
    }

    xhr.open(request.method, request.url, true)

    if (request.credentials === 'include') {
      xhr.withCredentials = true
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob'
    }

    request.headers.forEach(function(value, name) {
      xhr.setRequestHeader(name, value)
    })

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr)

      xhr.onreadystatechange = function() {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr)
        }
      }
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
  })
}

fetch.polyfill = true

if (!self.fetch) {
  self.fetch = fetch
  self.Headers = Headers
  self.Request = Request
  self.Response = Response
}


/***/ }),

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



/***/ })

}]);
//# sourceMappingURL=room-list-room-list-module~ssp-room-ssp-room-module.js.map