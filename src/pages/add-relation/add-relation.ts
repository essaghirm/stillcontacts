import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CompileNgModuleMetadata, collectExternalReferences } from '@angular/compiler';
import { Http } from '@angular/http';
import { DetailPage } from '../detail/detail';

/**
 * Generated class for the AddRelationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-add-relation',
	templateUrl: 'add-relation.html',
})
export class AddRelationPage {
	inputSearch = ""
	contactType: any
	contacts: any
	occupation: any
	contact: any
	choiced: any
	constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
		console.log(this.navParams.data)
		this.contactType = this.navParams.data.type
		this.contact = this.navParams.data.contact
		this.contacts = [{ "id": 4059, "fname": null, "lname": "SAMIR", "webSite": "www.samir.ma", "city": "Mohammedia", "notes": "note", "type": "company", "infos": [], "email": null, "mobile": null, "landline": null }, { "id": 4058, "fname": null, "lname": "Azur link", "webSite": "www.loman.com", "city": "Rabat", "notes": "info note", "type": "company", "infos": [], "email": null, "mobile": null, "landline": null }, { "id": 4057, "fname": "Himich", "lname": "Aziza", "webSite": null, "city": "Nador", "notes": "notessss", "type": "contact", "infos": [], "email": null, "mobile": null, "landline": null }, { "id": 4056, "fname": "Aarich", "lname": "Khalid", "webSite": null, "city": "Casablanca", "notes": "noteaaa", "type": "contact", "infos": [], "email": null, "mobile": null, "landline": null }, { "id": 4055, "fname": "Essaghir", "lname": "Mouhcine", "webSite": null, "city": "mohammedia", "notes": "notes....", "type": "contact", "infos": [], "email": null, "mobile": null, "landline": null }, { "id": 4054, "fname": null, "lname": "Artegis Maroc", "webSite": null, "city": "Casablanca", "notes": null, "type": "company", "infos": [{ "id": 8501, "type": "Mobile", "label": "Pro", "value": "(+212) 522-989-673", "contact": null }, { "id": 8503, "type": "Email", "label": "Pro", "value": "artegismaroc@gmail.com", "contact": null }], "email": "artegismaroc@gmail.com", "mobile": "(+212) 522-989-673", "landline": null }, { "id": 4053, "fname": "Zahra", "lname": "Baba ", "webSite": null, "city": null, "notes": null, "type": "contact", "infos": [{ "id": 8499, "type": "Address", "label": "Si\u00e8ge", "value": "Avenue Madagascar Siyame N\u00c2\u00b0 32 Bis RDC Rabat", "contact": null }], "email": null, "mobile": null, "landline": null }, { "id": 4052, "fname": null, "lname": "The New Territory", "webSite": null, "city": "Rabat", "notes": null, "type": "company", "infos": [{ "id": 8497, "type": "Mobile", "label": "Pro", "value": "(+212) 667-781-507", "contact": null }, { "id": 8498, "type": "Email", "label": "Pro", "value": "hicham@thenewterritory.ma", "contact": null }], "email": "hicham@thenewterritory.ma", "mobile": "(+212) 667-781-507", "landline": null }, { "id": 4051, "fname": null, "lname": "ANAPEC", "webSite": "www.anapec.org", "city": "Rabat", "notes": null, "type": "company", "infos": [{ "id": 8493, "type": "Address", "label": "Si\u00e8ge", "value": "40 Avenue des nations unies Agdal", "contact": null }, { "id": 8494, "type": "Address", "label": "Si\u00e8ge", "value": "5 Avenue moulay youssef rue el yanbou\u00c3\u00a2a Centre ville", "contact": null }, { "id": 8495, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 537-724-147", "contact": null }, { "id": 8496, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 537-774-592", "contact": null }], "email": null, "mobile": null, "landline": "(+212) 537-774-592" }, { "id": 4050, "fname": null, "lname": "Demos ", "webSite": "http:\/\/www.formademos.ma\/", "city": "Rabat", "notes": null, "type": "company", "infos": [{ "id": 8490, "type": "Address", "label": "Si\u00e8ge", "value": "1, rue Ghafsa, Place Al Joulane, 10000 Rabat", "contact": null }, { "id": 8491, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 537-727-615", "contact": null }, { "id": 8492, "type": "Email", "label": "Si\u00e8ge", "value": "forma@demos.ma", "contact": null }], "email": "forma@demos.ma", "mobile": null, "landline": "(+212) 537-727-615" }, { "id": 4049, "fname": null, "lname": "Licorn Group", "webSite": "http:\/\/www.licorne.ma\/cabinet-de-conseil-et-de-formation", "city": "Casablanca", "notes": null, "type": "company", "infos": [{ "id": 8488, "type": "Address", "label": "Si\u00e8ge", "value": "7 Rue des Papillons, Casablanca", "contact": null }, { "id": 8489, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 522-991-911", "contact": null }], "email": null, "mobile": null, "landline": "(+212) 522-991-911" }, { "id": 4048, "fname": null, "lname": "Maroc Performance", "webSite": "http:\/\/www.maroc-performance.com\/", "city": "Casablanca", "notes": null, "type": "company", "infos": [{ "id": 8484, "type": "Address", "label": "Si\u00e8ge", "value": "39 Rue Vouziers, Ang Bd Emile Zola Casablanca ", "contact": null }, { "id": 8485, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 522-247-210", "contact": null }, { "id": 8486, "type": "Fax", "label": "Si\u00e8ge", "value": "(+212) 522-247-212", "contact": null }, { "id": 8487, "type": "Email", "label": "Si\u00e8ge", "value": "contact@maroc-performance.com", "contact": null }], "email": "contact@maroc-performance.com", "mobile": null, "landline": "(+212) 522-247-210" }, { "id": 4047, "fname": null, "lname": "LMS Formation", "webSite": "http:\/\/www.lmsformation.com\/", "city": "Casablanca ", "notes": null, "type": "company", "infos": [{ "id": 8480, "type": "Address", "label": "Si\u00e8ge", "value": "47, Bd D' Anfa, Casablanca", "contact": null }, { "id": 8481, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 522-485-027", "contact": null }, { "id": 8482, "type": "Mobile", "label": "Si\u00e8ge", "value": "(+212) 661-473-463", "contact": null }, { "id": 8483, "type": "Email", "label": "Si\u00e8ge", "value": "formation@lmsorh.com", "contact": null }], "email": "formation@lmsorh.com", "mobile": "(+212) 661-473-463", "landline": "(+212) 522-485-027" }, { "id": 4046, "fname": null, "lname": "Ecole d'ing\u00c3\u00a9nieur et de management marocaine - ISGA", "webSite": "http:\/\/www.isga.ma\/", "city": "Rabat", "notes": null, "type": "company", "infos": [{ "id": 8478, "type": "Address", "label": "Si\u00e8ge", "value": "27, Avenue Oqba, 27 Avenue Oqba Ibn Naafi, Rabat", "contact": null }, { "id": 8479, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 537-771-468", "contact": null }], "email": null, "mobile": null, "landline": "(+212) 537-771-468" }, { "id": 4045, "fname": null, "lname": "Ecole sup\u00c3\u00a9rieure de commerce - HEM", "webSite": "https:\/\/hem.ac.ma\/", "city": "Rabat", "notes": null, "type": "company", "infos": [{ "id": 8474, "type": "Address", "label": "Si\u00e8ge", "value": "Intersection Mohammed VI - Akrache, Lot. Mouline N\u00c2\u00b0 3, Souissi - Rabat", "contact": null }, { "id": 8475, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 537-652-626", "contact": null }, { "id": 8476, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 537-632-727", "contact": null }, { "id": 8477, "type": "Email", "label": "Si\u00e8ge", "value": "hem.rabat@hem.ac.ma", "contact": null }], "email": "hem.rabat@hem.ac.ma", "mobile": null, "landline": "(+212) 537-632-727" }, { "id": 4044, "fname": null, "lname": "Institut des hautes \u00c3\u00a9tudes de management", "webSite": "http:\/\/www.groupeihem.com\/", "city": "Rabat", "notes": null, "type": "company", "infos": [{ "id": 8470, "type": "Address", "label": "Si\u00e8ge", "value": "Avenue Mohamed VI, Rabat", "contact": null }, { "id": 8471, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 537-751-920", "contact": null }, { "id": 8472, "type": "Email", "label": "Si\u00e8ge", "value": "groupeihem@gmail.com", "contact": null }, { "id": 8473, "type": "Email", "label": "Si\u00e8ge", "value": "info@groupeihem.com", "contact": null }], "email": "info@groupeihem.com", "mobile": null, "landline": "(+212) 537-751-920" }, { "id": 4043, "fname": null, "lname": "Ecole Sup\u00c3\u00a9rieur Internationale de Gestion", "webSite": "https:\/\/www.esigmaroc.com\/", "city": "Rabat", "notes": null, "type": "company", "infos": [{ "id": 8469, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 537-750-201", "contact": null }], "email": null, "mobile": null, "landline": "(+212) 537-750-201" }, { "id": 4042, "fname": null, "lname": "\u00c3\u2030cole Hassania des travaux publics", "webSite": "http:\/\/www.ehtp.ac.ma\/", "city": "Casablanca", "notes": null, "type": "company", "infos": [{ "id": 8466, "type": "Address", "label": "Si\u00e8ge", "value": "Km 7 Route d'El Jadida, Casablanca BP 8108 Maroc", "contact": null }, { "id": 8467, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 520-420-512", "contact": null }, { "id": 8468, "type": "Fax", "label": "Si\u00e8ge", "value": "(+212) 522-230-717", "contact": null }], "email": null, "mobile": null, "landline": "(+212) 520-420-512" }, { "id": 4041, "fname": null, "lname": "Institut sp\u00c3\u00a9cialis\u00c3\u00a9e de technologie appliqu\u00c3\u00a9e - ISTA", "webSite": "http:\/\/www.ofppt.ma\/", "city": "Casablanca", "notes": null, "type": "company", "infos": [{ "id": 8464, "type": "Address", "label": "Si\u00e8ge", "value": "Intersection de la Route B.O. n\u00c2\u00b0 50 et la Route Nationale 11 BP 40207 \/ 20 270 Sidi Ma\u00c3\u00a2rouf - Casablanca", "contact": null }, { "id": 8465, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 522-634-444", "contact": null }], "email": null, "mobile": null, "landline": "(+212) 522-634-444" }, { "id": 4039, "fname": null, "lname": "Universit\u00c3\u00a9 Internationale de Rabat - UIR", "webSite": "http:\/\/www.uir.ac.ma\/", "city": "Rabat", "notes": null, "type": "company", "infos": [{ "id": 8460, "type": "Address", "label": "Si\u00e8ge", "value": "Universit\u00c3\u00a9 Internationale de Rabat Technopolis Rabat-Shore Rocade Rabat-Sal\u00c3\u00a9 ", "contact": null }, { "id": 8461, "type": "LandLine", "label": "Si\u00e8ge", "value": "(+212) 530-103-000", "contact": null }, { "id": 8462, "type": "Fax", "label": "Si\u00e8ge", "value": "(+212) 530-103-100", "contact": null }, { "id": 8463, "type": "Email", "label": "Si\u00e8ge", "value": "contact@uir.ac.ma", "contact": null }], "email": "contact@uir.ac.ma", "mobile": null, "landline": "(+212) 530-103-000" }]

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EditRelationPage');
	}

	onInput(e) {
		console.log(this.inputSearch)
		this.http.get('http://127.0.0.1:8000/contact/search/' + this.contactType + '/' + this.inputSearch).map(res => res.json()).subscribe(
			data => {
					console.log('Result: ', data)
					this.contacts = data
			},
			err => {
				console.log("Oops!")
			}
		)
	}

	addThis(friend_id) {
		console.log('addthis: ', friend_id, this.contact.id, this.occupation)
		this.http.post(
			'http://127.0.0.1:8000/relation/new',
			{
				"contact_id": this.contact.id,
				"friend_id": friend_id,
				"occupation": this.occupation
			}
		).map(res => res.json()).subscribe(
			data => {
				console.log(data)
				this.navCtrl.push(DetailPage, {
					contact: this.contact,
					lvl: 0
				})
			},
			err => {
				console.log("Oops!")
			}
		)
	}

	close() {
		this.viewCtrl.dismiss();
	}

}
