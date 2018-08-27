import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';


// Pages
import { DetailPage } from '../detail/detail';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  url = "http://still.agence360.ma/?"
  contacts: any
  canShareViaEmail = false
  canShareViaWhatsapp = false
  offset = 0
  total:any

  constructor(public navCtrl: NavController, public http: Http, private socialSharing: SocialSharing, private callNumber: CallNumber) {
    // this.searchPage()

    this.getAll(0)

    // this.contacts = [{"IdContact":"1","CategoryId":"5","ContactType":"Entreprise","LastName":"CIM Maroc","FirstName":null,"WebSite":"www.cim.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"2","CategoryId":"5","ContactType":"Contact","LastName":"Gueddar","FirstName":"Yassine","WebSite":null,"City":null,"Notes":null,"AvatarPath":"Yassine Gueddar.jpg","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:39:59"},{"IdContact":"3","CategoryId":"5","ContactType":"Contact","LastName":"Sidki","FirstName":"Driss","WebSite":null,"City":null,"Notes":null,"AvatarPath":"Driss Sidki.jpg","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:39:59"},{"IdContact":"4","CategoryId":"5","ContactType":"Entreprise","LastName":"Installator","FirstName":null,"WebSite":"www.installator.com","City":"Casablanca","Notes":"Tr\u00c3\u00a9s grand fournisseur avec grand atelier boiserie","AvatarPath":"\u00c3\u00a7\u00c3\u00a7& Installator.png","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"5","CategoryId":"5","ContactType":"Entreprise","LastName":"Continental Trading Company","FirstName":null,"WebSite":null,"City":"Casablanca","Notes":"Ou \u00c3\u00a0 travaill\u00c3\u00a9 ami iliass jawad abdelati importateur non poseur - importateur non poseur\r\n\r\n","AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"6","CategoryId":"5","ContactType":"Entreprise","LastName":"CMPE","FirstName":null,"WebSite":"www.cmpe.ma\/","City":"Casablanca","Notes":"Tr\u00c3\u00a9s r\u00c3\u00a9actifs\r\ngrande entreprise","AvatarPath":"\u00c3\u00a7\u00c3\u00a7& CMPE.jpg","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"7","CategoryId":"5","ContactType":"Entreprise","LastName":"PIC Maroc","FirstName":null,"WebSite":"www.picmaroc.com","City":"Mohammedia","Notes":null,"AvatarPath":"\u00c3\u00a7\u00c3\u00a7& PIC Maroc.jpg","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:39:59"},{"IdContact":"8","CategoryId":"6","ContactType":"Entreprise","LastName":"Meiser","FirstName":null,"WebSite":"www.meiser.de","City":"Mohammedia","Notes":"produit caillebortis utilis\u00c3\u00a9 a cdm","AvatarPath":"\u00c3\u00a7\u00c3\u00a7& Meiser.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"9","CategoryId":"5","ContactType":"Entreprise","LastName":"Richebois","FirstName":null,"WebSite":"www.richebois.ma","City":"Casablanca","Notes":null,"AvatarPath":"\u00c3\u00a7\u00c3\u00a7& Richebois.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:39:59"},{"IdContact":"10","CategoryId":"5","ContactType":"Entreprise","LastName":"CPNA","FirstName":null,"WebSite":"www.cpna.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"11","CategoryId":"5","ContactType":"Entreprise","LastName":"Medisol","FirstName":null,"WebSite":"www.medisol.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"12","CategoryId":"5","ContactType":"Entreprise","LastName":"Espacia","FirstName":null,"WebSite":"www.groupeaksal.com","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"13","CategoryId":"5","ContactType":"Entreprise","LastName":"DAR SOFIA","FirstName":null,"WebSite":"www.ceramique-darsofia.com","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"14","CategoryId":"5","ContactType":"Entreprise","LastName":"Jet Alu","FirstName":null,"WebSite":"www.jetalu.com","City":"Rabat","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"15","CategoryId":"5","ContactType":"Entreprise","LastName":"Multicolles","FirstName":null,"WebSite":"www.multicolles.com","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"16","CategoryId":"5","ContactType":"Entreprise","LastName":"Induflom Batibarj","FirstName":null,"WebSite":"www.induflom.com","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"17","CategoryId":"5","ContactType":"Entreprise","LastName":"Cap Protect","FirstName":null,"WebSite":"www.guardindustrie.fr","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"18","CategoryId":"5","ContactType":"Entreprise","LastName":"Deutsch Confort","FirstName":null,"WebSite":"www.deutschconfort.com","City":"Casablanca","Notes":"bonne qualit\u00c3\u00a9","AvatarPath":"Deutsch Confort.jpg","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"19","CategoryId":"5","ContactType":"Entreprise","LastName":"Touareg Travaux","FirstName":null,"WebSite":"www.touareg-travaux.com","City":"Casablanca","Notes":"Beton imprim\u00c3\u00a9 & Cir\u00c3\u00a9 & D\u00c3\u00a9sactiv\u00c3\u00a9\r\nCuvelage & Etanch\u00c3\u00a9it\u00c3\u00a9\r\nDallage industriel","AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"20","CategoryId":"6","ContactType":"Entreprise","LastName":"Lafarge B\u00c3\u00a9ton Et Gravel Maroc","FirstName":null,"WebSite":"www.lafarge.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"}]

  	// Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      this.canShareViaEmail = true
    }).catch(() => {
		  // Sharing via email is not possible
		  console.log("can't share via Email")
		});
  }

  getAll(offset){
  	this.http.get(this.url+'action=getcontacts&offset='+this.offset).map(res => res.json()).subscribe(
  		data => {
        if(offset == 0){
          this.contacts = data.contacts
          this.total = data.total
        }else{
          this.contacts = this.contacts.concat(data)
        }
        console.log('Result: ', this.contacts)
      },
      err => {
        console.log("Oops!")
      }
      )
  }

  details(contact){
    this.navCtrl.push(DetailPage, {
      contact: contact,
      lvl: 0
    })
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.offset = this.offset + 1
      this.getAll(this.offset)

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  searchPage(){
    this.navCtrl.push(SearchPage)
  }

  call(number){
  	console.log("call")

    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  whatsapp(number){

  	this.socialSharing.shareViaWhatsAppToReceiver(number, '', '', '').then(() => {
		  // Success!
		  console.log("whatsapp OK")
		}).catch(() => {
		  // Error!
		  console.log("error via whatsapp")
		});
  }

  sms(number){
  	this.socialSharing.shareViaSMS('', number).then(() => {
		  // Success!
		  console.log("SMS OK")
		}).catch(() => {
		  // Error!
		  console.log("error via SMS")
		});
  }

  mail(email){
  	
  	// Share via email
    this.socialSharing.shareViaEmail('', '', [email]).then(() => {
		  // Success!
		  console.log("mail OK")
		}).catch(() => {
		  // Error!
		  console.log("error via Email")
		});
  }

}
