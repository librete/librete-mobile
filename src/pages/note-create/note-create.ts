import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { NoteDetailPage } from '../note-detail/note-detail';

import { CommonProvider } from '../../providers/common/common';
import { NotesProvider } from '../../providers/notes/notes';
import { CategoriesProvider } from '../../providers/categories/categories';

@Component({
  selector: 'page-note-create',
  templateUrl: 'note-create.html',
})
export class NoteCreatePage {
  public form: FormGroup;
  public isSubmitted = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _navCtrl: NavController,
    private _commonProvider: CommonProvider,
    private _notesProvider: NotesProvider,
    private _categoriesProvider: CategoriesProvider,
  ) {
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

  public createNote() {
    this.isSubmitted = true;
    this._notesProvider.createNote(this.form.value).then(
      data => {
        this._navCtrl.push(NoteDetailPage, {'note': data});
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
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

}
