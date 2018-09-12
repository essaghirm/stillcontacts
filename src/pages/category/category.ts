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
	category: number = null
	categories: any
	categories_2: any
	categories_3: any
	categories_4: any
    categories_5: any

    cv_1:any
    cv_2:any
    cv_3:any
    cv_4:any
    cv_5:any

    contacts_total:number = null
    categories_total:number = null

    lvl:any = 1
    title: string = null
    canRemove: any = false
    
    action:  any = null;
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
                // if(data.length > 0){
                    console.log('Result: ', data)
                    this['categories_' + lvl] = data.categories
                    this.contacts_total = data.details.contacts
                    this.categories_total = data.details.categories
                    if(this.contacts_total == 0 && this.categories_total == 0){
                        this.canRemove = true
                    }else{
                        this.canRemove = false
                    }
                    console.log(this.canRemove)
                // }
            },
            err => {
                console.log("Oops!")
            }
        )
	}
	
	onChange(parent, lvl){
        this.lvl = lvl
        this.reset(lvl)
        this.action = null
        console.log(parent, lvl)
        this.category = parent
        this['cv_' + (lvl-1)]= parent
        console.log('Category choiced:', this.category)
        this.getCategoriesByLvl(parent, lvl)
	}
	
	reset(lvl){
        for (let index = lvl; index <= 5; index++) {
            console.log('categories_'+index)
            this['categories_' + index] = null
        }
    }

    addNewCategory(lvl){
        console.log('Category to add in: ', this["cv_" + lvl]);
        this.action = "add"
    }

    editCategory(){
        this.action = "edit"
        let _array: any
        if(this.lvl == 2){
            _array = this.categories
        }else{
            _array = this['categories_' + (this.lvl - 1)]
        }
        setTimeout(() => {
            _array.forEach(e => {
                if(e.id == this.category){
                    this.title = e.title
                }
            });
        }, 500);
        
    }

    cancel(){
        this.action = null
        this.title = ""
    }

    removeCategory(){
        this.action = null
        this.title = ""
    }

    submit(){
        let id: number = null
        if(this.action == "edit"){
            id = this.category
        }
    }

}
