import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from './../common/common';
import { CategoriesProvider } from './../categories/categories';
import { Note } from './../../models/note';


@Injectable()
export class NotesProvider {
  private _notes = new BehaviorSubject<Array<Note>>([]);

  constructor(private commonProvider: CommonProvider,
    private categoriesProvider: CategoriesProvider) {
  }

  get notes() {
    return this._notes;
  }

  public updateNotes(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this.getNotes().subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();

          const notes: Array<Note> = jsonConvert.deserializeArray(data.results, Note);
          for (const note of notes) {
            note.category = this.categoriesProvider.categories.getValue().filter(
              category => category.url === note.categoryUrl
            )[0];
          }
          this._notes.next(notes);

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
