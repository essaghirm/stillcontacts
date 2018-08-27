import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { DetailPage } from '../detail/detail';

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
 	url = "http://still.agence360.ma/?"
 	offset = 0
 	contacts = []
 	total: any
 	inputSearch = ""
 	searchOn = "name"
 	inputType = "text"
 	categories_lvl_1: any
 	categories_lvl_2: any
 	categories_lvl_3: any
 	categories_lvl_4: any
 	categories_lvl_5: any
 	cat_1 = -1
 	cat_2 = -1
 	cat_3 = -1
 	cat_4 = -1
 	cat_5 = -1
 	where_categories = "";
 	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private socialSharing: SocialSharing, private callNumber: CallNumber) {
 		// this.contacts = [{"IdContact":"512","CategoryId":"4","ContactType":"Entreprise","LastName":"ABCD Group","FirstName":null,"WebSite":"www.abcd-group.eu","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:00","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"1008","ContactId":"512","InfoType":"Address","InfoLabel":"Officiel","InfoValue":"Advances building construction & design 1, rue du Corail - 20050 Casablanca","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1009","ContactId":"512","InfoType":"Address","InfoLabel":"Siége france","InfoValue":"1 rue du Corail - Angle rue Degui Casablanca Maroc code postal 20170 France","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1010","ContactId":"512","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 522 947 727","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1011","ContactId":"512","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 522 941 994","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"LandLine":"(+212) 522 941 994"},{"IdContact":"1280","CategoryId":"5","ContactType":"Entreprise","LastName":"Rapibat","FirstName":null,"WebSite":null,"City":"Rabat","Notes":"recommandé par frére echchorfi, travail avec cgi","AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:00","SysCreated":"2018-04-29 00:43:02","infos":[{"IdInfoContact":"2653","ContactId":"1280","InfoType":"Address","InfoLabel":"Siége","InfoValue":"227 Hay Nahda II Extension 3 -Rabat","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}]},{"IdContact":"1792","CategoryId":"6","ContactType":"Entreprise","LastName":"Backyard Adventures","FirstName":null,"WebSite":"www.backyardadventures.com","City":"Europe","Notes":"jeux enfants","AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:01","SysCreated":"2018-04-29 00:43:02","infos":[{"IdInfoContact":"3725","ContactId":"1792","InfoType":"Address","InfoLabel":"Siége","InfoValue":"Siége","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}]},{"IdContact":"3328","CategoryId":"3","ContactType":"Entreprise","LastName":"Aocm","FirstName":null,"WebSite":"www.apn.fr","City":"Bouskoura","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:04","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"6439","ContactId":"3328","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 522 320 977","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"6440","ContactId":"3328","InfoType":"Address","InfoLabel":"Siége","InfoValue":"Zone Industrielle Ouled Saleh, N°1320, BP317, 20180 Bouskoura","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"LandLine":"(+212) 522 320 977"},{"IdContact":"1","CategoryId":"5","ContactType":"Entreprise","LastName":"CIM Maroc","FirstName":null,"WebSite":"www.cim.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"1","ContactId":"1","InfoType":"Address","InfoLabel":"Siége","InfoValue":"45, bd Gandhi, résid. Yasmine - magasin 12","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"2","ContactId":"1","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 522 943 130","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"LandLine":"(+212) 522 943 130"},{"IdContact":"513","CategoryId":"4","ContactType":"Entreprise","LastName":"Luseo","FirstName":null,"WebSite":"www.luseo.fr","City":"Rabat","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:00","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"1012","ContactId":"513","InfoType":"Address","InfoLabel":"Siége","InfoValue":"30, rue Aguelmane Sidi Ali - Agdal - 10090 Rabat","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1013","ContactId":"513","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 537 657 794","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1014","ContactId":"513","InfoType":"Email","InfoLabel":"Siége","InfoValue":"maroc@luseo.fr","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1015","ContactId":"513","InfoType":"Address","InfoLabel":"France","InfoValue":"1 bis . Rue Jean-Baptiste GREUZE 33166 - Saint-Médard France","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1016","ContactId":"513","InfoType":"LandLine","InfoLabel":"France","InfoValue":"(+331) 784 001 48","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"1017","ContactId":"513","InfoType":"Fax","InfoLabel":"France","InfoValue":"(+331) 727 293 86","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"LandLine":"(+331) 784 001 48","Email":"maroc@luseo.fr"},{"IdContact":"1281","CategoryId":"5","ContactType":"Entreprise","LastName":"Belectrabat","FirstName":null,"WebSite":"www.belectrabat.com","City":"Rabat","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:00","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"2654","ContactId":"1281","InfoType":"Email","InfoLabel":"Siége","InfoValue":"info@belectrabat.com","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"2655","ContactId":"1281","InfoType":"Address","InfoLabel":"Siége","InfoValue":"21 rue oued al makhazine Appt N° 3 Agdal Rabat ","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"2656","ContactId":"1281","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 537 704 210","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"2657","ContactId":"1281","InfoType":"Fax","InfoLabel":"Siége","InfoValue":"(+212) 537 704 207","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"2658","ContactId":"1281","InfoType":"Address","InfoLabel":"Magazin","InfoValue":"10 Rue Omar El Jadidi N°3 Kebibat Rabat","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"Email":"info@belectrabat.com","LandLine":"(+212) 537 704 210"},{"IdContact":"1537","CategoryId":"6","ContactType":"Entreprise","LastName":"Chappee","FirstName":null,"WebSite":"www.chappee.com","City":"Rabat","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:00","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"3205","ContactId":"1537","InfoType":"Address","InfoLabel":"Siége","InfoValue":"marketing@baxifrance.com","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}]},{"IdContact":"1793","CategoryId":"5","ContactType":"Entreprise","LastName":"Kidzworld","FirstName":null,"WebSite":"www.kidzworld.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:01","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"3726","ContactId":"1793","InfoType":"Address","InfoLabel":"Siége","InfoValue":"bd du Fouarat, 6 lot. Assawab, Ain Sebaa - 20570 Casablanca","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"3727","ContactId":"1793","InfoType":"Email","InfoLabel":"Siége","InfoValue":"infos@kidzworld.ma","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"Email":"infos@kidzworld.ma"},{"IdContact":"2049","CategoryId":"5","ContactType":"Entreprise","LastName":"Meditherm","FirstName":null,"WebSite":null,"City":"Rabat","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:40:02","SysCreated":"2018-04-07 20:41:31","infos":[{"IdInfoContact":"4206","ContactId":"2049","InfoType":"Address","InfoLabel":"Siége","InfoValue":"28, rue Ibn Rochd Salé, Rabat-Salé-Zemmour-Zaër, Maroc","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"},{"IdInfoContact":"4207","ContactId":"2049","InfoType":"LandLine","InfoLabel":"Siége","InfoValue":"(+212) 537 880 622","IsCurrent":"0","SysCreated":"2018-04-20 12:06:02"}],"LandLine":"(+212) 537 880 622"}]
 		this.getCategories_lvl_1()
 		console.log(this.searchOn)
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad SearchPage');
 	}

 	onInput(e){
 		console.log(e)
 		console.log(this.inputSearch)
 		this.searchBy(this.searchOn, this.inputSearch, 0, this.where_categories)
 	}

 	doInfinite(infiniteScroll) {
 		console.log('Begin async operation');

 		setTimeout(() => {
 			this.offset = this.offset + 1
 			this.searchBy(this.searchOn, this.inputSearch, this.offset, this.where_categories)

 			console.log('Async operation has ended');
 			infiniteScroll.complete();
 		}, 500);
 	}

 	onChange(value, lvl){
 		// console.log(value, lvl)
 		this['cat_'+lvl] = value
 		this.where_categories = ""

 		switch (lvl) {
 			case 1:
 			this['cat_' + (lvl+1)] = -1
 			this['cat_' + (lvl+2)] = -1
 			this['cat_' + (lvl+3)] = -1
 			this['cat_' + (lvl+4)] = -1
 			break;
 			case 2:
 			this['cat_' + (lvl+1)] = -1
 			this['cat_' + (lvl+2)] = -1
 			this['cat_' + (lvl+3)] = -1
 			break;
 			case 3:
 			this['cat_' + (lvl+1)] = -1
 			this['cat_' + (lvl+2)] = -1
 			case 4:
 			this['cat_' + (lvl+1)] = -1
 			break;

 		}

 		this.where_categories = this.cat_1 != -1 ? this.where_categories + this.cat_1 : this.where_categories 
 		this.where_categories = this.cat_2 != -1 ? this.where_categories + "-"+this.cat_2 : this.where_categories
 		this.where_categories = this.cat_3 != -1 ? this.where_categories + "-"+this.cat_3 : this.where_categories 
 		this.where_categories = this.cat_4 != -1 ? this.where_categories + "-"+this.cat_4  : this.where_categories
 		this.where_categories = this.cat_5 != -1 ? this.where_categories + "-"+this.cat_5  : this.where_categories
 		console.log("$where_categories:", this.where_categories)
 		console.log([{'1': this.cat_1, '2': this.cat_2, '3': this.cat_3, '4': this.cat_4, '5': this.cat_5}])
 		if(lvl != 5){
 			this.getCategoriesByLvl(value, lvl)
 		}
 		this.searchBy(this.searchOn, this.inputSearch, this.offset, this.where_categories)
 	}

 	radioChecked(value, type){
 		this.inputType = type
 		this.offset = 0
 		this.contacts = []
 		this.searchBy(this.searchOn, this.inputSearch, this.offset, this.where_categories)
 		console.log(value, type)
 	}

 	getCategoriesByLvl(id, lvl){
 		console.log('Func: getCategoriesByLvl id: '+id+' lvl: '+lvl)

 		switch (lvl) {
 			case 1:
 			this['categories_lvl_' + (lvl+1)] = null
 			this['categories_lvl_' + (lvl+2)] = null
 			this['categories_lvl_' + (lvl+3)] = null
 			this['categories_lvl_' + (lvl+4)] = null
 			break;
 			case 2:
 			this['categories_lvl_' + (lvl+1)] = null
 			this['categories_lvl_' + (lvl+2)] = null
 			this['categories_lvl_' + (lvl+3)] = null
 			break;
 			case 3:
 			this['categories_lvl_' + (lvl+1)] = null
 			this['categories_lvl_' + (lvl+2)] = null
 			case 4:
 			this['categories_lvl_' + (lvl+1)] = null
 			break;

 		}

 		this.http.get(this.url+'action=getcategoriesbylvl&id='+id+'&lvl='+lvl).map(res => res.json()).subscribe(
 			data => {
 				// console.log('Categoles lvl: '+(lvl+1), data)
 				this['categories_lvl_' + (lvl+1)] = data
 			},
 			err => {
 				console.log("Oops!")
 			}
 			)
 	}

 	getCategories_lvl_1(){
 		this.http.get(this.url+'action=getcategories_lvl_1').map(res => res.json()).subscribe(
 			data => {
 				this.categories_lvl_1 = data
 			},
 			err => {
 				console.log("Oops!")
 			}
 			)
 	}

 	searchBy(by, value, offset, where_categories){
 		this.http.get(this.url+'action=searchby&by='+by+'&value='+value+'&offset='+offset+'&where_categories='+where_categories).map(res => res.json()).subscribe(
 			data => {
 				if(offset == 0){
 					this.contacts = data.contacts
 					this.total = data.total
 				}else{
 					this.contacts = this.contacts.concat(data)
 				}
 				
 				console.log('Result: ', this.contacts)
 			},
 			err => {
 				console.log("Oops!")
 			}
 			)
 	}

 	details(contact){
 		this.navCtrl.push(DetailPage, {
 			contact: contact
 		})
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

}
