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

  public updateNote(url: string, data: any) {
    return new Promise ((resolve, reject) => {
      data.start_date = new Date(data.startDate);
      data.end_date = new Date(data.endDate);
      this.commonProvider.performRequest(url, 'PUT', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const note: Note = jsonConvert.deserialize(data, Note);
          const notes: Array<Note> = this._notes.getValue();
          const index = notes.findIndex(x => x.url === url);

          this.setCategory(note);
          notes[index] = Object.assign(notes[index], note);

          resolve(note);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public createNote(data: any) {
    return new Promise ((resolve, reject) => {
      this.commonProvider.performRequest('notes/', 'POST', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const note: Note = jsonConvert.deserialize(data, Note);
          const notes: Array<Note> = this._notes.getValue();
          this.setCategory(note);
          notes.push(note);
          resolve(note);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public updateNotes(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this.getNotes().subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();

          const notes: Array<Note> = jsonConvert.deserializeArray(data.results, Note);
          for (const note of notes) {
            this.setCategory(note);
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

  private setCategory(note) {
    note.category = this.categoriesProvider.categories.getValue().filter(
      category => category.url === note.categoryUrl
    )[0];
  }
}
