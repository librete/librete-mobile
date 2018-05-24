import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Note } from '../../models/note';

import { NoteUpdatePage } from '../note-update/note-update';

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html',
})
export class NoteDetailPage {
  public note: Note;

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {
    this.note = this._navParams.get('note');
  }

  public navigateToUpdatePage() {
    this._navCtrl.push(NoteUpdatePage, { note: this.note });
  }

}
