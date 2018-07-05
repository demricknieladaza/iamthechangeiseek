import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, LoadingController } from 'ionic-angular';

import { DatePipe } from '@angular/common';

import { NativeAudio } from '@ionic-native/native-audio';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';

@IonicPage()
@Component({
  selector: 'page-music',
  templateUrl: 'music.html',
})
export class MusicPage {
  is_playing: boolean = false;
  is_in_play: boolean = false;
  is_ready: boolean = true;

  constructor(private streamingMedia: StreamingMedia){
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

  startVideo(){
    
  }
}
