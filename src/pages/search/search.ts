import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { DetailPage } from '../detail/detail';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { EditContactPage } from '../edit-contact/edit-contact';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-search',
	templateUrl: 'search.html',
})
export class SearchPage {
	url = "http://127.0.0.1:8000/"
	offset = 1
	contacts = []
	total: any
	inputSearch = ""
	searchOn = "name"
	inputType = "text"
	contactType: string = null
	showSearchByType: any = false
	
	category:any = null
    categories: any
    categories_2: any
    categories_3: any
    categories_4: any
	categories_5: any
	
	role:any
	
	constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http, private socialSharing: SocialSharing, private callNumber: CallNumber, private storage: Storage, public popoverCtrl: PopoverController) {
		this.getCategories()
		console.log(this.searchOn)
		this.searchBy(this.searchOn, this.inputSearch, 1)

	}


	ionViewDidLoad() {
        this.storage.get('user').then((user) => {
            this.role = user.roles
            console.log('Role: ', user.roles)
        })
	}
	
	addNewContact() {
        let popover = this.popoverCtrl.create(EditContactPage, { contact: null }, { 'cssClass': 'edit-contact' });
        popover.present({
        });
    }

	onInput(e) {
		// console.log(e)
		console.log(this.inputSearch, this.inputSearch.length)
		this.offset = 1
		if(this.inputSearch.length >= 3){
			this.searchBy(this.searchOn, this.inputSearch, 1)
		}
	}

	doInfinite(infiniteScroll) {
		console.log('Begin async operation');

		setTimeout(() => {
			this.offset = this.offset + 1
			this.searchBy(this.searchOn, this.inputSearch, this.offset)

			console.log('Async operation has ended');
			infiniteScroll.complete();
		}, 500);
	}

	getCategories() {
        console.log('func - getCategories')
        this.http.get(this.url+'category/').map(res => res.json()).subscribe(
            data => {
                if(data.length > 0){
                    console.log('Result: ', data)
                    this.categories = data
                }
            },
            err => {
                console.log("Oops!")
            }
        )
	}
	
	getCategoriesByLvl(parent, lvl) {
		this.offset = 1
        this.http.get(this.url+'category/'+parent+'/'+lvl).map(res => res.json()).subscribe(
            data => {
                if(data.length > 0){
                    console.log('Categories: ', lvl, data)
                    this['categories_' + lvl] = data
                }
            },
            err => {
                console.log("Oops!")
            }
        )
    }

	onChange(parent, lvl){
        this.reset(lvl)
		this.category = parent
		this.offset = 1
		this.getCategoriesByLvl(parent, lvl)
		if(lvl == 6){
			this.showSearchByType = true
		}else{
			this.showSearchByType = false
		}
		this.searchBy(this.searchOn, this.inputSearch, 1)
	}

	changeContactType(type){
		this.offset = 1
		this.contactType = type
		this.searchBy(this.searchOn, this.inputSearch, 1)
	}
	
	reset(lvl){
        this.category = null
        for (let index = lvl; index <= 5; index++) {
            this['categories_' + index] = null
        }
    }

	radioChecked(value, type) {
		this.inputType = type
		this.offset = 1
		this.contacts = []
		this.searchBy(this.searchOn, this.inputSearch, 1)
		console.log(value, type)
	}

	searchBy(by, value, offset) {
		console.log('searchBy', this.searchOn, this.category, this.inputSearch)
		if(this.searchOn == 'triangle' && this.inputSearch.length < 5){
			this.total = 0
			return false
		}else if(this.searchOn == 'triangle' && this.inputSearch.length >= 5){
			offset = 1
		}
		this.http.post(this.url + 'contact/searchcontact/' + this.searchOn + '/' + offset, {
			"value": this.inputSearch,
			"category_id" : this.category,
			"type" : this.contactType
		}).map(res => res.json()).subscribe(
			data => {
				if (offset == 1) {
					if(this.searchOn == 'triangle'){
						this.contacts = data
						this.total = 0
					}else{
						this.contacts = data.contacts
						this.total = data.total
					}
					
				} else {
					this.contacts = this.contacts.concat(data.contacts)
				}

				console.log('Result: ', this.contacts)
			},
			err => {
				console.log("Oops!")
			}
		)
	}

	details(contact) {
		this.navCtrl.push(DetailPage, {
			contact: contact
		})
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

	_deleteContact(id) {
		this.http.delete('http://localhost:8000/contact/' + id).map(res => res.json()).subscribe(
			data => {
				console.log(data)
				this.navCtrl.setRoot(HomePage)
			},
			err => {
				console.log("Oops!")
			}
		)
	}

	deleteContact(id) {
		let alert = this.alertCtrl.create({
			title: 'Confirmeation',
			message: 'Voulez-vous vraiment supprimer cet contact?',
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
						this.http.delete('http://localhost:8000/contact/' + id).map(res => res.json()).subscribe(
							data => {
								console.log(data)
								this.navCtrl.setRoot(HomePage)
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
