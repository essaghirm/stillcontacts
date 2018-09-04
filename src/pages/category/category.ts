import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-category',
	templateUrl: 'category.html',
})
export class CategoryPage {
	category
	categories: any
	categories_2: any
	categories_3: any
	categories_4: any
	categories_5: any
	constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
		this.getCategories()
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CategoryPage');
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

}
