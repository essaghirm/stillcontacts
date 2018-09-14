import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
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

  rootPage: any = DiagnosticPage;

  pages: Array<{ title: string, class: string, component: any }>;
  user: any

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {

    this.pages = [
      { title: 'Contactes', class: 'contact', component: HomePage },
      { title: 'Gestion des categories', class: 'category', component: CategoryPage },
      { title: 'gestion des utilisateurs', class: 'users', component: UsersPage },
      { title: 'Diagnostic', class: 'diagnostic', component: DiagnosticPage },
      { title: 'Mon compte', class: 'account', component: SearchPage }
    ];

    // Or to get a key/value pair
    setTimeout(() => {
      
      storage.get('status').then((val) => {
        if (val == 'connected') {
          console.log('already connected !')
          storage.get('user').then((val) => {
            this.user = val
            console.log('user', val)
          })
          this.rootPage = DiagnosticPage
        } else {
          // this.rootPage = LoginPage
          console.log('not connected !')
        }
      });

    }, 100)


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      // statusBar.styleDefault();


      // let status bar overlay webview
      statusBar.overlaysWebView(true);
      // set status bar to white
      statusBar.backgroundColorByHexString('#607D8B');
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut(){
    this.storage.remove('status').then(() => {
      this.nav.setRoot(LoginPage)
    })
  }
}
