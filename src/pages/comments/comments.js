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
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CommentsPage = /** @class */ (function () {
    function CommentsPage(toastCtrl, dataService, http, alertCtrl, navCtrl, navParams) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.dataService = dataService;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.variable = false;
        this.baseURI = "http://creativeoutsourcesolutions.com/myapphandler/";
        this.dataService.getUData().then(function (UserData) {
            if (UserData) {
                _this.userinfo = JSON.parse(UserData);
                _this.imginfo = _this.navParams.data;
                if (_this.imginfo.type == 'w') {
                    _this.imgurl = 'http://creativeoutsourcesolutions.com/appAdmin/uploads/wod/' + _this.imginfo.info.image;
                }
                else {
                    _this.imgurl = 'http://creativeoutsourcesolutions.com/appAdmin/uploads/qod/' + _this.imginfo.info.image;
                }
                console.log(_this.imginfo.info);
                _this.getComments();
            }
            else {
            }
        });
    }
    CommentsPage.prototype.getComments = function () {
        var _this = this;
        if (this.imginfo.type == 'w') {
            this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getcomments&iid=" + this.imginfo.info['id'])
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data) {
                    if (data.length == 0) {
                        //this.imahe = "http://localhost/dbhandler/uploads/"+ 'default_pic.jpg' ;
                        console.log('hahahah');
                    }
                    else {
                        _this.comments = data;
                        console.log(_this.comments);
                        // this.image = data ;
                    }
                }
            });
        }
        else {
            this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getcommentsq&iid=" + this.imginfo.info['id'])
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data) {
                    if (data.length == 0) {
                        //this.imahe = "http://localhost/dbhandler/uploads/"+ 'default_pic.jpg' ;
                        console.log('hahahah');
                    }
                    else {
                        _this.comments = data;
                        console.log(_this.comments);
                        // this.image = data ;
                    }
                }
            });
        }
    };
    CommentsPage.prototype.sendNotification = function (message) {
        var notification = this.toastCtrl.create({
            message: message,
            duration: 3000
        });
        notification.present();
    };
    CommentsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommentsPage');
    };
    CommentsPage.prototype.goBack = function () {
        window.history.back();
    };
    CommentsPage.prototype.ionViewWillEnter = function () {
        var tabs = document.querySelectorAll('.tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map(function (key) {
                tabs[key].style.transform = 'translateY(56px)';
            });
        } // end if
    };
    CommentsPage.prototype.ionViewDidLeave = function () {
        var tabs = document.querySelectorAll('.tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map(function (key) {
                tabs[key].style.transform = 'translateY(0)';
            });
        } // end if
    };
    CommentsPage.prototype.showPrompt = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Comment',
            message: "Enter a comment",
            inputs: [
                {
                    name: 'comment',
                    placeholder: 'Comment'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Comment',
                    handler: function (data) {
                        console.log(data['comment']);
                        if (data['comment'] === "") {
                            _this.sendNotification('Input a comment!');
                        }
                        else {
                            _this.uploadComment(data['comment']);
                        }
                    }
                }
            ]
        });
        prompt.present();
    };
    CommentsPage.prototype.uploadComment = function (inf) {
        var _this = this;
        if (this.imginfo.type == 'w') {
            var body = "?key=comment&image_id=" + this.imginfo.info['id'] + "&uid=" + this.userinfo['id'] + "&comment=" + inf + "&uname=" + this.userinfo['uname'], type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers }), url = this.baseURI + "manage-data.php" + body;
            console.log(url);
            this.http.post(url, body, options)
                .subscribe(function (data) {
                if (data.status === 200) {
                    // this.mylikes.push(asd);
                    _this.getComments();
                }
                else {
                    // this.sendNotification('Something went wrong!');
                }
            });
        }
        else {
            var body = "?key=commentq&image_id=" + this.imginfo.info['id'] + "&uid=" + this.userinfo['id'] + "&comment=" + inf + "&uname=" + this.userinfo['uname'], type = "application/x-www-form-urlencoded; charset=UTF-8", headers = new Headers({ 'Content-Type': type }), options = new RequestOptions({ headers: headers }), url = this.baseURI + "manage-data.php" + body;
            console.log(url);
            this.http.post(url, body, options)
                .subscribe(function (data) {
                if (data.status === 200) {
                    // this.mylikes.push(asd);
                    _this.getComments();
                }
                else {
                    // this.sendNotification('Something went wrong!');
                }
            });
        }
    };
    CommentsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-comments',
            templateUrl: 'comments.html',
        }),
        __metadata("design:paramtypes", [ToastController, Data, Http, AlertController, NavController, NavParams])
    ], CommentsPage);
    return CommentsPage;
}());
export { CommentsPage };
//# sourceMappingURL=comments.js.map