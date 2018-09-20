import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
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
    loading: any
    constructor(private alertCtrl: AlertController, public http: Http, public navCtrl: NavController, public navParams: NavParams, private cp: ContactServicesProvider, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
        this.getUsers()
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad UsersPage');
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

    presentToast(msg, pos, cls) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 5000,
            position: pos,
            cssClass: cls,
            showCloseButton: true,
            closeButtonText: 'Fermer'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
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

    onChangeStatus(user) {
        this.users.forEach(u => {
            if (u.id == user.id) {
                console.log(u.status, u)
                this.http.post(this.cp.url + 'user/changeuserstatus/' + u.id, {
                    "status": u.status
                }).map(res => res.json()).subscribe(
                    data => {
                        if (data == true) {
                            console.log(data)
                            this.presentToast('Le status à été changé avec succès', 'bottom', 'secondary')
                        } else {
                            console.log('error')
                            u.status = (user.status == true) ? false : true
                        }
                    },
                    err => {
                        console.log("Oops!")
                    }
                )
            }
        })
    }

    removeUser(user) {
        this.users.forEach(u => {
            if (u.id == user.id) {
                console.log('Remove :', u)
                this.confirmDelete(u.id)
            }
        })
    }

    confirmDelete(id) {
        let alert = this.alertCtrl.create({
            title: 'Confirmeation',
            message: 'Voulez-vous vraiment supprimer cet utilisateur?',
            buttons: [
                {
                    text: 'Anuller',
                    role: 'cancel',
                },
                {
                    text: 'Oui je veux',
                    handler: () => {
                        this.presentLoading()
                        this.http.delete(this.cp.url + 'user/' + id).map(res => res.json()).subscribe(
                            data => {
                                this.users = data
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

    changeRole(role, id){
        this.presentLoading()
        this.http.post(this.cp.url + 'user/changeuserrole/' + id, {
            "role": role
        }).map(res => res.json()).subscribe(
            data => {
                console.log(data)
                this.loadingDismiss()
                this.users = data
                this.presentToast('Le role d\'utilisateur à été changé avec succès', 'bottom', 'secondary')
            },
            err => {
                console.log("Oops!")
            }
        )
    }

}
