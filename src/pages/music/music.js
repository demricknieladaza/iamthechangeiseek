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
import { IonicPage } from 'ionic-angular';
import { StreamingMedia } from '@ionic-native/streaming-media';
var MusicPage = /** @class */ (function () {
    function MusicPage(streamingMedia) {
        this.streamingMedia = streamingMedia;
        this.is_playing = false;
        this.is_in_play = false;
        this.is_ready = true;
    }
    MusicPage.prototype.startAudio = function () {
        var options = {
            successCallback: function () { console.log('Finished Audio'); },
            errorCallback: function (e) { console.log('Error: ', e); },
            initFullscreen: false // iOS only!
        };
        //http://soundbible.com/2196-Baby-Music-Box.html
        this.streamingMedia.playAudio('http://www.orangefreesounds.com/wp-content/uploads/2017/04/Singing-bowls-and-birds-chirping-sleep-music.mp3', options);
        this.is_ready = true;
        this.is_playing = true;
    };
    MusicPage.prototype.stopAudio = function () {
        this.streamingMedia.stopAudio();
        this.is_playing = false;
    };
    MusicPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-music',
            templateUrl: 'music.html',
        }),
        __metadata("design:paramtypes", [StreamingMedia])
    ], MusicPage);
    return MusicPage;
}());
export { MusicPage };
//# sourceMappingURL=music.js.map