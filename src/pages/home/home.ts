import { Component } from '@angular/core';
import { NavController, PopoverController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';


// Pages
import { DetailPage } from '../detail/detail';
import { SearchPage } from '../search/search';
import { EditContactPage } from '../edit-contact/edit-contact';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    _url = "http://still.agence360.ma/?"
    url = "http://localhost:8000"
    contacts: any
    canShareViaEmail = false
    canShareViaWhatsapp = false
    offset = 1
    total: any
    role: any
    constructor(public navCtrl: NavController, public http: Http, private socialSharing: SocialSharing, private callNumber: CallNumber, public popoverCtrl: PopoverController, private storage: Storage) {
        // this.searchPage()

        this.getAll(1)
        // this.contacts = [{"id":1,"fname":null,"lname":"CIM Maroc","webSite":"www.cim.ma","city":"Casablanca","notes":null,"type":"company","infos":[{"id":1,"type":"Address","label":"Si\u00e8ge","value":"45, bd Gandhi, r\u00c3\u00a9sid. Yasmine - magasin 12","contact":null},{"id":2,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 943 130","contact":null}],"email":null,"mobile":null,"landline":"(+212) 522 943 130"},{"id":2,"fname":"Yassine","lname":"Gueddar","webSite":null,"city":null,"notes":null,"type":"contact","infos":[{"id":3,"type":"Mobile","label":"Personnel","value":"(+212) 661 172 561","contact":null},{"id":4,"type":"Email","label":"Perso","value":"y.gueddar@cim.ma","contact":null}],"email":"y.gueddar@cim.ma","mobile":"(+212) 661 172 561","landline":null},{"id":3,"fname":"Driss","lname":"Sidki","webSite":null,"city":null,"notes":null,"type":"contact","infos":[{"id":5,"type":"Mobile","label":"Perso","value":"(+212) 661 936 473","contact":null},{"id":6,"type":"Email","label":"Perso","value":"sidki@cmpe.ma","contact":null},{"id":7,"type":"Email","label":"Perso","value":"drsidki@yahoo.fr","contact":null}],"email":"drsidki@yahoo.fr","mobile":"(+212) 661 936 473","landline":null},{"id":4,"fname":null,"lname":"Installator","webSite":"www.installator.com","city":"Casablanca","notes":"Tr\u00c3\u00a9s grand fournisseur avec grand atelier boiserie","type":"company","infos":[{"id":8,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 404 201","contact":null},{"id":9,"type":"Address","label":"Si\u00e8ge","value":" 5, rue de l' Oc\u00c3\u00a9an 20300","contact":null},{"id":10,"type":"Email","label":"Si\u00e8ge","value":"contact@installator.com","contact":null}],"email":"contact@installator.com","mobile":null,"landline":"(+212) 522 404 201"},{"id":5,"fname":null,"lname":"Continental Trading Company","webSite":null,"city":"Casablanca","notes":"Ou \u00c3\u00a0 travaill\u00c3\u00a9 ami iliass jawad abdelati importateur non poseur - importateur non poseur\r\n\r\n","type":"company","infos":[{"id":11,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 405 628","contact":null},{"id":12,"type":"Address","label":"Si\u00e8ge","value":"Rue de Rethel, r\u00c3\u00a9sid. Bahja, Belv\u00c3\u00a9d\u00c3\u00a8re","contact":null},{"id":13,"type":"Email","label":"Si\u00e8ge","value":"continental@wanadoopro.ma","contact":null},{"id":14,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 405 850","contact":null},{"id":15,"type":"Address","label":"Si\u00e8ge","value":"Angle Amr Bnou AI Ass et Rue Oc\u00c3\u00a9an, Imm.D 3\u00c3\u00a9me \u00c3\u00a9tage Roches Noires Casablanca","contact":null}],"email":"continental@wanadoopro.ma","mobile":null,"landline":"(+212) 522 405 850"},{"id":6,"fname":null,"lname":"CMPE","webSite":"www.cmpe.ma\/","city":"Casablanca","notes":"Tr\u00c3\u00a9s r\u00c3\u00a9actifs\r\ngrande entreprise","type":"company","infos":[{"id":16,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 524 611 961","contact":null},{"id":17,"type":"Address","label":"Si\u00e8ge","value":"Angle rue Rocroy et Buzancy 20000","contact":null}],"email":null,"mobile":null,"landline":"(+212) 524 611 961"},{"id":7,"fname":null,"lname":"PIC Maroc","webSite":"www.picmaroc.com","city":"Mohammedia","notes":null,"type":"company","infos":[{"id":18,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 523 317 606","contact":null},{"id":19,"type":"Address","label":"Si\u00e8ge","value":"6, Av. Hassan II - 20800","contact":null}],"email":null,"mobile":null,"landline":"(+212) 523 317 606"},{"id":8,"fname":null,"lname":"Meiser","webSite":"www.meiser.de","city":"Mohammedia","notes":"produit caillebortis utilis\u00c3\u00a9 a cdm","type":"company","infos":[{"id":20,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 523 312 948","contact":null},{"id":21,"type":"Address","label":"Si\u00e8ge","value":"Zone Industrielle sud ouest - Lot 118","contact":null},{"id":22,"type":"Email","label":"Si\u00e8ge","value":"meiseregl@meiser.ma","contact":null}],"email":"meiseregl@meiser.ma","mobile":null,"landline":"(+212) 523 312 948"},{"id":9,"fname":null,"lname":"Richebois","webSite":"www.richebois.ma","city":"Casablanca","notes":null,"type":"company","infos":[{"id":23,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 354 960","contact":null},{"id":24,"type":"Email","label":"Si\u00e8ge","value":"contacts@richebois.net","contact":null},{"id":25,"type":"Address","label":"Si\u00e8ge","value":"rue des Cascades d'Ouzoud, angle Abdelouahed ElMarrakouchi - 20250 Casablanca","contact":null},{"id":26,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 354 978","contact":null}],"email":"contacts@richebois.net","mobile":null,"landline":"(+212) 522 354 978"},{"id":10,"fname":null,"lname":"CPNA","webSite":"www.cpna.ma","city":"Casablanca","notes":null,"type":"company","infos":[{"id":27,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 315 421","contact":null},{"id":28,"type":"Address","label":"Si\u00e8ge","value":"408, bd Mohammed V","contact":null},{"id":29,"type":"Email","label":"Si\u00e8ge","value":"cpna@cpna.ma","contact":null}],"email":"cpna@cpna.ma","mobile":null,"landline":"(+212) 522 315 421"},{"id":11,"fname":null,"lname":"Medisol","webSite":"www.medisol.ma","city":"Casablanca","notes":null,"type":"company","infos":[{"id":30,"type":"LandLine","label":"Si\u00c3\u00a9ge Casa","value":"(+212) 522 945 135","contact":null},{"id":31,"type":"LandLine","label":"Si\u00c3\u00a9ge Casa","value":"(+212) 522 945 132","contact":null},{"id":32,"type":"Address","label":"Si\u00c3\u00a9ge Casa","value":"138, av. Omar El Khayam, angle Banafsaj Beaus\u00c3\u00a9jour 20200 Casablanca Showrroum ","contact":null},{"id":33,"type":"Email","label":"Si\u00c3\u00a9ge Casa","value":"info@medisol.ma","contact":null},{"id":34,"type":"Address","label":"Si\u00c3\u00a9ge Casa","value":"Rabat : 8 avenue Hassan II Agdal Rabat  Maroc","contact":null}],"email":"info@medisol.ma","mobile":null,"landline":"(+212) 522 945 132"},{"id":12,"fname":null,"lname":"Espacia","webSite":"www.groupeaksal.com","city":"Casablanca","notes":null,"type":"company","infos":[{"id":35,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 207 447","contact":null},{"id":36,"type":"Address","label":"Si\u00e8ge","value":"36 Av du Phare Bourgogne","contact":null},{"id":37,"type":"Email","label":"Si\u00e8ge","value":"h.nasbi@groupeaksal.com","contact":null}],"email":"h.nasbi@groupeaksal.com","mobile":null,"landline":"(+212) 522 207 447"},{"id":13,"fname":null,"lname":"DAR SOFIA","webSite":"www.ceramique-darsofia.com","city":"Casablanca","notes":null,"type":"company","infos":[{"id":38,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 396 983","contact":null},{"id":39,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 392 951","contact":null},{"id":40,"type":"Address","label":"Si\u00e8ge","value":"184, BD Ghandib 20200","contact":null},{"id":41,"type":"Email","label":"Si\u00e8ge","value":"africa@granitifiandre.it","contact":null},{"id":42,"type":"Address","label":"Si\u00e8ge","value":"La ma\u00c3\u00aeson du carreau. 184. bd Ghandi - Casablanca","contact":null}],"email":"africa@granitifiandre.it","mobile":null,"landline":"(+212) 522 392 951"},{"id":14,"fname":null,"lname":"Jet Alu","webSite":"www.jetalu.com","city":"Rabat","notes":null,"type":"company","infos":[{"id":43,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 537 749 292","contact":null},{"id":44,"type":"Address","label":"Si\u00e8ge","value":"KM 3 Zone industrielle de Ain Atiq, Temara","contact":null},{"id":45,"type":"Email","label":"Si\u00e8ge","value":"jetalu@jetalu.com","contact":null}],"email":"jetalu@jetalu.com","mobile":null,"landline":"(+212) 537 749 292"},{"id":15,"fname":null,"lname":"Multicolles","webSite":"www.multicolles.com","city":"Casablanca","notes":null,"type":"company","infos":[{"id":46,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 355 400","contact":null},{"id":47,"type":"Address","label":"Si\u00e8ge","value":"Lot 126-127-128, Quartier Industriel Est, Ain Sebaa","contact":null},{"id":48,"type":"Email","label":"Si\u00e8ge","value":"Multicolles@multicolles.com","contact":null}],"email":"Multicolles@multicolles.com","mobile":null,"landline":"(+212) 522 355 400"},{"id":16,"fname":null,"lname":"Induflom Batibarj","webSite":"www.induflom.com","city":"Casablanca","notes":null,"type":"company","infos":[{"id":49,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 757 573","contact":null},{"id":50,"type":"Address","label":"Si\u00e8ge","value":"hay Amal III (Sidi Bernoussi), 75 rue 13","contact":null},{"id":51,"type":"Email","label":"Si\u00e8ge","value":"induflom@yahoo.fr","contact":null},{"id":52,"type":"Email","label":"Si\u00e8ge","value":"batibarj1@gmail.com","contact":null}],"email":"batibarj1@gmail.com","mobile":null,"landline":"(+212) 522 757 573"},{"id":17,"fname":null,"lname":"Cap Protect","webSite":"www.guardindustrie.fr","city":"Casablanca","notes":null,"type":"company","infos":[{"id":53,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 209 040","contact":null},{"id":54,"type":"Email","label":"Si\u00e8ge","value":"cap_protect@yahoo.com","contact":null},{"id":55,"type":"Address","label":"Si\u00e8ge","value":"Bolulevard Zerktouni, 174 n\u00c2\u00ba9 CASABLANCA","contact":null}],"email":"cap_protect@yahoo.com","mobile":null,"landline":"(+212) 522 209 040"},{"id":18,"fname":null,"lname":"Deutsch Confort","webSite":"www.deutschconfort.com","city":"Casablanca","notes":"bonne qualit\u00c3\u00a9","type":"company","infos":[{"id":56,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 944 061","contact":null},{"id":57,"type":"Address","label":"Si\u00e8ge","value":"11 rue hounaine, quartier racine","contact":null},{"id":58,"type":"Email","label":"Si\u00e8ge","value":"deutschconfort@menara.ma","contact":null}],"email":"deutschconfort@menara.ma","mobile":null,"landline":"(+212) 522 944 061"},{"id":19,"fname":null,"lname":"Touareg Travaux","webSite":"www.touareg-travaux.com","city":"Casablanca","notes":"Beton imprim\u00c3\u00a9 & Cir\u00c3\u00a9 & D\u00c3\u00a9sactiv\u00c3\u00a9\r\nCuvelage & Etanch\u00c3\u00a9it\u00c3\u00a9\r\nDallage industriel","type":"company","infos":[{"id":59,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 451 451","contact":null},{"id":60,"type":"Address","label":"Si\u00e8ge","value":"47, bd Moukaouama - ex R\u00c3\u00a9sistance, 1\u00c2\u00b0\u00c3\u00a9t. n\u00c2\u00b014 20500 Quartier: Gironde Casablanca","contact":null},{"id":61,"type":"Email","label":"Si\u00e8ge","value":"info@touareg-travaux.com","contact":null}],"email":"info@touareg-travaux.com","mobile":null,"landline":"(+212) 522 451 451"},{"id":20,"fname":null,"lname":"Lafarge B\u00c3\u00a9ton Et Gravel Maroc","webSite":"www.lafarge.ma","city":"Casablanca","notes":null,"type":"company","infos":[{"id":62,"type":"LandLine","label":"Si\u00e8ge","value":"(+212) 522 524 972","contact":null},{"id":63,"type":"Address","label":"Si\u00e8ge","value":"Route de Mekka. Quartier Les Cr\u00c3\u00aates","contact":null}],"email":null,"mobile":null,"landline":"(+212) 522 524 972"}]
        // this.contacts = [{"IdContact":"1","CategoryId":"5","ContactType":"Entreprise","LastName":"CIM Maroc","FirstName":null,"WebSite":"www.cim.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"2","CategoryId":"5","ContactType":"Contact","LastName":"Gueddar","FirstName":"Yassine","WebSite":null,"City":null,"Notes":null,"AvatarPath":"Yassine Gueddar.jpg","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:39:59"},{"IdContact":"3","CategoryId":"5","ContactType":"Contact","LastName":"Sidki","FirstName":"Driss","WebSite":null,"City":null,"Notes":null,"AvatarPath":"Driss Sidki.jpg","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:39:59"},{"IdContact":"4","CategoryId":"5","ContactType":"Entreprise","LastName":"Installator","FirstName":null,"WebSite":"www.installator.com","City":"Casablanca","Notes":"Tr\u00c3\u00a9s grand fournisseur avec grand atelier boiserie","AvatarPath":"\u00c3\u00a7\u00c3\u00a7& Installator.png","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"5","CategoryId":"5","ContactType":"Entreprise","LastName":"Continental Trading Company","FirstName":null,"WebSite":null,"City":"Casablanca","Notes":"Ou \u00c3\u00a0 travaill\u00c3\u00a9 ami iliass jawad abdelati importateur non poseur - importateur non poseur\r\n\r\n","AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"6","CategoryId":"5","ContactType":"Entreprise","LastName":"CMPE","FirstName":null,"WebSite":"www.cmpe.ma\/","City":"Casablanca","Notes":"Tr\u00c3\u00a9s r\u00c3\u00a9actifs\r\ngrande entreprise","AvatarPath":"\u00c3\u00a7\u00c3\u00a7& CMPE.jpg","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"7","CategoryId":"5","ContactType":"Entreprise","LastName":"PIC Maroc","FirstName":null,"WebSite":"www.picmaroc.com","City":"Mohammedia","Notes":null,"AvatarPath":"\u00c3\u00a7\u00c3\u00a7& PIC Maroc.jpg","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:39:59"},{"IdContact":"8","CategoryId":"6","ContactType":"Entreprise","LastName":"Meiser","FirstName":null,"WebSite":"www.meiser.de","City":"Mohammedia","Notes":"produit caillebortis utilis\u00c3\u00a9 a cdm","AvatarPath":"\u00c3\u00a7\u00c3\u00a7& Meiser.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"9","CategoryId":"5","ContactType":"Entreprise","LastName":"Richebois","FirstName":null,"WebSite":"www.richebois.ma","City":"Casablanca","Notes":null,"AvatarPath":"\u00c3\u00a7\u00c3\u00a7& Richebois.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:39:59"},{"IdContact":"10","CategoryId":"5","ContactType":"Entreprise","LastName":"CPNA","FirstName":null,"WebSite":"www.cpna.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"11","CategoryId":"5","ContactType":"Entreprise","LastName":"Medisol","FirstName":null,"WebSite":"www.medisol.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"12","CategoryId":"5","ContactType":"Entreprise","LastName":"Espacia","FirstName":null,"WebSite":"www.groupeaksal.com","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"13","CategoryId":"5","ContactType":"Entreprise","LastName":"DAR SOFIA","FirstName":null,"WebSite":"www.ceramique-darsofia.com","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"14","CategoryId":"5","ContactType":"Entreprise","LastName":"Jet Alu","FirstName":null,"WebSite":"www.jetalu.com","City":"Rabat","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"15","CategoryId":"5","ContactType":"Entreprise","LastName":"Multicolles","FirstName":null,"WebSite":"www.multicolles.com","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"16","CategoryId":"5","ContactType":"Entreprise","LastName":"Induflom Batibarj","FirstName":null,"WebSite":"www.induflom.com","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"17","CategoryId":"5","ContactType":"Entreprise","LastName":"Cap Protect","FirstName":null,"WebSite":"www.guardindustrie.fr","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"},{"IdContact":"18","CategoryId":"5","ContactType":"Entreprise","LastName":"Deutsch Confort","FirstName":null,"WebSite":"www.deutschconfort.com","City":"Casablanca","Notes":"bonne qualit\u00c3\u00a9","AvatarPath":"Deutsch Confort.jpg","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"19","CategoryId":"5","ContactType":"Entreprise","LastName":"Touareg Travaux","FirstName":null,"WebSite":"www.touareg-travaux.com","City":"Casablanca","Notes":"Beton imprim\u00c3\u00a9 & Cir\u00c3\u00a9 & D\u00c3\u00a9sactiv\u00c3\u00a9\r\nCuvelage & Etanch\u00c3\u00a9it\u00c3\u00a9\r\nDallage industriel","AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-29 01:43:02"},{"IdContact":"20","CategoryId":"6","ContactType":"Entreprise","LastName":"Lafarge B\u00c3\u00a9ton Et Gravel Maroc","FirstName":null,"WebSite":"www.lafarge.ma","City":"Casablanca","Notes":null,"AvatarPath":"avatar.gif","ConsultingRating":"0","Rating":"0.00","SysUpdated":"2018-04-07 22:39:59","SysCreated":"2018-04-07 21:41:31"}]

        // Check if sharing via email is supported
        this.socialSharing.canShareViaEmail().then(() => {
            this.canShareViaEmail = true
        }).catch(() => {
            // Sharing via email is not possible
            console.log("can't share via Email")
        });
    }

    ionViewDidLoad() {
        this.storage.get('user').then((user) => {
            this.role = user.roles
            console.log('Role: ', user.roles)
        })
    }

    getAll(offset) {
        this.http.get(this.url + '/contact/p/' + this.offset).map(res => res.json()).subscribe(
            data => {
                // setTimeout(() => {

                // }, 5000);


                if (offset == 1) {
                    this.contacts = data
                    this.total = data.total
                } else {
                    this.contacts = this.contacts.concat(data)
                }
                console.log('Result: ', this.contacts)
            },
            err => {
                console.log("Oops!")
            }
        )
    }

    details(contact) {
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

    searchPage() {
        this.navCtrl.push(SearchPage)
    }

    call(number) {
        console.log("call")

        this.callNumber.callNumber(number, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
    }

    whatsapp(number) {

        this.socialSharing.shareViaWhatsAppToReceiver(number, '', '', '').then(() => {
            // Success!
            console.log("whatsapp OK")
        }).catch(() => {
            // Error!
            console.log("error via whatsapp")
        });
    }

    sms(number) {
        this.socialSharing.shareViaSMS('', number).then(() => {
            // Success!
            console.log("SMS OK")
        }).catch(() => {
            // Error!
            console.log("error via SMS")
        });
    }

    mail(email) {

        // Share via email
        this.socialSharing.shareViaEmail('', '', [email]).then(() => {
            // Success!
            console.log("mail OK")
        }).catch(() => {
            // Error!
            console.log("error via Email")
        });
    }

    addtest() {
        console.log('haaaaa')
        this.http.post(
            'http://localhost:8000/contact/',
            {
                "fname": "Karima",
                "lname": "Elfan",
                "webSite": null,
                "city": "Rabat",
                "notes": null,
                "type": "contact",
                "category": 13
            }
        ).map(res => res.json()).subscribe(
            data => {

                console.log('allaaa: ', data)
            },
            err => {
                console.log("Oops!")
            }
        )

        // this.http.get('http://127.0.0.1:8000/contact/12').map(res => res.json()).subscribe(
        //     data => {
        //         console.log('Result: ', data)
        //     },
        //     err => {
        //         console.log("Oops!")
        //     }
        // )
    }

    addNewContact() {
        let popover = this.popoverCtrl.create(EditContactPage, { contact: null }, { 'cssClass': 'edit-contact' });
        popover.present({
        });
    }

}
