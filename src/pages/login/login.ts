import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
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

	url = "http://127.0.0.1:8000/"
	username: any
	password: any
	new_username: string
	new_password: string
	full_name: string
	email: string
	message: any
	action:string = "connect"
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private storage: Storage) {

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
		this.http.post(this.url + 'user/login', {
			"user_name": this.username,
    		"password": this.password
		}).map(res => res.json()).subscribe(
			data => {
				console.log(data)
				if (data.status == true) {
					this.storage.set('status', 'connected');
					this.storage.set('user', data.user);
					setTimeout(() => {
						this.navCtrl.setRoot(HomePage)
					}, 500)

				} else {
					this.message = data
				}
			},
			err => {
				console.log("Oops!")
			}
		)
	}

	create(){

	}

	changeAction(action){
		this.action = action
	}

}
