import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';	

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public form : FormGroup;
  public uname  : any;
  public password  : any;
  public email  : any;
  // Flag to be used for checking whether we are adding/editing an entry
  public isEdited               : boolean = false;
  // Flag to hide the form upon successful completion of remote operation
  public hideForm               : boolean = false;
  // Property to help ste the page title
  public pageTitle              : string;
  // Property to store the recordID for when an existing entry is being edited
  public recordID               : any = null;
  private baseURI               : string  = "http://creativeoutsourcesolutions.com/myapphandler/";

  constructor(public navCtrl    : NavController,
           public http       : Http,
           public NP         : NavParams,
           public fb         : FormBuilder,
           public toastCtrl  : ToastController) {
  	this.form = fb.group({
       "uname"                  : ["", Validators.required],
       "password"                  : ["", Validators.required],
       "email"                  : ["", Validators.required]
    });
  }
  createEntry(uname,pass,email){
    let body     : string   = "?key=create&uname=" + uname + "&email=" + email + "&password=" + pass,
        type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers  : any      = new Headers({ 'Content-Type': type}),
        options  : any      = new RequestOptions({ headers: headers }),
        url      : any      = this.baseURI + "manage-data.php" + body;

      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         if(data.status === 200)
         {
            this.hideForm   = true;
            console.log(body);
            this.sendNotification(`Congratulations!`);
         }
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });
  }
  login() {
    this.navCtrl.setRoot('LoginPage');
  }
  regUser(){
    let uname   : string    = this.form.controls["uname"].value,
        password   : string    = this.form.controls["password"].value,
        email   : string    = this.form.controls["email"].value;

    this.createEntry(uname, password, email);
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
