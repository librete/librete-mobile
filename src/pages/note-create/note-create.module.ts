import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoteCreatePage } from './note-create';

@NgModule({
  declarations: [
    NoteCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(NoteCreatePage),
  ],
})
export class NoteCreatePageModule {}
