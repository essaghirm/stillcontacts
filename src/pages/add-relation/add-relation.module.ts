import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRelationPage } from './add-relation';

@NgModule({
  declarations: [
    AddRelationPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRelationPage),
  ],
})
export class AddRelationPageModule {}
