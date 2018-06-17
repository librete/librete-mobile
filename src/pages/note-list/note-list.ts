import { Component } from '@angular/core';
import { AlertController, ItemSliding, NavController } from 'ionic-angular';

import { Note } from '../../models/note';

import { NoteDetailPage } from '../note-detail/note-detail';
import { NoteCreatePage } from '../note-create/note-create';
import { NoteUpdatePage } from '../note-update/note-update';

import { CommonProvider } from '../../providers/common/common';
import { NotesProvider } from '../../providers/notes/notes';

@Component({
  selector: 'page-note-list',
  templateUrl: 'note-list.html',
})
export class NoteListPage {
  public orderBy = 'createdAt';
  public orderType = 'ascending';

  constructor(
    private _alertCtrl: AlertController,
    private _navCtrl: NavController,
    private _commonProvider: CommonProvider,
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

  public navigateToUpdatePage(note: Note, item: ItemSliding) {
    this._navCtrl.push(NoteUpdatePage, { note: note });
    item.close();
  }

  public deleteNote(note) {
    const confirm = this._alertCtrl.create({
      title: 'Are you sure?',
      message: `Are you sure that you want to delete "${note.name}"`,
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this._notesProvider.deleteNote(note.url);
          }
        }
      ]
    });
    confirm.present();
  }

  public sortNotes() {
    this._commonProvider.sort(this.notes, this.orderBy, this.orderType === 'ascending');
  }

}
