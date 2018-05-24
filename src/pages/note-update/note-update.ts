import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Note } from '../../models/note';

import { CommonProvider } from '../../providers/common/common';
import { NotesProvider } from '../../providers/notes/notes';
import { CategoriesProvider } from '../../providers/categories/categories';

@Component({
  selector: 'page-note-update',
  templateUrl: 'note-update.html',
})
export class NoteUpdatePage {
  public note: Note;
  public form: FormGroup;
  public isSubmitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _commonProvider: CommonProvider,
    private _notesProvider: NotesProvider,
    private _categoriesProvider: CategoriesProvider,
  ) {
    this.note = this._navParams.get('note');
    this._createForm();
  }

  public get categories() {
    return this._categoriesProvider.categories.getValue();
  }

  public get name() {
    return this.form.get('name');
  }

  public get category() {
    return this.form.get('category');
  }

  public get text() {
    return this.form.get('text');
  }

  public updateNote() {
    this.isSubmitted = true;
    this._notesProvider.updateNote(this.note.url, this.form.value).then(
      data => {
        this._navCtrl.pop();
      },
      error => {
        for (let key in error.error) {
          key = this._commonProvider.toCamelCase(key);
          if (this.form.get(key)) {
            this.form.get(key).setErrors({
              remote: error.error[key]
            });
          }
        }
      }
    );
  }

  private _createForm() {
    this.form = this._formBuilder.group({
      name: [this.note.name, [Validators.required]],
      category: [this.note.categoryUrl, [Validators.required]],
      text: [this.note.text, [Validators.required]],
    });
  }

}
