var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
var Data = /** @class */ (function () {
    function Data(http, storage) {
        this.http = http;
        this.storage = storage;
    }
    Data.prototype.getUData = function () {
        return this.storage.get('UserData');
    };
    Data.prototype.saveUData = function (data) {
        var newData = JSON.stringify(data);
        console.log(newData);
        this.storage.set('UserData', newData);
    };
    Data.prototype.clearData = function () {
        this.storage.clear();
    };
    Data = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, Storage])
    ], Data);
    return Data;
}());
export { Data };
//# sourceMappingURL=data.js.map