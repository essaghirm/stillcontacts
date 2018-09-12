import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { SearchPage } from '../search/search';

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
    url = 'http://127.0.0.1:8000/'
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
        this['categories_' + lvl] = null
        this.http.get('http://127.0.0.1:8000/category/'+parent+'/'+lvl).map(res => res.json()).subscribe(
            data => {
                if(data.categories.length > 0){
                    console.log('Result: ', data)
                    this['categories_' + lvl] = data.categories
                }
                this.contacts_total = data.details.contacts
                this.categories_total = data.details.categories
                if(this.contacts_total == 0 && this.categories_total == 0){
                    this.canRemove = true
                }else{
                    this.canRemove = false
                }
                console.log(this.canRemove)
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
            this['cv_' + index] = null
        }
    }

    addNewCategory(lvl){
        this.category = this['cv_' + lvl]
        this.title = ""
        console.log('Category to add in: ', this["cv_" + lvl]);
        this.action = "add"
    }

    editCategory(lvl){
        console.log('category to edit:', this['cv_' + lvl], 'lvl', lvl)
        this.action = "edit"
        
        let _array: any
        if(lvl == 1){
            _array = this.categories
        }else{
            _array = this['categories_' + lvl]
        }
        setTimeout(() => {
            _array.forEach(e => {
                if(e.id == this['cv_' + lvl]){
                    this.title = e.title
                    this.lvl = lvl+1
                    this.category = this['cv_' + lvl]
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
        console.log(this.action)
        console.log(this.category, this.title, this.url+'category/'+this.category)
        if(this.action == "edit"){
            if(this.action == "edit"){
                this.http.put(
                    this.url+'category/'+this.category,
                    {
                        "title": this.title
                    }
                ).map(res => res.json()).subscribe(
                    data => {
                        console.log(data)
                        this.getCategoriesByLvl(data.parent.id, data.lvl)
                    },
                    err => {
                        console.log("Oops!")
                    }
                )
            }
        }

        if(this.action == "add"){
            this.http.post(
				this.url+'category/new',
				{
                    "title": this.title,
                    "parent": this.category
				}
			).map(res => res.json()).subscribe(
				data => {
					console.log(data)
					this.getCategoriesByLvl(data.parent.id, data.lvl)
				},
				err => {
					console.log("Oops!")
				}
			)
        }
    }

    showContacts(){
        
        this.navCtrl.push(SearchPage, {
            fromCategory: true,
            categories_1: this.categories,
        	categories_2: this.categories_2,
        	categories_3: this.categories_3,
        	categories_4: this.categories_4,
            categories_5: this.categories_5,
            cv_1: this.cv_1,
        	cv_2: this.cv_2,
        	cv_3: this.cv_3,
        	cv_4: this.cv_4,
            cv_5: this.cv_5
        })
    }

}
