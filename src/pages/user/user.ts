import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Data } from '../../providers/data/data';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Observable } from 'rxjs/Observable';

import { NativeAudio } from '@ionic-native/native-audio';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
    public userinfo = [];
    public lastwod = [];
    public lastqod = [];
    public quotes = [];
    public initials:any;
    public imgsrc = "http://creativeoutsourcesolutions.com/appAdmin/uploads/wod/";
    public imgsrcq = "http://creativeoutsourcesolutions.com/appAdmin/uploads/qod/";
    public form : FormGroup;
    public hideForm : boolean = false;
    private baseURI  : string  = "http://creativeoutsourcesolutions.com/myapphandler/";
    public base64Image:string;
    public imageFileName:any;
    is_playing: boolean = false;
    is_in_play: boolean = false;
    is_ready: boolean = true;
  constructor(
    public dataService: Data,
    private camera: Camera,
    public alertCtrl : AlertController,
    public toastCtrl  : ToastController,
    public http : Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb : FormBuilder,
    public appCtrl : App,
    private streamingMedia: StreamingMedia)
  {
    this.dataService.getUData().then((UserData) => {
      if(UserData){
        this.userinfo = JSON.parse(UserData);
        this.initials = this.userinfo['fname'].charAt(0);
      }
      else{

      }
    });
    this.form = fb.group({
       "uname"                  : ["", Validators.required],
       "fname"                  : ["", Validators.required],
       "lname"                  : ["", Validators.required],
       "email"                  : ["", Validators.required]
    });
    this.getlastwod();
    this.getlastqod();
    this.getlastquote();
  }
  updateUser(){
    let uname   : string = this.form.controls["uname"].value,
        fname   : string = this.form.controls["fname"].value,
        email   : string = this.form.controls["email"].value,
        lname   : string = this.form.controls["lname"].value;

    this.doUpdate(uname, fname, lname, email);
  }
  doUpdate(nuname, nfname, nlname, nemail){
    let body     : string   = "?key=updateuser&fname=" + nfname + "&lname=" + nlname + "&uname=" + nuname + "&email=" + nemail + "&id=" + this.userinfo['id'],
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
            let userinf = {
                  id : this.userinfo['id'],
                  fname : nfname,
                  lname : nlname,
                  uname : nuname,
                  email : nemail,
                };
                this.dataService.saveUData(userinf);
                this.navCtrl.setRoot('UserPage');
         }
         // Otherwise let 'em know anyway
         else
         {
            this.sendNotification('Something went wrong!');
         }
      });

    }
    sendNotification(message)  : void
     {
        let notification = this.toastCtrl.create({
            message       : message,
            duration      : 3000
        });
        notification.present();
     }

  takephoto(){
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
   }
   opengallery(){
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
   }
   uploadimg(){
     // let url = "http://creativeoutsourcesolutions.com/myapphandler/json.php";
     // let postData = new FormData();
     // postData.append('file', this.base64Image);
     // let data:Observable<any> = this.http.post(url, postData);
     // data.subscribe((result) => {
     //   console.log(result);
     // })
     this.sendNotification('This action is not yet available!');
   }
   logout(){
    this.dataService.clearData();
    this.navCtrl.setRoot('LoginPage');
  }

   getlastquote() {
     this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getquote")
       .map(res => res.json())
       .subscribe(data => 
       {
         if(data){
           console.log(data);
           this.quotes = data;
         }
         
       });
   }

   getlastwod() {
     this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getlastimage")
       .map(res => res.json())
       .subscribe(data => 
       {
         if(data){
           console.log(data['image']);
           this.lastwod = data;
         }
         
       });
   }

   getlastqod() {
     this.http.get("http://creativeoutsourcesolutions.com/myapphandler/retrieve-data.php?key=getlastimageq")
       .map(res => res.json())
       .subscribe(data => 
       {
         if(data){
           console.log(data['image']);
           this.lastqod = data;
         }
         
       });
   }

   openwod() {
     // this.navCtrl.push('CommentsPage',{ info:this.lastwod, type:'w' });
     this.navCtrl.push('Tab1Page');
   }

   openqod() {
     // this.navCtrl.push('CommentsPage',{ info:this.lastqod, type:'q' });
     this.navCtrl.push('Tab2Page');
   }

   opennature () {
     this.navCtrl.setRoot('MusicPage');
   }

   startAudio() {
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Finished Audio') },
      errorCallback: (e) => { console.log('Error: ', e) },
      initFullscreen: false // iOS only!
    };
 
    //http://soundbible.com/2196-Baby-Music-Box.html
    this.streamingMedia.playAudio('http://www.orangefreesounds.com/wp-content/uploads/2017/04/Singing-bowls-and-birds-chirping-sleep-music.mp3', options);
    this.is_ready = true;
    this.is_playing = true;
  }
  stopAudio() {
    this.streamingMedia.stopAudio();
    this.is_playing = false;
  }
  natures() {
    this.navCtrl.setRoot('NaturePage');
  }
  startVideo() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Finished Video') },
      errorCallback: (e) => { console.log('Error: ', e) },
      orientation: 'portrait'
    };
 
    // http://www.sample-videos.com/
    this.streamingMedia.playVideo('http://creativeoutsourcesolutions.com/appimages/videos/nature.mp4', options);
  }

  startVideoq() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Finished Video') },
      errorCallback: (e) => { console.log('Error: ', e) },
      orientation: 'portrait'
    };
 
    // http://www.sample-videos.com/
    this.streamingMedia.playVideo('http://creativeoutsourcesolutions.com/appimages/videos/intro.mp4', options);
  }

 }
