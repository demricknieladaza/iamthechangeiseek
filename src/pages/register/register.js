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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, http, NP, fb, toastCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.NP = NP;
        this.fb = fb;
        this.toastCtrl = toastCtrl;
        // Flag to be used for checking whether we are adding/editing an entry
        this.isEdited = false;
        // Flag to hide the form upon successful completion of remote operation
        this.hideForm = false;
        // Property to store the recordID for when an existing entry is being edited
        this.recordID = null;
        this.baseURI = "http://creativeoutsourcesolutions.com/myapphandler/";
        this.form = fb.group({
            "uname": ["", Validators.required],
            "password": ["", Validators.required],
            "email": ["", Validators.required]
        });
    }
    RegisterPage.prototype.createEntry = function (uname, pass, email) {
        var _this = this;
        var body = "?key=create&uname=" + uname + "&email=" + email + "&password=" + pass, type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers }), url = this.baseURI + "manage-data.php" + body;
        this.http.post(url, body, options)
            .subscribe(function (data) {
            if (data.status === 200) {
                _this.hideForm = true;
                console.log(body);
                _this.sendNotification("Congratulations!");
            }
            else {
                _this.sendNotification('Something went wrong!');
            }
        });
    };
    RegisterPage.prototype.login = function () {
        this.navCtrl.setRoot('LoginPage');
    };
    RegisterPage.prototype.regUser = function () {
        var uname = this.form.controls["uname"].value, password = this.form.controls["password"].value, email = this.form.controls["email"].value;
        this.createEntry(uname, password, email);
        this.navCtrl.setRoot('LoginPage');
    };
    RegisterPage.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    };
    RegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-register',
            templateUrl: 'register.html',
        }),
        __metadata("design:paramtypes", [NavController,
            Http,
            NavParams,
            FormBuilder,
            ToastController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map