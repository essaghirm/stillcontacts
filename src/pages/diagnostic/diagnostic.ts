import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the DiagnosticPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diagnostic',
  templateUrl: 'diagnostic.html',
})
export class DiagnosticPage {
  type:any
  contacts:any = []
  url = "http://localhost:8000"
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiagnosticPage');
  }
  onChange(){
    this.http.get(this.url+'/diagnostic/'+this.type).map(res => res.json()).subscribe(
      data => {
          console.log('onChange: ', data)
          this.contacts = data
      },
      err => {
          console.log("Oops!")
      }
  )
  }

}
