import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, PopoverController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { DetailPage } from '../detail/detail';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { EditContactPage } from '../edit-contact/edit-contact';
import { ContactServicesProvider } from '../../providers/contact-services/contact-services';

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
	url = "http://cmma.agence360.ma/stillsf/public/"
	offset = 1
	contacts = []
	mostViewed: any = []
	total: any
	inputSearch = ""
	searchOn:any
	inputType = "text"
	contactType: string = null
	showSearchByType: any = false
	
	category:any = null
    categories: any
    categories_2: any
    categories_3: any
    categories_4: any
	categories_5: any

	cv_1:any
    cv_2:any
    cv_3:any
    cv_4:any
    cv_5:any
	
	role:any
	reset_search:any=true
	selectToMove = false
	contacts_to_move:any = []
	max_selected : any = false
	
	constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http, private socialSharing: SocialSharing, private callNumber: CallNumber, private storage: Storage, public popoverCtrl: PopoverController, private toastCtrl: ToastController, private cp: ContactServicesProvider) {
		console.log(this.searchOn)
		console.log('ContactServicesProvider.url', this.cp.url)
		if(this.navParams.data.fromCategory == true){
			console.log(this.navParams.data)
			this.categories = this.navParams.data.categories_1
			for (let index = 2; index <= 5; index++) {
				console.log('categories_'+index)
				this['categories_' + index] = this.navParams.data['categories_' + index]
			}
			for (let index = 1; index <= 5; index++) {
				console.log('categories_'+index)
				this['cv_' + index] = this.navParams.data['cv_' + index]
				if(this.navParams.data['cv_' + index] == null || index == 5){
					this.category = this.navParams.data['cv_' + (index-1)]
					this.searchBy(this.searchOn, this.inputSearch, 1)
					break
				}
			}
		}else{
		this.getCategories()
		this.getMostViewed()
		// this.searchBy(this.searchOn, this.inputSearch, 1)
		}
	}


	ionViewDidLoad() {
        
	}

	ionViewDidEnter(){
		console.log('ionViewDidEnter')
		this.getMostViewed()
	}

	ionViewCanEnter(){
		//Runs before the view can enter. This can be used as a sort of "guard" in authenticated views where you need to check permissions before the view can enter
		this.storage.get('user').then((user) => {
            this.role = user.roles
            console.log('Role: ', user.roles)
        })
	}

	resetSearch(){
		this.reset_search = true
		this.selectToMove = false
		this.searchOn = null
		this.inputSearch = ""
		console.log(this.reset_search)
		this.category = null
		for (let index = 1; index <= 5; index++) {
			console.log('categories_'+index)
			this['categories_' + index] = null
		}
		this.getMostViewed()
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
			this.reset_search = false
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
        this.http.get(this.cp.url+'category/').map(res => res.json()).subscribe(
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
		
		console.log('getCategoriesByLvl', parent, lvl)
		this.offset = 1
        this.http.get(this.cp.url+'category/'+parent+'/'+lvl).map(res => res.json()).subscribe(
            data => {
                if(data.categories.length > 0){
                    console.log('Categories: ', lvl, data)
                    this['categories_' + lvl] = data.categories
                }
            },
            err => {
                console.log("Oops!", err)
            }
        )
    }

	onChange(parent, lvl){
		console.log('onChange', parent, lvl)
        this.reset(lvl)
		this.category = parent
		this.offset = 1
		this.reset_search = false
		this.getCategoriesByLvl(parent, lvl)
		if(lvl == 6){
			this.showSearchByType = true
		}else{
			this.showSearchByType = false
		}
		if(this.selectToMove == false){
			this.searchBy(this.searchOn, this.inputSearch, 1)
		}
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
            this['cv_' + index] = null
        }
    }

	radioChecked(value, type) {
		this.inputType = type
		this.offset = 1
		this.reset_search = false
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
		this.http.post(this.cp.url + 'contact/searchcontact/' + this.searchOn + '/' + offset, {
			"value": this.inputSearch,
			"category_id" : this.category,
			"type" : this.contactType
		}).map(res => res.json()).subscribe(
			data => {
				if (offset == 1) {
					if(this.searchOn == 'triangle'){
						this.contacts = data
						this.total = 0
						this.contacts.forEach((e) => {
							e['checked'] = false
						})
					}else{
						this.contacts = data.contacts
						this.total = data.total
						this.contacts.forEach((e) => {
							e['checked'] = false
						})
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
		this.setMostViewed(contact)
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

	setMostViewed(contact){
		let mostViewed = []
		let alreadyExist = false
		this.storage.get('mostViewed').then((val) => {
			if(val == null){
				mostViewed.concat({'index': 1, 'contact': contact})
			}else{
				mostViewed = val
				mostViewed.forEach(e => {
					if(e.contact.id == contact.id){
						e.index = e.index + 1
						alreadyExist = true
					}
				});
				if(alreadyExist == false){
					mostViewed.push({'index': 1, 'contact': contact})
				}
			}
			this.mostViewed = mostViewed
			this.storage.set('mostViewed', mostViewed)
			console.log('mostViewed val',mostViewed)
		})
		// console.log('mostViewed',this.storage.get('mostViewed'))
		// this.storage.remove('mostViewed')
	}

	getMostViewed(){
		this.storage.get('mostViewed').then((val) => {
			console.log('getMostViewed', val)
			if(val == null){
				this.mostViewed = []
				this.reset_search = false
				this.searchOn = "name"
				this.searchBy(this.searchOn, this.inputSearch, 1)
				return false
			}
			this.mostViewed = []
			this.mostViewed = val
			this.mostViewed.sort(function(a,b) {return (a.index < b.index) ? 1 : ((b.index < a.index) ? -1 : 0);} ); 
		})
	}
	
	selectMember(item){			
		if (item.checked == true) {
			this.contacts_to_move.push(item);
			if(this.contacts_to_move.length == 5){
				this.max_selected = true
			}
		} else {
			let newArray = this.contacts_to_move.filter(function(el) {
				return el.id !== item.id;
			});
			this.contacts_to_move = newArray;
			this.max_selected = false
		}
		console.log('contacts_to_move', this.contacts_to_move);	 
	}

	moveContact(){
		let array = []
		this.contacts_to_move.forEach(e => {
			array.push(e.id)
		});
		console.log('moveContact', array)

		this.http.post(this.cp.url + 'contact/move/'+this.category, array).map(res => res.json()).subscribe(
			data => {
				console.log('moveContact response:', data)
				if(data.message == true){
					this.selectToMove = false
					this.contacts.filter(function(el) {
						return array.indexOf(el.id) == -1
					})
				}
			},
			err => {
				console.log("Oops!", err)
			}
		)
	}

	active(){
		this.selectToMove = true
	}

	saveSearch(){
		console.log('saveSearch')
	}
}
