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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private commonProvider: CommonProvider,
    private notesProvider: NotesProvider,
    private categoriesProvider: CategoriesProvider,
  ) {
    this.note = this.navParams.get('note');
    this.createForm();
  }

  public get categories() {
    return this.categoriesProvider.categories.getValue();
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
    this.notesProvider.updateNote(this.note.url, this.form.value).then(
      data => {
        this.navCtrl.pop();
      },
      error => {
        for (let key in error.error) {
          key = this.commonProvider.toCamelCase(key);
          if (this.form.get(key)) {
            this.form.get(key).setErrors({remote: error.error[key]});
          }
        }
      }
    );
  }

  private createForm() {
    this.form = this.formBuilder.group({
      name: [this.note.name, [Validators.required]],
      category: [this.note.categoryUrl, [Validators.required]],
      text: [this.note.text, [Validators.required]],
    });
  }

}
