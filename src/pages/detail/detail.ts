import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { ActionSheetController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Clipboard } from '@ionic-native/clipboard';
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

	contact: any
  infos: any
  relations: any
  rel_contacts: any
  rel_companies: any
  categories: any
  url = "http://still.agence360.ma/?"
  lvl = 0
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private socialSharing: SocialSharing, private callNumber: CallNumber, public actionSheetCtrl: ActionSheetController, private clipboard: Clipboard, private toastCtrl: ToastController) {
    this.contact = this.navParams.data.contact
    this.lvl = this.navParams.data.lvl
  	console.log(this.navParams.data, this.navParams.data.contact)
    this.getRelations()
    this.getCategories()
    
    setTimeout(() => {
    }, 5000)
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  getRelations(){
    this.http.get(this.url+'action=getrelations&idcontact='+this.contact.IdContact).map(res => res.json()).subscribe(
      data => {
        this.relations = data
        this.rel_contacts = data.contacts
        this.rel_companies = data.companies
        console.log('cont',this.rel_contacts.length, this.rel_contacts)
        console.log('comp', this.rel_companies.length, this.rel_companies)
        console.log('Relations :', data)
      },
      err => {
        console.log("Oops!")
      }
    )
  }

  details(contact){
    this.navCtrl.push(DetailPage, {
      contact: contact,
      lvl: this.lvl + 1
    })
  }

  homePage(){
    this.navCtrl.push(HomePage)
  }

  getCategories(){
    this.http.get(this.url+'action=getcategories&idcontact='+this.contact.IdContact).map(res => res.json()).subscribe(
      data => {
        this.categories = data
        console.log('Categories :', data)
      },
      err => {
        console.log("Oops!")
      }
    )
  }

  call(number){
    console.log("call")

    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  whatsapp(number){

    this.socialSharing.shareViaWhatsAppToReceiver(number, '', '', '').then(() => {
      // Success!
      console.log("whatsapp OK")
    }).catch(() => {
      // Error!
      console.log("error via whatsapp")
    });
  }

  sms(number){
    this.socialSharing.shareViaSMS('', number).then(() => {
      // Success!
      console.log("SMS OK")
    }).catch(() => {
      // Error!
      console.log("error via SMS")
    });
  }

  mail(email){
    
    // Share via email
    this.socialSharing.shareViaEmail('', '', [email]).then(() => {
      // Success!
      console.log("mail OK")
    }).catch(() => {
      // Error!
      console.log("error via Email")
    });
  }

  copy(value){
      let toast = this.toastCtrl.create({
        message: 'Information copié',
        duration: 1500,
        position: 'bottom'
      });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    this.clipboard.copy(value);


    toast.present();
  }

  presentActionSheet(value, type) {
    console.log(type, value)
    let buttons = []
    

    switch (type) {
      case "LandLine":
        buttons = buttons.concat([
                    {
                      text: 'Appel',
                      icon: 'ios-call',
                      cssClass: 'call',
                      handler: () => {
                        this.call(value)
                        console.log('Appel clicked');
                      }
                    },
                    {
                      text: 'Copie',
                      icon: 'md-copy',
                      cssClass: 'copy',
                      handler: () => {
                        this.copy(value)
                        console.log('Copie clicked');
                      }
                    }

                ])
        break;

      case "Email":
        buttons = buttons.concat([
                    {
                      text: 'Email',
                      icon: 'ios-mail',
                      cssClass: 'email',
                      handler: () => {
                        this.mail(value)
                        console.log('Email clicked');
                      }
                    },
                    {
                      text: 'Copie',
                      icon: 'md-copy',
                      cssClass: 'copy',
                      handler: () => {
                        this.copy(value)
                        console.log('Copie clicked');
                      }
                    }

                ])
        break;

      case "Mobile":
      buttons = buttons.concat([
                {
                    text: 'Appel',
                    icon: 'ios-call',
                      cssClass: 'call',
                    handler: () => {
                      this.call(value)
                      console.log('Call clicked');
                    }
                  },
                  {
                    text: 'SMS',
                    icon: 'ios-chatboxes-outline',
                      cssClass: 'sms',
                    handler: () => {
                      this.sms(value)
                      console.log('SMS clicked');
                    }
                  },
                  {
                    text: 'Whatsapp',
                    icon: 'logo-whatsapp',
                      cssClass: 'whatsapp',
                    handler: () => {
                      this.whatsapp(value)
                      console.log('Whatsapp clicked');
                    }
                  },
                  {
                    text: 'Copie',
                    icon: 'md-copy',
                      cssClass: 'copy',
                    handler: () => {
                      this.copy(value)
                      console.log('Copie clicked');
                    }
                  }
                 ])
        break;
    }

    setTimeout(() => {
       const actionSheet = this.actionSheetCtrl.create({
        // title: 'Modify your album',
        buttons: buttons
      });
      if(type === "Address" || type === "WebSite" || type === "Fax"){
        return false
      }else{
        actionSheet.present()
      }
      
    }, 200)
    
  }

}
