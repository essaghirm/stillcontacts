import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { ActionSheetController, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Clipboard } from '@ionic-native/clipboard';

import { EditInfoPage } from '../edit-info/edit-info';
import { AddRelationPage } from '../add-relation/add-relation';
import { EditContactPage } from '../edit-contact/edit-contact';
import { ContactServicesProvider } from '../../providers/contact-services/contact-services';

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

	// url = "http://localhost:8000"
	url = "http://cmma.agence360.ma/stillsf/public/"
	lvl = 0

	action:string=null
	id: number
    type: string
    fname: string
    lname: string
    web_site: string
    notes: string
    city: string
	category:any = null
	
	_categories: any
    categories_2: any
    categories_3: any
    categories_4: any
	categories_5: any
	
	fullName: string

	loading: any
	constructor(private alertCtrl: AlertController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http, private socialSharing: SocialSharing, private callNumber: CallNumber, public actionSheetCtrl: ActionSheetController, private clipboard: Clipboard, private toastCtrl: ToastController, public popoverCtrl: PopoverController, private camera: Camera, public loadingCtrl: LoadingController, private cp: ContactServicesProvider) {
		this.contact = this.navParams.data.contact
		if(this.contact == 0){
			this.action = 'add'
		}else{
			this.lvl = this.navParams.data.lvl
			console.log(this.navParams.data, this.navParams.data.contact)
			this.getDetails()
			this.fullName = this.contact.fname + ' ' + this.contact.lname
		}
		this.getCategories()
		// this.contact = { "id": 1, "fname": null, "lname": "CIM Maroc", "webSite": "www.cim.ma", "city": "Casablanca", "notes": null, "type": "company", "created": { "timezone": { "name": "UTC", "transitions": [{ "ts": -9223372036854776000, "time": "-292277022657-01-27T08:29:52+0000", "offset": 0, "isdst": false, "abbr": "UTC" }], "location": { "country_code": "??", "latitude": 0, "longitude": 0, "comments": "" } }, "offset": 0, "timestamp": 1523137291 }, "infos": [{ "id": 1, "type": "Address", "label": "Siège", "value": "45, bd Gandhi, rÃ©sid. Yasmine - magasin 12", "contact": null, "status": false }, { "id": 2, "type": "LandLine", "label": "Siège", "value": "(+212) 522 943 130", "contact": null, "status": false }], "email": null, "mobile": null, "landline": null, "avatar": null }
		// this.relations = { "contacts": [{ "id": 2, "fname": "Yassine", "lname": "Gueddar", "webSite": null, "city": null, "notes": null, "type": "contact", "created": { "timezone": { "name": "UTC", "transitions": [{ "ts": -9223372036854776000, "time": "-292277022657-01-27T08:29:52+0000", "offset": 0, "isdst": false, "abbr": "UTC" }], "location": { "country_code": "??", "latitude": 0, "longitude": 0, "comments": "" } }, "offset": 0, "timestamp": 1523137199 }, "infos": [{ "id": 3, "type": "Mobile", "label": "Personnel", "value": "(+212) 661 172 561", "contact": null, "status": false }, { "id": 4, "type": "Email", "label": "Perso", "value": "y.gueddar@cim.ma", "contact": null, "status": false }], "email": null, "mobile": null, "landline": null, "__initializer__": null, "__cloner__": null, "__isInitialized__": true }], "companies": [{ "id": 102, "fname": null, "lname": "Armstong", "webSite": "www.armstrong.fr", "city": "Europe", "notes": null, "type": "company", "created": { "timezone": { "name": "UTC", "transitions": [{ "ts": -9223372036854776000, "time": "-292277022657-01-27T08:29:52+0000", "offset": 0, "isdst": false, "abbr": "UTC" }], "location": { "country_code": "??", "latitude": 0, "longitude": 0, "comments": "" } }, "offset": 0, "timestamp": 1523137291 }, "infos": [{ "id": 291, "type": "Address", "label": "Siège", "value": "SiÃ©ge", "contact": null, "status": false }], "email": null, "mobile": null, "landline": null, "__initializer__": null, "__cloner__": null, "__isInitialized__": true }, { "id": 126, "fname": null, "lname": "Eurocoustic", "webSite": "www.eurocoustic.com", "city": "Europe", "notes": null, "type": "company", "created": { "timezone": { "name": "UTC", "transitions": [{ "ts": -9223372036854776000, "time": "-292277022657-01-27T08:29:52+0000", "offset": 0, "isdst": false, "abbr": "UTC" }], "location": { "country_code": "??", "latitude": 0, "longitude": 0, "comments": "" } }, "offset": 0, "timestamp": 1523137291 }, "infos": [{ "id": 316, "type": "Address", "label": "Siège", "value": "SiÃ©ge", "contact": null, "status": false }], "email": null, "mobile": null, "landline": null, "__initializer__": null, "__cloner__": null, "__isInitialized__": true }, { "id": 131, "fname": null, "lname": "Gerflex", "webSite": "www.gerflor.fr", "city": "Europe", "notes": "Geflex", "type": "company", "created": { "timezone": { "name": "UTC", "transitions": [{ "ts": -9223372036854776000, "time": "-292277022657-01-27T08:29:52+0000", "offset": 0, "isdst": false, "abbr": "UTC" }], "location": { "country_code": "??", "latitude": 0, "longitude": 0, "comments": "" } }, "offset": 0, "timestamp": 1524966182 }, "infos": [{ "id": 325, "type": "Address", "label": "Siège", "value": "SiÃ©ge", "contact": null, "status": false }], "email": null, "mobile": null, "landline": null, "__initializer__": null, "__cloner__": null, "__isInitialized__": true }, { "id": 145, "fname": null, "lname": "Rockfon", "webSite": "www.rockfon.fr", "city": "Europe", "notes": null, "type": "company", "created": { "timezone": { "name": "UTC", "transitions": [{ "ts": -9223372036854776000, "time": "-292277022657-01-27T08:29:52+0000", "offset": 0, "isdst": false, "abbr": "UTC" }], "location": { "country_code": "??", "latitude": 0, "longitude": 0, "comments": "" } }, "offset": 0, "timestamp": 1523137291 }, "infos": [{ "id": 349, "type": "Address", "label": "Europe", "value": "Europe", "contact": null, "status": false }], "email": null, "mobile": null, "landline": null, "__initializer__": null, "__cloner__": null, "__isInitialized__": true }, { "id": 166, "fname": null, "lname": "Lafarge", "webSite": "www.lafarge.ma", "city": "Europe", "notes": null, "type": "company", "created": { "timezone": { "name": "UTC", "transitions": [{ "ts": -9223372036854776000, "time": "-292277022657-01-27T08:29:52+0000", "offset": 0, "isdst": false, "abbr": "UTC" }], "location": { "country_code": "??", "latitude": 0, "longitude": 0, "comments": "" } }, "offset": 0, "timestamp": 1523137291 }, "infos": [{ "id": 371, "type": "Address", "label": "Europe", "value": "Europe", "contact": null, "status": false }], "email": null, "mobile": null, "landline": null, "__initializer__": null, "__cloner__": null, "__isInitialized__": true }, { "id": 167, "fname": null, "lname": "Krono", "webSite": "www.kronofrance.fr", "city": "Europe", "notes": null, "type": "company", "created": { "timezone": { "name": "UTC", "transitions": [{ "ts": -9223372036854776000, "time": "-292277022657-01-27T08:29:52+0000", "offset": 0, "isdst": false, "abbr": "UTC" }], "location": { "country_code": "??", "latitude": 0, "longitude": 0, "comments": "" } }, "offset": 0, "timestamp": 1523137291 }, "infos": [{ "id": 372, "type": "Address", "label": "Europe", "value": "Europe", "contact": null, "status": false }], "email": null, "mobile": null, "landline": null, "__initializer__": null, "__cloner__": null, "__isInitialized__": true }] }
		// this.categories = [{ "id": 5, "title": "Contractants de BTP", "lft": 1733, "rgt": 2154, "lvl": 1, "oldId": 5, "oldParent": null }, { "id": 31, "title": "CatÃ©gories gÃ©nÃ©rales", "lft": 1734, "rgt": 1789, "lvl": 2, "oldId": 25, "oldParent": null }, { "id": 137, "title": "TCE", "lft": 1735, "rgt": 1778, "lvl": 3, "oldId": 92, "oldParent": null }, { "id": 491, "title": "00.20 Travaux intégrateurs Second Å“uvre", "lft": 1742, "rgt": 1747, "lvl": 4, "oldId": 307, "oldParent": null, "__initializer__": null, "__cloner__": null, "__isInitialized__": true }, { "id": 1080, "title": "Grandes et moyennes entreprises", "lft": 1743, "rgt": 1744, "lvl": 5, "oldId": 421, "oldParent": null, "__initializer__": null, "__cloner__": null, "__isInitialized__": true }]

		
	}

	ionViewDidEnter(){
		console.log('ionViewDidEnter')
		if(this.contact == 0){
			// this.action = 'add'
		}else{
			this.getDetails()
		}
		
	}

	presentLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

		this.loading.present();

		setTimeout(() => {
			this.loading.dismiss();
		}, 150000);
	}

	loadingDismiss(){
		this.loading.dismiss()
    }

	checkCanAddRelation() {
		if (this.relations != null) {
			if ((this.contact.type == 'contact' && this.relations.contacts.length < 5) || (this.contact.type == 'company')) {
				this.canAddContact = true
			} else {
				this.canAddContact = false
			}

			if ((this.contact.type == 'contact' && this.relations.companies.length < 5) || (this.contact.type == 'company' && this.relations.companies.length < 10)) {
				this.canAddCompany = true
			} else {
				this.canAddCompany = false
			}
		} else {
			this.canAddCompany = true
			this.canAddContact = true
		}



		console.log("canAddCompany", this.relations.companies.length, this.canAddCompany)
		console.log("canAddContact", this.relations.contacts.length, this.canAddContact)
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad DetailPage');
	}

	allowDelete(type) {
		if (type == 'contact') {
			console.log(type, this.canDeleteContact == false ? true : false)
			this.canDeleteContact = this.canDeleteContact == false ? true : false
		}
		if (type == 'company') {
			console.log(type, this.canDeleteCompany == false ? true : false)
			this.canDeleteCompany = this.canDeleteCompany == false ? true : false
		}
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
		this.http.get(this.cp.url + 'contact/' + this.contact.id).map(res => res.json()).subscribe(
			data => {
				console.log('Details :', data, typeof (data.relations))
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

			case "Phone":
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
			
				
			default:
				buttons = buttons.concat([
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
				buttons: buttons
			});
			actionSheet.present()

		}, 200)

	}

	editInfo(info, contact_id) {
		this.navCtrl.push(EditInfoPage, { info: info, contact_id: contact_id })
	}

	addRelation(type, contact) {
		this.navCtrl.push(AddRelationPage, { type: type, contact: contact })
	}

	close() {
		this.viewCtrl.dismiss();
	}

	editContact(contact) {
		this.id = this.contact.id
		this.type = this.contact.type
		this.lname = this.contact.lname
		this.fname = this.contact.fname
		this.city = this.contact.city
		this.web_site = this.contact.webSite
		this.notes = this.contact.notes
		this.action = 'edit'
	}

	deleteRelation(friend_id) {
		let alert = this.alertCtrl.create({
			title: 'Confirmeation',
			message: 'Voulez-vous vraiment supprimer cette relation ?',
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
						this.presentLoading()
						this.http.delete(this.cp.url+'contact/relation/' + this.contact.id + '/' + friend_id).map(res => res.json()).subscribe(
							data => {
								console.log(data)
								this.getDetails()
								this.loadingDismiss()
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

	openCamera() {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			saveToPhotoAlbum: true,
			allowEdit: true,
			correctOrientation: true
		}

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			console.log('imageData', imageData)
			console.log('base64Image', base64Image)
			// this.contact.avatar = base64Image
			this.upload(base64Image)
		}, (err) => {
			// Handle error
			console.log('error', err)
		});
	}

	openGallery() {
		const options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			correctOrientation: true
		}

		this.camera.getPicture(options).then((imageData) => {
			// imageData is either a base64 encoded string or a file URI
			// If it's base64 (DATA_URL):
			let base64Image = 'data:image/jpeg;base64,' + imageData;
			console.log('imageData', imageData)
			console.log('base64Image', base64Image)
			// this.contact.avatar = base64Image
			this.upload(base64Image)
		}, (err) => {
			// Handle error
			console.log('error', err)
		});
	}

	upload(image) {
		this.presentLoading()
		console.log(this.cp.url + 'contact/' + this.contact.id + '/upload/avatar')
		this.http.post(
			this.cp.url + 'contact/' + this.contact.id + '/upload/avatar',
			{
				"file": image
			}
		).map(res => res.json()).subscribe(
			data => {
				console.log(data)
				if (data.message == true) {
					this.contact.avatar = data.avatar
					this.loadingDismiss()
				} else {
					console.log('upload failed')
				}
			},
			err => {
				console.log("Oops!", err)
			}
		)
	}

	saveContact(type) {
		if(type == 'add'){
			console.log('haaaaa')
			this.presentLoading()
			this.http.post(
				this.cp.url+'contact/',
				{
					"fname": this.fname,
					"lname": this.lname,
					"web_site": this.web_site,
					"city": this.city,
					"notes": this.notes,
					"type": this.type,
					"category": this.category
				}
			).map(res => res.json()).subscribe(
				data => {
					this.loadingDismiss()
					console.log('allaaa: ', data)
					this.action = null
					this.contact = data.contact
					this.getDetails()
				},
				err => {
					console.log("Oops!")
				}
			)
		}

		if(type == 'edit'){
			console.log('edit contact func')
			this.presentLoading()
			this.http.put(
				this.cp.url+'contact/'+this.contact.id,
				{
					"fname": this.fname,
					"lname": this.lname,
					"web_site": this.web_site,
					"city": this.city,
					"notes": this.notes,
					"type": this.type,
					"category": this.category
				}
			).map(res => res.json()).subscribe(
				data => {
					this.loadingDismiss()
					console.log('good: ', data)
					this.action = null
					this.getDetails()
				},
				err => {
					console.log("Oops!")
				}
			)
		}
        
	}
	
	getCategories() {
        console.log('func - getCategories')
        this.http.get(this.cp.url+'category/').map(res => res.json()).subscribe(
            data => {
                if(data.length > 0){
                    console.log('Result: ', data)
                    this._categories = data
                }
            },
            err => {
                console.log("Oops!")
            }
        )
    }

    getCategoriesByLvl(parent, lvl) {
        this.http.get(this.cp.url+'category/'+parent+'/'+lvl).map(res => res.json()).subscribe(
            data => {
                if(data.categories.length > 0){
                    console.log('Categories: ', lvl, data.categories)
                    this['categories_' + lvl] = data.categories
                }
            },
            err => {
                console.log("Oops!")
            }
        )
    }

    onChange(parent, lvl){
        this.reset(lvl)
        console.log(parent, lvl)
        if(lvl == 6){
            this.category = parent
        }
        console.log('Category choiced:', this.category)
        
        this.getCategoriesByLvl(parent, lvl)
    }

    reset(lvl){
        this.category = null
        for (let index = lvl; index <= 5; index++) {
            this['categories_' + index] = null
        }
    }
}
