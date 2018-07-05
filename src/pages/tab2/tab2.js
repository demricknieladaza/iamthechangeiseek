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
import { Data } from '../../providers/data/data';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
/**
 * Generated class for the Tab2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Tab2Page = /** @class */ (function () {
    function Tab2Page(toastCtrl, dataService, http, navCtrl, navParams) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.dataService = dataService;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.baseURI = "http://creativeoutsourcesolutions.com/myapphandler/";
        this.userinfo = [];
        this.mylikes = [];
        this.imgurl = 'http://creativeoutsourcesolutions.com/appAdmin/uploads/qod/';
        this.variable = false;
        this.dataService.getUData().then(function (UserData) {
            if (UserData) {
                _this.userinfo = JSON.parse(UserData);
                _this.getmylikes();
            }
            else {
            }
        });
        this.getimages();
    }
    Tab2Page.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    };
    Tab2Page.prototype.comment = function (asd) {
        this.navCtrl.push('CommentsPage', { info: asd, type: 'q' });
    };
    Tab2Page.prototype.like = function (asd) {
        var _this = this;
        // console.log('like man ka '+asd+"  "+this.userinfo['id']);
        var body = "?key=likeqod&qodid=" + asd + "&uid=" + this.userinfo['id'], type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers }), url = this.baseURI + "manage-data.php" + body;
        this.http.post(url, body, options)
            .subscribe(function (data) {
            if (data.status === 200) {
                _this.sendNotification('You liked a photo!');
                _this.mylikes.push(asd);
            }
            else {
                _this.sendNotification('Something went wrong!');
            }
        });
    };
    Tab2Page.prototype.getmylikes = function () {
        var _this = this;
        // console.log("http://localhost/myapphandler/retrieve-data.php?key=getmylikes&id=3"+this.userinfo['id']);
        this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getmylikesq&id=" + this.userinfo['id'])
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data) {
                console.log(data);
                if (data.length == 0) {
                    //this.imahe = "http://localhost/dbhandler/uploads/"+ 'default_pic.jpg' ;
                    _this.mylikes = data;
                }
                else {
                    data.forEach(function (item, index) {
                        _this.mylikes.push(item.img_id);
                        // console.log(item.img_id);
                        // console.log(index);
                    });
                }
                console.log(_this.mylikes);
            }
        });
    };
    Tab2Page.prototype.ulike = function () {
        this.sendNotification('You already liked this photo!');
    };
    Tab2Page.prototype.getimages = function () {
        var _this = this;
        this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getimageq")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data) {
                console.log(data);
                if (data.length == 0) {
                    //this.imahe = "http://localhost/dbhandler/uploads/"+ 'default_pic.jpg' ;
                    console.log('hahahah');
                }
                else {
                    _this.image = data;
                    console.log('suod cya h');
                }
            }
        });
    };
    Tab2Page.prototype.doRefresh = function (refresher) {
        var _this = this;
        console.log('Begin async operation', refresher);
        setTimeout(function () {
            console.log('Async operation has ended');
            _this.getimages();
            refresher.complete();
        }, 2000);
    };
    Tab2Page = __decorate([
        IonicPage(),
        Component({
            selector: 'page-tab2',
            templateUrl: 'tab2.html',
        }),
        __metadata("design:paramtypes", [ToastController, Data, Http, NavController, NavParams])
    ], Tab2Page);
    return Tab2Page;
}());
export { Tab2Page };
//# sourceMappingURL=tab2.js.map