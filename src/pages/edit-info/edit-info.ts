import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
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
	status: any
	masks:any

	constructor(private alertCtrl: AlertController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
		this.info = this.navParams.data.info
		this.contact_id = this.navParams.data.contact_id
		if (this.info === 0) {

		}
		console.log('info', this.info)

		this.masks = {
            phoneNumber: ['(+', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/]
        };

	}

	close() {
		this.viewCtrl.dismiss();
	}


	ionViewDidLoad() {
		console.log('ionViewDidLoad EditInfoPage');
	}

	submit(type) {
		if(type == 'add'){
			console.log(this.status)
			this.http.post(
				'http://127.0.0.1:8000/info/new',
				{
					"type": this.type,
					"label": this.label,
					"value": this.value,
					"status": this.status,
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
			console.log(this.info.status)
			this.http.put(
				'http://127.0.0.1:8000/info/'+this.info.id,
				{
					"type": this.info.type,
					"label": this.info.label,
					"status": this.info.status,
					"value": this.info.value
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
	}

	deleteInfo() {
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
						this.http.delete('http://localhost:8000/info/' + this.info.id).map(res => res.json()).subscribe(
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
