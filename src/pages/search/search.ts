import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { DetailPage } from '../detail/detail';
import { HomePage } from '../home/home';

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
	
	constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public http: Http, private socialSharing: SocialSharing, private callNumber: CallNumber) {
		// this.contacts = [{"IdContact":"512","CategoryId":"4","ContactType":"Entreprise","LastName":"ABCD Group","FirstName":null,"WebSite":"www.abcd-group.eu","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:00","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"1008","ContactId":"512","InfoType":"Address","InfoLabel":"Officiel","InfoValue":"Advances building construction & design 1, rue du Corail - 20050 Casablanca","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1009","ContactId":"512","InfoType":"Address","InfoLabel":"Siége france","InfoValue":"1 rue du Corail - Angle rue Degui Casablanca Maroc code postal 20170 France","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1010","ContactId":"512","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 522 947 727","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1011","ContactId":"512","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 522 941 994","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"LandLine":"(+212) 522 941 994"},{"IdContact":"1280","CategoryId":"5","ContactType":"Entreprise","LastName":"Rapibat","FirstName":null,"WebSite":null,"City":"Rabat","Notes":"recommandé par frére echchorfi, travail avec cgi","AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:00","SysCreated":"2018-04-29 00:43:02","infos":[{"IdInfoContact":"2653","ContactId":"1280","InfoType":"Address","InfoLabel":"Siége","InfoValue":"227 Hay Nahda II Extension 3 -Rabat","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}]},{"IdContact":"1792","CategoryId":"6","ContactType":"Entreprise","LastName":"Backyard Adventures","FirstName":null,"WebSite":"www.backyardadventures.com","City":"Europe","Notes":"jeux enfants","AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:01","SysCreated":"2018-04-29 00:43:02","infos":[{"IdInfoContact":"3725","ContactId":"1792","InfoType":"Address","InfoLabel":"Siége","InfoValue":"Siége","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}]},{"IdContact":"3328","CategoryId":"3","ContactType":"Entreprise","LastName":"Aocm","FirstName":null,"WebSite":"www.apn.fr","City":"Bouskoura","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:04","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"6439","ContactId":"3328","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 522 320 977","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"6440","ContactId":"3328","InfoType":"Address","InfoLabel":"Siége","InfoValue":"Zone Industrielle Ouled Saleh, N°1320, BP317, 20180 Bouskoura","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"LandLine":"(+212) 522 320 977"},{"IdContact":"1","CategoryId":"5","ContactType":"Entreprise","LastName":"CIM Maroc","FirstName":null,"WebSite":"www.cim.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"1","ContactId":"1","InfoType":"Address","InfoLabel":"Siége","InfoValue":"45, bd Gandhi, résid. Yasmine - magasin 12","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"2","ContactId":"1","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 522 943 130","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"LandLine":"(+212) 522 943 130"},{"IdContact":"513","CategoryId":"4","ContactType":"Entreprise","LastName":"Luseo","FirstName":null,"WebSite":"www.luseo.fr","City":"Rabat","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:00","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"1012","ContactId":"513","InfoType":"Address","InfoLabel":"Siége","InfoValue":"30, rue Aguelmane Sidi Ali - Agdal - 10090 Rabat","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1013","ContactId":"513","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 537 657 794","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1014","ContactId":"513","InfoType":"Email","InfoLabel":"Siége","InfoValue":"maroc@luseo.fr","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1015","ContactId":"513","InfoType":"Address","InfoLabel":"France","InfoValue":"1 bis . Rue Jean-Baptiste GREUZE 33166 - Saint-Médard France","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1016","ContactId":"513","InfoType":"LandLine","InfoLabel":"France","InfoValue":"(+331) 784 001 48","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1017","ContactId":"513","InfoType":"Fax","InfoLabel":"France","InfoValue":"(+331) 727 293 86","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"LandLine":"(+331) 784 001 48","Email":"maroc@luseo.fr"},{"IdContact":"1281","CategoryId":"5","ContactType":"Entreprise","LastName":"Belectrabat","FirstName":null,"WebSite":"www.belectrabat.com","City":"Rabat","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:00","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"2654","ContactId":"1281","InfoType":"Email","InfoLabel":"Siége","InfoValue":"info@belectrabat.com","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"2655","ContactId":"1281","InfoType":"Address","InfoLabel":"Siége","InfoValue":"21 rue oued al makhazine Appt N° 3 Agdal Rabat ","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"2656","ContactId":"1281","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 537 704 210","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"2657","ContactId":"1281","InfoType":"Fax","InfoLabel":"Siége","InfoValue":"(+212) 537 704 207","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"2658","ContactId":"1281","InfoType":"Address","InfoLabel":"Magazin","InfoValue":"10 Rue Omar El Jadidi N°3 Kebibat Rabat","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"Email":"info@belectrabat.com","LandLine":"(+212) 537 704 210"},{"IdContact":"1537","CategoryId":"6","ContactType":"Entreprise","LastName":"Chappee","FirstName":null,"WebSite":"www.chappee.com","City":"Rabat","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:00","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"3205","ContactId":"1537","InfoType":"Address","InfoLabel":"Siége","InfoValue":"marketing@baxifrance.com","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}]},{"IdContact":"1793","CategoryId":"5","ContactType":"Entreprise","LastName":"Kidzworld","FirstName":null,"WebSite":"www.kidzworld.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:01","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"3726","ContactId":"1793","InfoType":"Address","InfoLabel":"Siége","InfoValue":"bd du Fouarat, 6 lot. Assawab, Ain Sebaa - 20570 Casablanca","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"3727","ContactId":"1793","InfoType":"Email","InfoLabel":"Siége","InfoValue":"infos@kidzworld.ma","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"Email":"infos@kidzworld.ma"},{"IdContact":"2049","CategoryId":"5","ContactType":"Entreprise","LastName":"Meditherm","FirstName":null,"WebSite":null,"City":"Rabat","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:02","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"4206","ContactId":"2049","InfoType":"Address","InfoLabel":"Siége","InfoValue":"28, rue Ibn Rochd Salé, Rabat-Salé-Zemmour-Zaër, Maroc","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"4207","ContactId":"2049","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 537 880 622","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"LandLine":"(+212) 537 880 622"}]
		this.getCategories()
		console.log(this.searchOn)
		this.searchBy(this.searchOn, this.inputSearch, 1)

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SearchPage');
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
		this.http.post(this.url + 'contact/searchcontact/' + this.searchOn + '/' + this.offset, {
			"value": this.inputSearch,
			"category_id" : this.category,
			"type" : this.contactType
		}).map(res => res.json()).subscribe(
			data => {
				if (offset == 1) {
					this.contacts = data
					this.total = data.length
				} else {
					this.contacts = this.contacts.concat(data)
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
