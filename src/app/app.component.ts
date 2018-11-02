import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SearchPage } from '../pages/search/search';
import { Storage } from '@ionic/storage';
import { CategoryPage } from '../pages/category/category';
import { UsersPage } from '../pages/users/users';
import { DiagnosticPage } from '../pages/diagnostic/diagnostic';
import { DetailPage } from '../pages/detail/detail';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = SearchPage;

    pages: Array<{ title: string, class: string, component: any }>;
    user: any

    CategoryPage: any
    UsersPage: any
    DiagnosticPage: any
    SearchPage: any

    constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private storage: Storage, private app: App, private alertCtrl: AlertController) {

        this.pages = [
            { title: 'Contactes', class: 'contact', component: HomePage },
            { title: 'Gestion des categories', class: 'category', component: CategoryPage },
            { title: 'gestion des utilisateurs', class: 'users', component: UsersPage },
            { title: 'Diagnostic', class: 'diagnostic', component: DiagnosticPage },
            { title: 'Mon compte', class: 'account', component: SearchPage }
        ];

        this.CategoryPage = CategoryPage
        this.UsersPage = UsersPage
        this.DiagnosticPage = DiagnosticPage
        this.SearchPage = SearchPage

        // Or to get a key/value pair
        setTimeout(() => {

            storage.get('status').then((val) => {
                if (val == 'connected') {
                    console.log('already connected !')
                    storage.get('user').then((val) => {
                        this.user = val
                        console.log('user', val)
                    })
                    this.rootPage = SearchPage
                } else {
                    this.rootPage = LoginPage
                    console.log('not connected !')
                }
            });

        }, 100)

        platform.ready().then(() => {
            platform.registerBackButtonAction(() => {

                let nav = app.getActiveNavs()[0];
                let activeView = nav.getActive();                

                if(activeView.name === "SearchPage") {

                    if (nav.canGoBack()){ //Can we go back?
                        nav.pop();
                    } else {
                        const alert = this.alertCtrl.create({
                            title: 'Arrêt de l\'application',
                            message: 'Voulez-vous fermer l\'application?',
                            buttons: [{
                                text: 'Annuler',
                                role: 'cancel',
                                handler: () => {
                                    console.log('Application exit prevented!');
                                }
                            },{
                                text: 'Fermer',
                                handler: () => {
                                    this.platform.exitApp(); // Close this application
                                }
                            }]
                        });
                        alert.present();
                    }
                }else{
                    if (nav.canGoBack()){ //Can we go back?
                        nav.pop();
                    }
                }
            });
        });

    }

    initializeApp() {

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString('#ff9800');
            this.splashScreen.hide();
        });



    }

    openPage(component) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(component);
    }

    signOut() {
        this.storage.remove('status').then(() => {
            this.nav.setRoot(LoginPage)
        })
    }



}
