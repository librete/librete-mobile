import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavController, NavParams } from 'ionic-angular';

import { Note } from '../../models/note';

import { NoteUpdatePage } from '../note-update/note-update';

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html',
})
export class NoteDetailPage {
  public note: Note;
  public translationParams = {
    createdAt: {},
    updatedAt: {}
  };

  constructor(
    private _datePipe: DatePipe,
    private _navCtrl: NavController,
    private _navParams: NavParams
  ) {
    this.note = this._navParams.get('note');

    this.translationParams.createdAt = this._formatDate(this.note.createdAt);
    this.translationParams.updatedAt = this._formatDate(this.note.updatedAt);
  }

  public navigateToUpdatePage() {
    this._navCtrl.push(NoteUpdatePage, { note: this.note });
  }

  private _formatDate(date: Date): object {
    const dateFormat = 'dd.MM';
    const timeFormat = 'HH:mm';

    return {
      date: this._datePipe.transform(date, dateFormat),
      time: this._datePipe.transform(date, timeFormat),
    };
  }

}
