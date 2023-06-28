"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var axios_1 = require("axios");
// const baseUrl = "http://localhost:3000/v1/api";
var baseUrl = "https://api.supersconto24.com/v1/api";
exports.axiosRequest = function () {
    var cancelTokenSource;
    return function (_a) {
        var url = _a.url, _b = _a.data, data = _b === void 0 ? null : _b, _c = _a.method, method = _c === void 0 ? "get" : _c;
        return __awaiter(void 0, void 0, void 0, function () {
            var config, response, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        // Check if a previous request was made
                        if (cancelTokenSource) {
                            // Cancel the previous request before making a new one
                            cancelTokenSource.cancel("Request canceled due to a new request.");
                        }
                        // Create a new CancelToken
                        cancelTokenSource = axios_1["default"].CancelToken.source();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        config = {
                            url: url,
                            method: method,
                            data: data,
                            cancelToken: cancelTokenSource.token
                        };
                        return [4 /*yield*/, axios_1["default"].request(config)];
                    case 2:
                        response = _d.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_1 = _d.sent();
                        if (axios_1.isCancel(error_1)) {
                            // Handle if the request was canceled
                            console.log("Request canceled:", error_1.message);
                        }
                        else {
                            // Handle other errors
                            console.log("Something went wrong:", error_1.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
};
function updateParamValue(data) {
    var params = window.location.href.indexOf("?") !== -1 ? window.location.href.slice(window.location.href.indexOf("?") + 1).split("&") : [];
    var updatedParams = __spreadArrays(params);
    data.forEach(function (item) {
        var key = item.key, value = item.value;
        var paramIndex = updatedParams.findIndex(function (param) { return param.startsWith(key + "="); });
        if (paramIndex !== -1) {
            updatedParams[paramIndex] = key + "=" + value;
        }
        else {
            updatedParams.push(key + "=" + value);
        }
    });
    return window.location.pathname + "?" + updatedParams.join("&");
}
exports.updateParamValue = updateParamValue;
function convertPrice(priceLocal, localBasedOneUSD, targetBasedOnUSD) {
    // Convert EUR to USD
    var priceUSD = priceLocal / localBasedOneUSD;
    // Convert USD to Target
    var priceLKR = priceUSD * targetBasedOnUSD;
    // Round the result to two decimal places
    return Math.round(priceLKR * 100) / 100;
}
exports.convertPrice = convertPrice;
exports["default"] = baseUrl;

//# sourceMappingURL=baseUrl.js.map
