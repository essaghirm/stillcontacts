import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the EditInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-edit-info',
	templateUrl: 'edit-info.html',
})
export class EditInfoPage {
	info: any
	contact_id: any
	id: number
	type: any
	label: any
	value: any

	constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
		this.info = this.navParams.data.info
		this.contact_id = this.navParams.data.contact_id
		if (this.info === 0) {

		}
		console.log('info', this.info)

	}

	close() {
		this.viewCtrl.dismiss();
	}
	
	deleteInfo(){
		console.log('delete', this.info)
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditInfoPage');
	}

	submit(type) {
		if(type == 'add'){
			this.http.post(
				'http://127.0.0.1:8000/info/new',
				{
					"type": this.type,
					"label": this.label,
					"value": this.value,
					"contact_id": this.contact_id
				}
			).map(res => res.json()).subscribe(
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

		if(type == 'edit'){
			console.log('edit', this.info)
		}
	}

}
