import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { Data } from '../../providers/data/data';
import { AlertController } from 'ionic-angular';

export interface PageInterface {
	title: string;
	pageName: string;
	tabComponent?: any;
	index?: any;
	icon: string;
}

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

	rootPage = 'TabsPage';
  public userinfo = [];

	@ViewChild(Nav) nav: Nav;

	pages: PageInterface[] = [
		{title: 'Word of the Day', pageName: 'TabsPage', tabComponent: 'Tab1Page', index: 0, icon: 'book'  },
		{title: 'Quote of the Day', pageName: 'TabsPage', tabComponent: 'Tab2Page', index: 1, icon: 'quote' },
    {title: 'Nature Series', pageName: 'TabsPage', tabComponent: 'Tab3Page', index: 2, icon: 'sunny' },
		{title: 'User Profile', pageName: 'UserPage', icon: 'settings' },
	]

  constructor(public dataService: Data, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.dataService.getUData().then((UserData) => {
      if(!UserData){
        this.navCtrl.setRoot('LoginPage');
      }
    });
  }

  openPage(page: PageInterface){
    let params = {};

    if (page.index){
      params = { tabIndex: page.index }
    }
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    }
    else{
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInterface){
  	let childNav = this.nav.getActiveChildNav();

    if(childNav){
      if(childNav.getSelected() && childNav.getSelected().root === page.tabComponent){
        return 'primary';
      }
      return;
    }
  }

  userprofile(){
    this.navCtrl.setRoot('UserPage');
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm to Logout',
      message: 'Do you want to logout?',
      buttons: [
        {
          text: 'Close',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Agree clicked');
            this.logout();
          }
        }
      ]
    });
    confirm.present();
  }

  logout(){
    this.dataService.clearData();
    this.navCtrl.setRoot('LoginPage');
  }
}
