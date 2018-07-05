var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Data } from '../../providers/data/data';
import { Http, Headers, RequestOptions } from '@angular/http';
/**
 * Generated class for the UserinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserinfoPage = /** @class */ (function () {
    function UserinfoPage(dataService, alertCtrl, toastCtrl, http, navCtrl, navParams, fb) {
        var _this = this;
        this.dataService = dataService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.userinfo = [];
        this.hideForm = false;
        this.baseURI = "http://creativeoutsourcesolutions.com/myapphandler/";
        this.dataService.getUData().then(function (UserData) {
            if (UserData) {
                _this.userinfo = JSON.parse(UserData);
                console.log(_this.userinfo['id']);
            }
        });
        this.form = fb.group({
            "fname": ["", Validators.required],
            "lname": ["", Validators.required],
            "gender": ["", Validators.required],
        });
    }
    UserinfoPage.prototype.updateEntry = function (fname, lname, gender) {
        var _this = this;
        var body = "?key=fillup&fname=" + fname + "&lname=" + lname + "&gender=" + gender + "&id=" + this.userinfo['id'], type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers }), url = this.baseURI + "manage-data.php" + body;
        this.http.post(url, body, options)
            .subscribe(function (data) {
            // If the request was successful notify the user
            if (data.status === 200) {
                _this.hideForm = true;
                _this.sendNotification("Account Successfully updated!");
            }
            // Otherwise let 'em know anyway
            else {
                _this.sendNotification('Something went wrong!');
            }
        });
    };
    UserinfoPage.prototype.updateUser = function () {
        var fname = this.form.controls["fname"].value, lname = this.form.controls["lname"].value, gender = this.form.controls["gender"].value;
        this.updateEntry(fname, lname, gender);
        this.dataService.clearData();
        this.navCtrl.setRoot('LoginPage');
    };
    UserinfoPage.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    };
    UserinfoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-userinfo',
            templateUrl: 'userinfo.html',
        }),
        __metadata("design:paramtypes", [Data,
            AlertController,
            ToastController,
            Http,
            NavController,
            NavParams,
            FormBuilder])
    ], UserinfoPage);
    return UserinfoPage;
}());
export { UserinfoPage };
//# sourceMappingURL=userinfo.js.map