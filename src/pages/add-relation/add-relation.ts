import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CompileNgModuleMetadata, collectExternalReferences } from '@angular/compiler';
import { Http } from '@angular/http';
import { DetailPage } from '../detail/detail';
import { ContactServicesProvider } from '../../providers/contact-services/contact-services';

/**
 * Generated class for the AddRelationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-add-relation',
	templateUrl: 'add-relation.html',
})
export class AddRelationPage {
	url = "http://cmma.agence360.ma/stillsf/public/"
	inputSearch = ""
	contactType: any
	contacts: any
	occupation: string = ""
	contact: any
	choiced: any
	constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http, private cp: ContactServicesProvider) {
		console.log(this.navParams.data)
		this.contactType = this.navParams.data.type
		this.contact = this.navParams.data.contact
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditRelationPage');
	}

	onInput(e) {
		console.log(this.inputSearch)
		this.http.get(this.cp.url+'contact/search/' + this.contact.id + '/' + this.contactType + '/' + this.inputSearch).map(res => res.json()).subscribe(
			data => {
					console.log('Result: ', data)
					this.contacts = data
			},
			err => {
				console.log("Oops!")
			}
		)
	}

	addThis(friend_id) {
		console.log('addthis: ', friend_id, this.contact.id, this.occupation)
		this.http.post(this.cp.url+'relation/new',
			{
				"contact_id": this.contact.id,
				"friend_id": friend_id,
				"occupation": this.occupation
			}
		).map(res => res.json()).subscribe(
			data => {
				console.log(data)
				this.navCtrl.pop()				
			},
			err => {
				console.log("Oops!")
			}
		)
	}

	close() {
		this.viewCtrl.dismiss();
	}

}
