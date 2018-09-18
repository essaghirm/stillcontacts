import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ContactServicesProvider } from '../../providers/contact-services/contact-services';

/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users: any

  constructor(private alertCtrl: AlertController, public http: Http, public navCtrl: NavController, public navParams: NavParams, private cp: ContactServicesProvider) {
    this.getUsers()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  getUsers() {
    this.http.get(this.cp.url + 'user/').map(res => res.json()).subscribe(
      data => {
        console.log(data)
        this.users = data
      },
      err => {
        console.log("Oops!")
      }
    )
  }

  onChangeStatus(user){
    this.users.forEach(u => {
      if(u.id == user.id){
        console.log(u.status, u)
        this.http.post(this.url+'/user/changeuserstatus/'+u.id, {
          "status": u.status
        }).map(res => res.json()).subscribe(
          data => {
            if(data == true){
              console.log(data)
            }else{
              console.log('error')
            }
          },
          err => {
            console.log("Oops!")
          }
        )
      }
    })
  }

  removeUser(user){
    this.presentConfirm()
    this.users.forEach(u => {
      if(u.id == user.id){
        console.log('Remove :', u)
      }
    })
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirmeation',
      message: 'Voulez-vous vraiment supprimer cet utilisateur?',
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
            console.log('Oui je veux');
          }
        }
      ]
    });
    alert.present();
  }

}
