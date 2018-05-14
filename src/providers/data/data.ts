import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Data {

  constructor(public http: Http, public storage: Storage) {
    
  }

  getUData() {
    return this.storage.get('UserData');  
  }

  saveUData(data){
    let newData = JSON.stringify(data);
    console.log(newData);
    this.storage.set('UserData', newData);
  }

  clearData(){
    this.storage.clear();
  }

}
