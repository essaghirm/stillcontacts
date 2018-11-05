import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailPage } from '../detail/detail';

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
  loading: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiagnosticPage');
  }
  onChange(){
    this.presentLoading()
    this.http.get(this.url+'/diagnostic/'+this.type).map(res => res.json()).subscribe(
      data => {
          console.log('onChange: ', data)
          this.contacts = data
          this.loadingDismiss()
      },
      err => {
          console.log("Oops!")
      }
  )
  }

  details(contact) {
		// this.setMostViewed(contact)
		this.navCtrl.push(DetailPage, {
			contact: contact
		})
  }
  
  presentLoading() {
    this.loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

    this.loading.present();

    setTimeout(() => {
        this.loading.dismiss();
    }, 300000);
}

loadingDismiss() {
    this.loading.dismiss()
}

}
