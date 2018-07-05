var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { AlertController } from 'ionic-angular';
var AdminPage = /** @class */ (function () {
    function AdminPage(dataService, navCtrl, navParams, alertCtrl) {
        var _this = this;
        this.dataService = dataService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.rootPage = 'TabsPage';
        this.userinfo = [];
        this.pages = [
            { title: 'Word of the Day', pageName: 'TabsPage', tabComponent: 'Tab1Page', index: 0, icon: 'book' },
            { title: 'Quote of the Day', pageName: 'TabsPage', tabComponent: 'Tab2Page', index: 1, icon: 'quote' },
            { title: 'Nature Series', pageName: 'TabsPage', tabComponent: 'Tab3Page', index: 2, icon: 'sunny' },
            { title: 'User Profile', pageName: 'UserPage', icon: 'settings' },
        ];
        this.dataService.getUData().then(function (UserData) {
            if (!UserData) {
                _this.navCtrl.setRoot('LoginPage');
            }
        });
    }
    AdminPage.prototype.openPage = function (page) {
        var params = {};
        if (page.index) {
            params = { tabIndex: page.index };
        }
        if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
        }
        else {
            this.nav.setRoot(page.pageName, params);
        }
    };
    AdminPage.prototype.isActive = function (page) {
        var childNav = this.nav.getActiveChildNav();
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }
    };
    AdminPage.prototype.userprofile = function () {
        this.navCtrl.setRoot('UserPage');
    };
    AdminPage.prototype.showConfirm = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Confirm to Logout',
            message: 'Do you want to logout?',
            buttons: [
                {
                    text: 'Close',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        console.log('Agree clicked');
                        _this.logout();
                    }
                }
            ]
        });
        confirm.present();
    };
    AdminPage.prototype.logout = function () {
        this.dataService.clearData();
        this.navCtrl.setRoot('LoginPage');
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], AdminPage.prototype, "nav", void 0);
    AdminPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-admin',
            templateUrl: 'admin.html',
        }),
        __metadata("design:paramtypes", [Data, NavController, NavParams, AlertController])
    ], AdminPage);
    return AdminPage;
}());
export { AdminPage };
//# sourceMappingURL=admin.js.map