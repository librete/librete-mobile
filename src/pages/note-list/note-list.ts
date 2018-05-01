import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NotesProvider } from './../../providers/notes/notes';

@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html',
})
export class NoteListPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private notesProvider: NotesProvider) {

    notesProvider.updateNotes();
  }

  get notes() {
    return this.notesProvider.notes.getValue();
  }
}
