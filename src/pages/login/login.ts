import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { SearchPage } from '../search/search';
import { ContactServicesProvider } from '../../providers/contact-services/contact-services';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	username: any
	password: any
	new_username: string
	new_password: string
	full_name: string
	email: string
	message: any
	messageClass:any
	action:string = "connect"
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage, private cp: ContactServicesProvider) {

		// // Or to get a key/value pair
		// setTimeout(() => {
		// 	storage.get('status').then((val) => {
		// 		if(val == 'connected'){
		// 			console.log('already connected !')
		// 			this.navCtrl.setRoot(HomePage)
		// 		}else{
		// 			console.log('not connected !')
		// 		}
		// 	});

		// }, 500)

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	checklogin() {
		this.http.post(this.cp.url + 'user/login', {
			"user_name": this.username,
    		"password": this.password
		}).map(res => res.json()).subscribe(
			data => {
				console.log(data)
				if (data.status == true) {
					this.storage.set('status', 'connected');
					this.storage.set('user', data.user);
					setTimeout(() => {
						this.navCtrl.setRoot(SearchPage)
					}, 500)

				} else {
					this.messageClass = data.status
					this.message = data.message
				}
			},
			err => {
				console.log("Oops!")
			}
		)
	}

	create(){
		console.log(this.full_name, this.new_password, this.new_username, this.email)
		this.http.post(
			this.cp.url+'user/new',
			{
				"full_name": this.full_name,
			    "email": this.email,
			    "user_name": this.new_username,
			    "password": this.new_password
			}
		).map(res => res.json()).subscribe(
			data => {
				console.log(data)
				this.messageClass = data.status
					this.message = data.message
			},
			err => {
				console.log("Oops!")
			}
		)
	}

	changeAction(action){
		this.action = action
	}

}
