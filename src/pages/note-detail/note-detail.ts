import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NoteUpdatePage } from '../note-update/note-update';
import { Note } from '../../models/note';

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html',
})
export class NoteDetailPage {
  public note: Note;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.note = this.navParams.get('note');
  }

  public navigateToNoteUpdatePage() {
    this.navCtrl.push(NoteUpdatePage, { note: this.note });
  }

}
