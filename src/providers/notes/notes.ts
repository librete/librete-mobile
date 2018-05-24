import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { JsonConvert } from 'json2typescript';

import { CommonProvider } from '../common/common';
import { CategoriesProvider } from '../categories/categories';
import { Note } from '../../models/note';

@Injectable()
export class NotesProvider {
  private _notes = new BehaviorSubject<Array<Note>>([]);

  constructor(
    private _commonProvider: CommonProvider,
    private _categoriesProvider: CategoriesProvider
  ) {}

  public get notes() {
    return this._notes;
  }

  public readNotes(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      this._commonProvider.performRequest('notes/', 'GET').subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();

          const notes: Array<Note> = jsonConvert.deserializeArray(data.results, Note);
          for (const note of notes) {
            this._setCategory(note);
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

  public createNote(data: any) {
    return new Promise ((resolve, reject) => {
      this._commonProvider.performRequest('notes/', 'POST', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const note: Note = jsonConvert.deserialize(data, Note);
          const notes: Array<Note> = this._notes.getValue();
          this._setCategory(note);
          notes.push(note);
          resolve(note);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public updateNote(url: string, data: any) {
    return new Promise ((resolve, reject) => {
      data.start_date = new Date(data.startDate);
      data.end_date = new Date(data.endDate);
      this._commonProvider.performRequest(url, 'PUT', data).subscribe(
        (data: any) => {
          const jsonConvert: JsonConvert = new JsonConvert();
          const note: Note = jsonConvert.deserialize(data, Note);
          const notes: Array<Note> = this._notes.getValue();
          const index = notes.findIndex(x => x.url === url);

          this._setCategory(note);
          notes[index] = Object.assign(notes[index], note);

          resolve(note);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  public deleteNote(url: string) {
    return new Promise ((resolve, reject) => {
      this._commonProvider.performRequest(url, 'DELETE').subscribe(
        (data: any) => {
          const notes: Array<Note> = this._notes.getValue();
          const index = notes.findIndex(x => x.url === url);
          notes.splice(index, 1);
          resolve();
        },
        error => {
          reject(error);
        }
      );
    });
  }

  private _setCategory(note) {
    note.category = this._categoriesProvider.categories.getValue().find(
      category => category.url === note.categoryUrl
    );
  }

}
