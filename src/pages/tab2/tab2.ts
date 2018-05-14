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

@IonicPage()
@Component({
  selector: 'page-tab2',
  templateUrl: 'tab2.html',
})
export class Tab2Page {
  public image:any;
  private baseURI : string  = "http://creativeoutsourcesolutions.com/myapphandler/";
  public userinfo = [];
  public mylikes = [];
  public imgurl = 'http://creativeoutsourcesolutions.com/appAdmin/uploads/qod/';
  public variable = false;

  constructor(public toastCtrl : ToastController,public dataService: Data, public http : Http, public navCtrl: NavController, public navParams: NavParams) {
    this.dataService.getUData().then((UserData) => {
      if(UserData){
        this.userinfo = JSON.parse(UserData);
        this.getmylikes();
      }
      else{
      }
    });
  	this.getimages();
  }
  sendNotification(message)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }
   comment(asd){
    this.navCtrl.push('CommentsPage',{ info:asd, type:'q' });
  }
  like(asd){
    // console.log('like man ka '+asd+"  "+this.userinfo['id']);
    let body     : string   = "?key=likeqod&qodid="+ asd + "&uid=" + this.userinfo['id'],
        type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers  : any      = new Headers({ 'Content-Type': type}),
        options  : any      = new RequestOptions({ headers: headers }),
        url      : any      = this.baseURI + "manage-data.php" + body;
      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         if(data.status === 200)
         {
          this.sendNotification('You liked a photo!');
          this.mylikes.push(asd);
         }
         else
         {
          this.sendNotification('Something went wrong!');
         }
      });
  }
  getmylikes(){
    // console.log("http://localhost/myapphandler/retrieve-data.php?key=getmylikes&id=3"+this.userinfo['id']);
    this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getmylikesq&id="+this.userinfo['id'])
      .map(res => res.json())
      .subscribe(data => 
      {
        if(data){
          console.log(data);
          if(data.length==0){
            //this.imahe = "http://localhost/dbhandler/uploads/"+ 'default_pic.jpg' ;
            this.mylikes = data ;
          }
          else{
            data.forEach((item,index) => {
              this.mylikes.push(item.img_id);
              // console.log(item.img_id);
              // console.log(index);
            })
            
          }
          console.log(this.mylikes);
        }
        
      });
  }
  ulike(){
     this.sendNotification('You already liked this photo!');
   }
  getimages(){
    this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getimageq")
      .map(res => res.json())
      .subscribe(data => 
      {
        if(data){
          console.log(data);
          if(data.length==0){
            //this.imahe = "http://localhost/dbhandler/uploads/"+ 'default_pic.jpg' ;
            console.log('hahahah');
          }
          else{
          this.image = data ;
          console.log('suod cya h');
          }
        }
        
      });
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getimages();
      refresher.complete();
    }, 2000);
  }

}
