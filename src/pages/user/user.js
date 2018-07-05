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
import { Http, Headers, RequestOptions } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserPage = /** @class */ (function () {
    function UserPage(dataService, camera, alertCtrl, toastCtrl, http, navCtrl, navParams, fb, appCtrl) {
        var _this = this;
        this.dataService = dataService;
        this.camera = camera;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.appCtrl = appCtrl;
        this.userinfo = [];
        this.lastwod = [];
        this.lastqod = [];
        this.imgsrc = "http://creativeoutsourcesolutions.com/appAdmin/uploads/wod/";
        this.imgsrcq = "http://creativeoutsourcesolutions.com/appAdmin/uploads/qod/";
        this.hideForm = false;
        this.baseURI = "http://creativeoutsourcesolutions.com/myapphandler/";
        this.dataService.getUData().then(function (UserData) {
            if (UserData) {
                _this.userinfo = JSON.parse(UserData);
            }
            else {
            }
        });
        this.form = fb.group({
            "uname": ["", Validators.required],
            "fname": ["", Validators.required],
            "lname": ["", Validators.required],
            "email": ["", Validators.required]
        });
        this.getlastwod();
        this.getlastqod();
    }
    UserPage.prototype.updateUser = function () {
        var uname = this.form.controls["uname"].value, fname = this.form.controls["fname"].value, email = this.form.controls["email"].value, lname = this.form.controls["lname"].value;
        this.doUpdate(uname, fname, lname, email);
    };
    UserPage.prototype.doUpdate = function (nuname, nfname, nlname, nemail) {
        var _this = this;
        var body = "?key=updateuser&fname=" + nfname + "&lname=" + nlname + "&uname=" + nuname + "&email=" + nemail + "&id=" + this.userinfo['id'], type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers }), url = this.baseURI + "manage-data.php" + body;
        this.http.post(url, body, options)
            .subscribe(function (data) {
            // If the request was successful notify the user
            if (data.status === 200) {
                _this.hideForm = true;
                _this.sendNotification("Account Successfully updated!");
                var userinf = {
                    id: _this.userinfo['id'],
                    fname: nfname,
                    lname: nlname,
                    uname: nuname,
                    email: nemail,
                };
                _this.dataService.saveUData(userinf);
                _this.navCtrl.setRoot('UserPage');
            }
            // Otherwise let 'em know anyway
            else {
                _this.sendNotification('Something went wrong!');
            }
        });
    };
    UserPage.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    };
    UserPage.prototype.takephoto = function () {
        // const options: CameraOptions = {
        //   quality: 100,
        //   destinationType: this.camera.DestinationType.DATA_URL,
        //   encodingType: this.camera.EncodingType.JPEG,
        //   mediaType: this.camera.MediaType.PICTURE
        // }
        // this.camera.getPicture(options).then((imageData) => {
        //  // imageData is either a base64 encoded string or a file URI
        //  // If it's base64:
        //    this.base64Image = 'data:image/jpeg;base64,' + imageData;
        //  }, (err) =>{
        //    //handle error
        //  });
        this.sendNotification('This action is not yet available!');
    };
    UserPage.prototype.opengallery = function () {
        //  const options: CameraOptions = {
        //   quality: 100,
        //   destinationType: this.camera.DestinationType.DATA_URL,
        //   encodingType: this.camera.EncodingType.JPEG,
        //   mediaType: this.camera.MediaType.PICTURE,
        //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        // }
        // this.camera.getPicture(options).then((imageData) => {
        //  // imageData is either a base64 encoded string or a file URI
        //  // If it's base64:
        //    this.base64Image = 'data:image/jpeg;base64,' + imageData;
        //  }, (err) =>{
        //    //handle error
        //  });
        this.sendNotification('This action is not yet available!');
    };
    UserPage.prototype.uploadimg = function () {
        // let url = "http://creativeoutsourcesolutions.com/myapphandler/json.php";
        // let postData = new FormData();
        // postData.append('file', this.base64Image);
        // let data:Observable<any> = this.http.post(url, postData);
        // data.subscribe((result) => {
        //   console.log(result);
        // })
        this.sendNotification('This action is not yet available!');
    };
    UserPage.prototype.getlastwod = function () {
        var _this = this;
        this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getlastimage")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data) {
                console.log(data['image']);
                _this.lastwod = data;
            }
        });
    };
    UserPage.prototype.getlastqod = function () {
        var _this = this;
        this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getlastimageq")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data) {
                console.log(data['image']);
                _this.lastqod = data;
            }
        });
    };
    UserPage.prototype.openwod = function () {
        this.navCtrl.setRoot('TabsPage');
    };
    UserPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-user',
            templateUrl: 'user.html',
        }),
        __metadata("design:paramtypes", [Data,
            Camera,
            AlertController,
            ToastController,
            Http,
            NavController,
            NavParams,
            FormBuilder,
            App])
    ], UserPage);
    return UserPage;
}());
export { UserPage };
//# sourceMappingURL=user.js.map