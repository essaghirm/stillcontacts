import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the EditContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-edit-contact',
    templateUrl: 'edit-contact.html',
})
export class EditContactPage {

    contact: any
    id: number
    type: string
    fname: string
    lname: string
    web_site: string
    notes: string
    city: string
    category:any

    categories: any
    categories_2: any
    categories_3: any
    categories_4: any
    categories_5: any

    loading: any
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public http: Http, public navParams: NavParams, public loadingCtrl: LoadingController) {
        this.contact = this.navParams.data.contact
        if(this.contact != null){
            this.id = this.contact.id
            this.type = "company"
            this.category = 26
            this.lname = this.contact.lname
            this.fname = this.contact.fname
            this.city = this.contact.city
            this.web_site = this.contact.webSite
            this.notes = this.contact.notes
        }
        this.getCategories()
    }

    details(contact) {
        this.navCtrl.push(DetailPage, {
            contact: contact,
            lvl: 0
        })
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
    
    close() {
		this.viewCtrl.dismiss();
	}

    ionViewDidLoad() {
        console.log('ionViewDidLoad EditContactPage');
    }

    getCategories() {
        console.log('func - getCategories')
        this.http.get('http://127.0.0.1:8000/category/').map(res => res.json()).subscribe(
            data => {
                if(data.length > 0){
                    console.log('Result: ', data)
                    this.categories = data
                }
            },
            err => {
                console.log("Oops!")
            }
        )
    }

    getCategoriesByLvl(parent, lvl) {
        console.log('func - getCategories')
        this.http.get('http://127.0.0.1:8000/category/'+parent+'/'+lvl).map(res => res.json()).subscribe(
            data => {
                if(data.length > 0){
                    console.log('Result: ', data, typeof(data))
                    this['categories_' + lvl] = data
                }
            },
            err => {
                console.log("Oops!")
            }
        )
    }

    onChange(parent, lvl){
        this.reset(lvl)
        console.log(parent, lvl)
        this.category = parent
        console.log('Category choiced:', this.category)
        this.getCategoriesByLvl(parent, lvl)
    }

    reset(lvl){
        for (let index = lvl; index <= 5; index++) {
            console.log('categories_'+index)
            this['categories_' + index] = null
        }
    }

    saveContact() {
        console.log('haaaaa')
        this.presentLoading()
        this.http.post(
            'http://localhost:8000/contact/',
            {
                "fname": this.fname,
                "lname": this.lname,
                "web_site": this.web_site,
                "city": this.city,
                "notes": this.notes,
                "type": this.type,
                "category": this.category
            }
        ).map(res => res.json()).subscribe(
            data => {
                this.loadingDismiss()
                console.log('allaaa: ', data)
                this.details(data.contact)
            },
            err => {
                console.log("Oops!")
            }
        )
    }

}
