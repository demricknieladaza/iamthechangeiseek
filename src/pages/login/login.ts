import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Data } from '../../providers/data/data';
import { Http, Headers, RequestOptions } from '@angular/http';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';  


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public form : FormGroup;
  public user : any[];
  public userinfo = [];
  public uname : any;
  public password : any;
  public acc : 'account_type';
  private baseURI  : string  = "http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php";

  constructor(public dataService: Data, 
    public alertCtrl : AlertController, 
    public toastCtrl  : ToastController, 
    public http : Http, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public fb : FormBuilder,
    public appCtrl : App) {
    this.dataService.getUData().then((UserData) => {
      if(UserData){
        this.userinfo = JSON.parse(UserData);
        if(this.userinfo['fname']==null){
          this.navCtrl.setRoot('UserinfoPage');
        }
        else{
          this.navCtrl.setRoot('AdminPage');
        }
        }
        else{
          
        }
    });
    this.form = fb.group({
       "uname"                  : ["", Validators.required],
       "password"                  : ["", Validators.required]
    });

  }
  register(){
    this.navCtrl.push('RegisterPage');
  }

  doLogin(uname, upass){
    let body     : string   = "?key=login&uname=" + uname + "&upass=" + upass,
          type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
          headers  : any      = new Headers({ 'Content-Type': type});
      this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=login&uname=" + uname + "&upass=" + upass)
        .map(res => res.json())
        .subscribe(data => 
        {
          if(data.length == 0)
           {
              console.log(`Congratulations : suasd `);
              this.showConfirm();
           }
           else
           {
              console.log(data[0]['id']);
              if(data[0]['fname']==null){
                let userinf = {
                  id : data[0]['id'],
                  utype : data[0]['acc_type'],
                  fname : data[0]['fname'],
                };
                this.dataService.saveUData(userinf);
                this.navCtrl.setRoot('UserinfoPage');
              }
              else{
                if(data[0]['acc_type']==0){
                  let userinf = {
                  id : data[0]['id'],
                  fname : data[0]['fname'],
                  lname : data[0]['lname'],
                  utype : data[0]['acc_type'],
                  uname : data[0]['uname'],
                  email : data[0]['email']
                };
                this.dataService.saveUData(userinf);
                this.navCtrl.setRoot('AdminPage');
                }
                if(data[0]['acc_type']==1){
                  let userinf = {
                  id : data[0]['id'],
                  fname : data[0]['fname'],
                  lname : data[0]['lname'],
                  utype : data[0]['acc_type'],
                  uname : data[0]['uname'],
                  email : data[0]['email']
                };
                this.dataService.saveUData(userinf);
                this.navCtrl.setRoot('AdminPage');
                }
                
              }
           }    
        });
  }

  logUser(){
    let uname   : string = this.form.controls["uname"].value,
        upass   : string = this.form.controls["password"].value;

    this.doLogin(uname, upass);
  }
  showConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Error Login!',
      subTitle: 'Something\'s wrong with your login credentials!',
      buttons: ['OK']
    });
    alert.present();
  }

}
