import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

}
