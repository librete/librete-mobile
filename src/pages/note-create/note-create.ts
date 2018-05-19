import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { NoteDetailPage } from './../note-detail/note-detail';

import { CommonProvider } from '../../providers/common/common';
import { NotesProvider } from '../../providers/notes/notes';
import { CategoriesProvider } from '../../providers/categories/categories';

@Component({
  selector: 'page-note-create',
  templateUrl: 'note-create.html',
})
export class NoteCreatePage {
  public form: FormGroup;
  public maxDate: string;
  public minDate: string;
  public isSubmitted = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private commonProvider: CommonProvider,
    private notesProvider: NotesProvider,
    private categoriesProvider: CategoriesProvider,
  ) {
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

  public createNote() {
    this.isSubmitted = true;
    this.notesProvider.createNote(this.form.value).then(
      data => {
        this.navCtrl.push(NoteDetailPage, {'note': data});
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
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      text: ['', [Validators.required]],
    });
  }

}
