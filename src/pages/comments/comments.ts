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

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
	public variable = false;
	private baseURI : string  = "http://creativeoutsourcesolutions.com/myapphandler/";
	public imginfo:any;
	public userinfo:any;
	public comments:any;
	public imgurl:any;
  constructor(public toastCtrl: ToastController, public dataService: Data, public http : Http, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  	this.dataService.getUData().then((UserData) => {
      if(UserData){
        this.userinfo = JSON.parse(UserData);
        this.imginfo = this.navParams.data;
        if(this.imginfo.type == 'w'){
        	this.imgurl = 'http://creativeoutsourcesolutions.com/appAdmin/uploads/wod/'+ this.imginfo.info.image;
        }
        else{
        	this.imgurl = 'http://creativeoutsourcesolutions.com/appAdmin/uploads/qod/'+ this.imginfo.info.image;
        }
  		console.log(this.imginfo.info);
        this.getComments();

      }
      else{
      }
    });
    
  	
  }
  getComments(){
  	if(this.imginfo.type == 'w'){
		this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getcomments&iid=" + this.imginfo.info['id'])
	    .map(res => res.json())
	    .subscribe(data => 
	    {
	      if(data){
	        if(data.length==0){
	          //this.imahe = "http://localhost/dbhandler/uploads/"+ 'default_pic.jpg' ;
	          console.log('hahahah');
	        }
	        else{
	        	this.comments = data;
	        	console.log(this.comments);
	        // this.image = data ;
	        }
	      }
	      
	    });
  	}
  	else{
  		this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getcommentsq&iid=" + this.imginfo.info['id'])
	    .map(res => res.json())
	    .subscribe(data => 
	    {
	      if(data){
	        if(data.length==0){
	          //this.imahe = "http://localhost/dbhandler/uploads/"+ 'default_pic.jpg' ;
	          console.log('hahahah');
	        }
	        else{
	        	this.comments = data;
	        	console.log(this.comments);
	        // this.image = data ;
	        }
	      }
	      
	    });
  	}
  	
  }
  sendNotification(message)  : void
   {
      let notification = this.toastCtrl.create({
          message       : message,
          duration      : 3000
      });
      notification.present();
   }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
  }
  goBack(){
  	window.history.back();
  }
  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
      });
    } // end if
  }
  ionViewDidLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
      });
    } // end if
  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
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
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Comment',
          handler: data => {
            console.log(data['comment']);
            if(data['comment'] === ""){
              this.sendNotification('Input a comment!');
            }
            else{
              this.uploadComment(data['comment']);
            }
          }
        }
      ]
    });
    prompt.present();
  }
  uploadComment(inf){
  	if(this.imginfo.type == 'w'){
  		let body     : string   = "?key=comment&image_id="+ this.imginfo.info['id'] + "&uid=" + this.userinfo['id'] + "&comment=" + inf + "&uname=" + this.userinfo['uname'],
        type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers  : any      = new Headers({ 'Content-Type': type}),
        options  : any      = new RequestOptions({ headers: headers }),
        url      : any      = this.baseURI + "manage-data.php" + body;
        console.log(url);
      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         if(data.status === 200)
         {
          // this.mylikes.push(asd);
          this.getComments();
         }
         else
         {
          // this.sendNotification('Something went wrong!');
         }
      });
  	}
  	else{
  		let body     : string   = "?key=commentq&image_id="+ this.imginfo.info['id'] + "&uid=" + this.userinfo['id'] + "&comment=" + inf + "&uname=" + this.userinfo['uname'],
        type     : string   = "application/x-www-form-urlencoded; charset=UTF-8",
        headers  : any      = new Headers({ 'Content-Type': type}),
        options  : any      = new RequestOptions({ headers: headers }),
        url      : any      = this.baseURI + "manage-data.php" + body;
        console.log(url);
      this.http.post(url, body, options)
      .subscribe((data) =>
      {
         if(data.status === 200)
         {
          // this.mylikes.push(asd);
          this.getComments();
         }
         else
         {
          // this.sendNotification('Something went wrong!');
         }
      });
  	}
  	
  }
}
