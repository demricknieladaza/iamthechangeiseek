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
import { App, IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Data } from '../../providers/data/data';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
var LoginPage = /** @class */ (function () {
    function LoginPage(dataService, alertCtrl, toastCtrl, http, navCtrl, navParams, fb, appCtrl) {
        var _this = this;
        this.dataService = dataService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.appCtrl = appCtrl;
        this.userinfo = [];
        this.baseURI = "http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php";
        this.dataService.getUData().then(function (UserData) {
            if (UserData) {
                _this.userinfo = JSON.parse(UserData);
                if (_this.userinfo['fname'] == null) {
                    _this.navCtrl.setRoot('UserinfoPage');
                }
                else {
                    _this.navCtrl.setRoot('AdminPage');
                }
            }
            else {
            }
        });
        this.form = fb.group({
            "uname": ["", Validators.required],
            "password": ["", Validators.required]
        });
    }
    LoginPage.prototype.register = function () {
        this.navCtrl.push('RegisterPage');
    };
    LoginPage.prototype.doLogin = function (uname, upass) {
        var _this = this;
        var body = "?key=login&uname=" + uname + "&upass=" + upass, type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type });
        this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=login&uname=" + uname + "&upass=" + upass)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.length == 0) {
                console.log("Congratulations : suasd ");
                _this.showConfirm();
            }
            else {
                console.log(data[0]['id']);
                if (data[0]['fname'] == null) {
                    var userinf = {
                        id: data[0]['id'],
                        utype: data[0]['acc_type'],
                        fname: data[0]['fname'],
                    };
                    _this.dataService.saveUData(userinf);
                    _this.navCtrl.setRoot('UserinfoPage');
                }
                else {
                    if (data[0]['acc_type'] == 0) {
                        var userinf = {
                            id: data[0]['id'],
                            fname: data[0]['fname'],
                            lname: data[0]['lname'],
                            utype: data[0]['acc_type'],
                            uname: data[0]['uname'],
                            email: data[0]['email']
                        };
                        _this.dataService.saveUData(userinf);
                        _this.navCtrl.setRoot('AdminPage');
                    }
                    if (data[0]['acc_type'] == 1) {
                        var userinf = {
                            id: data[0]['id'],
                            fname: data[0]['fname'],
                            lname: data[0]['lname'],
                            utype: data[0]['acc_type'],
                            uname: data[0]['uname'],
                            email: data[0]['email']
                        };
                        _this.dataService.saveUData(userinf);
                        _this.navCtrl.setRoot('AdminPage');
                    }
                }
            }
        });
    };
    LoginPage.prototype.logUser = function () {
        var uname = this.form.controls["uname"].value, upass = this.form.controls["password"].value;
        this.doLogin(uname, upass);
    };
    LoginPage.prototype.showConfirm = function () {
        var alert = this.alertCtrl.create({
            title: 'Error Login!',
            subTitle: 'Something\'s wrong with your login credentials!',
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [Data,
            AlertController,
            ToastController,
            Http,
            NavController,
            NavParams,
            FormBuilder,
            App])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map