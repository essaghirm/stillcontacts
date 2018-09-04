import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
import { DetailPage } from '../pages/detail/detail';
import { SearchPage } from '../pages/search/search';
import { LoginPage } from '../pages/login/login';

import { EditInfoPage } from '../pages/edit-info/edit-info';
import { AddRelationPage } from '../pages/add-relation/add-relation';
import { EditContactPage } from '../pages/edit-contact/edit-contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { Clipboard } from '@ionic-native/clipboard';
import { IonicStorageModule } from '@ionic/storage';
import { ContactServicesProvider } from '../providers/contact-services/contact-services';
import { CategoryPage } from '../pages/category/category';
import { UsersPage } from '../pages/users/users';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    // TabsPage,
    DetailPage,
    SearchPage,
    LoginPage,
    EditInfoPage,
    AddRelationPage,
    EditContactPage,
    CategoryPage,
    UsersPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    // TabsPage,
    DetailPage,
    SearchPage,
    LoginPage,
    EditInfoPage,
    AddRelationPage,
    EditContactPage,
    CategoryPage,
    UsersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    CallNumber,
    Clipboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactServicesProvider
  ]
})
export class AppModule {}
