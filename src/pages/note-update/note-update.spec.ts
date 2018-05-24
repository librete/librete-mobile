import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Note } from '../../models/note';

import { NoteUpdatePage } from './note-update';

import { CommonProvider } from '../../providers/common/common';
import { NotesProvider } from '../../providers/notes/notes';
import { CategoriesProvider } from '../../providers/categories/categories';

const date = new Date().toISOString().substr(0, 10);
const note = {
  name: 'Note name',
  categoryUrl: 'https://example.com/api/categories/1/',
  text: 'Note text'
};

class NavControllerStub {}
class NavParamsStub {
  public get(key): any {
    return Object.assign({}, note);
  }
}
class CommonProviderStub {}
class NotesProviderStub {}
class CategoriesProviderStub {}

let component: NoteUpdatePage;
let fixture: ComponentFixture<NoteUpdatePage>;

describe('Pages: NoteUpdatePage', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteUpdatePage],
      providers: [
        FormBuilder,
        { provide: NavController, useClass: NavControllerStub },
        { provide: NavParams, useClass: NavParamsStub },
        { provide: CommonProvider, useClass: CommonProviderStub },
        { provide: NotesProvider, useClass: NotesProviderStub },
        { provide: CategoriesProvider, useClass: CategoriesProviderStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteUpdatePage);
    component = fixture.componentInstance;
    this.note = Object.assign({}, note);
  });

  function updateForm(data, allowEmpty = false) {
    for (const key in data) {
      if (data[key] || allowEmpty) {
        component.form.get(key).setValue(data[key]);
      }
    }
  }

  function convertToFormValue(data) {
    data.category = data.categoryUrl;
    delete data.categoryUrl;
    return data;
  }

  it('Should be valid', () => {
    expect(component.form.valid).toBeTruthy();
  });

  it('Should be filled with initial data', () => {
    const formValue = convertToFormValue(this.note);

    expect(component.form.value).toEqual(formValue);
  });

  it('Should be valid after update', () => {
    const data = {
      name: 'New note name',
      category: 'https://example.com/api/categories/2/',
      text: 'New note text',
    };

    updateForm(data);

    let formValue = convertToFormValue(this.note);
    formValue = Object.assign(formValue, data);
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual(formValue);
  });

  it('Should be invalid due to missing required fields', () => {
    const data = {
      name: '',
      category: '',
      text: '',
    };

    updateForm(data, true);

    expect(component.form.valid).toBeFalsy();
    expect(component.name.errors['required']).toBeTruthy();
    expect(component.category.errors['required']).toBeTruthy();
    expect(component.text.errors['required']).toBeTruthy();
  });

});
