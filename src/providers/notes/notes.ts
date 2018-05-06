import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from './../common/common';
import { Note } from './../../models/note';


@Injectable()
export class NotesProvider {
  private _notes = new BehaviorSubject<Array<Note>>([]);

  constructor(private commonProvider: CommonProvider) {
  }

  get notes() {
    return this._notes;
  }

  public updateNotes(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this.getNotes().subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          this._notes.next(jsonConvert.deserializeArray(data.results, Note));
          resolve();
        },
        error => {
          reject();
        }
      );
    });
  }

  private getNotes() {
    return this.commonProvider.performRequest('notes/', 'GET');
  }
}
