import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailPage } from '../detail/detail';
import { ContactServicesProvider } from '../../providers/contact-services/contact-services';

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
	type: any
	label: any
	value: any
	status: any
	masks:any

	loading: any

	constructor(private alertCtrl: AlertController, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http, private cp: ContactServicesProvider, public loadingCtrl: LoadingController) {
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

	presentLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

		this.loading.present();

		setTimeout(() => {
			this.loading.dismiss();
		}, 15000);
	}

	loadingDismiss(){
		this.loading.dismiss()
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
					"contact_id": this.contact_id
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
						this.http.delete(this.cp.url+'info/' + this.info.id).map(res => res.json()).subscribe(
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
