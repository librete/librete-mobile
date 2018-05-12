import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { NotesProvider } from './../../providers/notes/notes';
import { NoteDetailPage } from './../note-detail/note-detail';
import { Note } from '../../models/note';

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

  public navigateToDetail(note: Note) {
    this.navCtrl.push(NoteDetailPage, { note: note });
  }
}
