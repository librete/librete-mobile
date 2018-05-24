import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Note } from '../../models/note';

import { NoteDetailPage } from '../note-detail/note-detail';
import { NoteCreatePage } from '../note-create/note-create';

import { NotesProvider } from '../../providers/notes/notes';

@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html',
})
export class NoteListPage {

  constructor(
    private _navCtrl: NavController,
    private _notesProvider: NotesProvider
  ) {
    _notesProvider.readNotes();
  }

  public get notes() {
    return this._notesProvider.notes.getValue();
  }

  public navigateToDetailPage(note: Note) {
    this._navCtrl.push(NoteDetailPage, { note: note });
  }

  public navigateToCreatePage() {
    this._navCtrl.push(NoteCreatePage);
  }

}
