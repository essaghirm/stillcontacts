import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailPage } from '../detail/detail';
import { ContactServicesProvider } from '../../providers/contact-services/contact-services';
import { sprintf } from 'sprintf-js'

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
	url = "http://cmma.agence360.ma/stillsf/public/"
	info: any
	contact_id: any
	id: number
	type: any = 'Phone'
	label: any
	value: any
	status: boolean = false
	masks: any

	loading: any

	constructor(private alertCtrl: AlertController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http, private cp: ContactServicesProvider, public loadingCtrl: LoadingController) {
		let _info = this.navParams.data.info
		if (this.navParams.data.info && this.navParams.data.info.type == 'Phone') {
			_info.value = this.maskPhone(_info.value)
		}
		this.info = _info
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

	presentLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

		this.loading.present();

		setTimeout(() => {
			this.loading.dismiss();
		}, 15000);
	}

	loadingDismiss() {
		this.loading.dismiss()
	}

	onInput(e) {
		if (this.info) {
			this.info.value = this.maskPhone(this.info.value)
		} else {
			this.value = this.maskPhone(this.value)
		}

	}

	maskPhone(value) {
		let _val = value.replace(/[^0-9]/g, '')
		_val = _val.substr(0, 12)
		let val
		if (_val.length <= 11) {
			val = sprintf('(+%s) %s %s %s',
				_val.substr(0, 2),
				_val.substr(2, 3),
				_val.substr(5, 3),
				_val.substr(8, 3)
			)
		} else if (_val.length > 11) {
			val = sprintf('(+%s) %s %s %s',
				_val.substr(0, 3),
				_val.substr(3, 3),
				_val.substr(6, 3),
				_val.substr(9, 3)
			)
		}
		console.log(val)
		return val
	}

	submit(type) {
		this.presentLoading()
		if(type == 'add'){
			console.log(this.status)
			this.http.post(
				this.cp.url+'info/new',
				{
					"type": this.type,
					"label": this.label,
					"value": this.value,
					"status": this.status,
					"contact": this.contact_id
				}
			).map(res => res.json()).subscribe(
				data => {
					console.log(data)
					this.loadingDismiss()
					this.navCtrl.pop()
				},
				err => {
					console.log("Oops!")
				}
			)
		}

		if(type == 'edit'){
			console.log(this.info.status)
			this.http.put(
				this.cp.url+'info/'+this.info.id,
				{
					"type": this.info.type,
					"label": this.info.label,
					"status": this.info.status,
					"value": this.info.value
				}
			).map(res => res.json()).subscribe(
				data => {
					console.log(data)
					this.loadingDismiss()
					this.navCtrl.pop()
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
						this.presentLoading()
						this.http.delete(this.cp.url + 'info/' + this.info.id).map(res => res.json()).subscribe(
							data => {
								console.log(data)
								this.loadingDismiss()
								this.navCtrl.pop()
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
