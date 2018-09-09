import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { ActionSheetController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Clipboard } from '@ionic-native/clipboard';

import { EditInfoPage } from '../edit-info/edit-info';
import { AddRelationPage } from '../add-relation/add-relation';
import { EditContactPage } from '../edit-contact/edit-contact';

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
  canAddContact = false
  canAddCompany = false
  canDeleteCompany = false
  canDeleteContact = false
  // url = "http://still.agence360.ma/?"
  url = "http://localhost:8000"
  lvl = 0

  loading: any
  constructor(private alertCtrl: AlertController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http, private socialSharing: SocialSharing, private callNumber: CallNumber, public actionSheetCtrl: ActionSheetController, private clipboard: Clipboard, private toastCtrl: ToastController, public popoverCtrl: PopoverController) {
    this.contact = this.navParams.data.contact
    this.lvl = this.navParams.data.lvl
    console.log(this.navParams.data, this.navParams.data.contact)
    // this.getRelations()
    this.getDetails()
  }


  checkCanAddRelation(){
    if(this.relations != null){
      if((this.contact.type == 'contact' && this.relations.contacts.length < 5) || (this.contact.type == 'company'))
      {
        this.canAddContact= true
      }else{
        this.canAddContact = false
      }

      if((this.contact.type == 'contact' && this.relations.companies.length < 5) || (this.contact.type == 'company' && this.relations.companies.length < 10)){
        this.canAddCompany = true
      }else{
        this.canAddCompany = false
      }
    }else{
      this.canAddCompany = true
      this.canAddContact = true
    }

    

    console.log("canAddCompany", this.relations.companies.length, this.canAddCompany)
    console.log("canAddContact", this.relations.contacts.length, this.canAddContact)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  // ionViewDidEnter(){
  //   console.log("ionViewDidEnter")
  //   this.getDetails()
  // }

  allowDelete(type){
    if(type == 'contact'){
      console.log(type, this.canDeleteContact == false ? true : false)
      this.canDeleteContact = this.canDeleteContact == false ? true : false
    }
    if(type == 'company'){
      console.log(type, this.canDeleteCompany == false ? true : false)
      this.canDeleteCompany = this.canDeleteCompany == false ? true : false
    }
  }

  getRelations() {
    this.http.get(this.url + 'action=getrelations&idcontact=' + this.contact.IdContact).map(res => res.json()).subscribe(
      data => {
        this.relations = data
        this.rel_contacts = data.contacts
        this.rel_companies = data.companies
        console.log('cont', this.rel_contacts.length, this.rel_contacts)
        console.log('comp', this.rel_companies.length, this.rel_companies)
        console.log('Relations :', data)
      },
      err => {
        console.log("Oops!")
      }
    )
  }

  details(contact) {
    this.navCtrl.push(DetailPage, {
      contact: contact,
      lvl: this.lvl + 1
    })
  }

  homePage() {
    this.navCtrl.push(HomePage)
  }

  getDetails() {
    this.http.get(this.url + '/contact/' + this.contact.id).map(res => res.json()).subscribe(
      data => {
        console.log('Details :', data, typeof(data.relations))
        this.contact = data.contact
        this.categories = data.categories
        this.relations = data.relations
        this.checkCanAddRelation()
      },
      err => {
        console.log("Oops!")
      }
    )
  }

  call(number) {
    console.log("call")

    this.callNumber.callNumber(number, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  whatsapp(number) {

    this.socialSharing.shareViaWhatsAppToReceiver(number, '', '', '').then(() => {
      // Success!
      console.log("whatsapp OK")
    }).catch(() => {
      // Error!
      console.log("error via whatsapp")
    });
  }

  sms(number) {
    this.socialSharing.shareViaSMS('', number).then(() => {
      // Success!
      console.log("SMS OK")
    }).catch(() => {
      // Error!
      console.log("error via SMS")
    });
  }

  mail(email) {

    // Share via email
    this.socialSharing.shareViaEmail('', '', [email]).then(() => {
      // Success!
      console.log("mail OK")
    }).catch(() => {
      // Error!
      console.log("error via Email")
    });
  }

  copy(value) {
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
      if (type === "Address" || type === "WebSite" || type === "Fax") {
        return false
      } else {
        actionSheet.present()
      }

    }, 200)

  }

  editInfo(info, contact_id) {
    let popover = this.popoverCtrl.create(EditInfoPage, { info: info, contact_id: contact_id });
    popover.present({
    });
  }

  addRelation(type, contact) {
    this.loading = this.popoverCtrl.create(AddRelationPage, { type: type, contact: contact });
    this.loading.present({
    });
  }

  close() {
    this.viewCtrl.dismiss();
  }

  editContact(contact) {
    let popover = this.popoverCtrl.create(EditContactPage, { contact: contact }, { 'cssClass': 'edit-contact' });
    popover.present({
    });
  }

  deleteRelation(friend_id) {
		let alert = this.alertCtrl.create({
			title: 'Confirmeation',
			message: 'Voulez-vous vraiment supprimer la relation ?',
			buttons: [
				{
					text: 'Anuller',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Oui je veux',
					handler: () => {
						this.http.delete('http://localhost:8000/contact/relation/' + this.contact.id + '/' + friend_id).map(res => res.json()).subscribe(
							data => {
								console.log(data)
								this.navCtrl.push(DetailPage, {
									contact: data.contact,
									lvl: 0
								})
							},
							err => {
								console.log("Oops!")
							}
						)
					}
				}
			]
		});
		alert.present();
	}


}
