import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Data } from '../../providers/data/data';
import { Http, Headers, RequestOptions } from '@angular/http';

/**
 * Generated class for the UserinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
})
export class UserinfoPage {
	public form : FormGroup;
	public user : any[];
	public userinfo = [];
  	public hideForm : boolean = false;
	public fname : any;
	public lname : any;
	public dob : any;
	public gender : any;
	private baseURI  : string  = "http://creativeoutsourcesolutions.com/myapphandler/";

  constructor(public dataService: Data, 
    public alertCtrl : AlertController, 
    public toastCtrl  : ToastController, 
    public http : Http, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fb : FormBuilder) {

  	this.dataService.getUData().then((UserData) => {
      if(UserData){
        this.userinfo = JSON.parse(UserData);
        console.log(this.userinfo['id']);
      }
    });
  	this.form = fb.group({
       "fname"     : ["", Validators.required],
       "lname"     : ["", Validators.required],
       "gender"    : ["", Validators.required],
    });

  }

  updateEntry(fname,lname,gender){
    let body     : string   = "?key=fillup&fname=" + fname + "&lname=" + lname + "&gender=" + gender + "&id=" + this.userinfo['id'],
        type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers  : any      = new Headers({ 'Content-Type': type}),
        options  : any      = new RequestOptions({ headers: headers }),
        url      : any      = this.baseURI + "manage-data.php" + body;

      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         // If the request was successful notify the user
         if(data.status === 200)
         {
            this.hideForm   = true;
            this.sendNotification(`Account Successfully updated!`);
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });
  }

  updateUser(){
    let fname   : string    = this.form.controls["fname"].value,
        lname   : string    = this.form.controls["lname"].value,
        gender   : string    = this.form.controls["gender"].value;

    this.updateEntry(fname, lname, gender);
    this.dataService.clearData();
    this.navCtrl.setRoot('LoginPage');
  }

  sendNotification(message)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }

}
