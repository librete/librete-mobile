import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { TranslateModule } from '@ngx-translate/core';

import { NoteCreatePage } from './note-create';

import { CommonProvider } from '../../providers/common/common';
import { NotesProvider } from '../../providers/notes/notes';
import { CategoriesProvider } from '../../providers/categories/categories';

class NavControllerStub {}
class CommonProviderStub {}
class NotesProviderStub {}
class CategoriesProviderStub {}

let component: NoteCreatePage;
let fixture: ComponentFixture<NoteCreatePage>;

describe('Pages: NoteCreatePage', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteCreatePage],
      imports: [TranslateModule.forRoot()],
      providers: [
        FormBuilder,
        { provide: NavController, useClass: NavControllerStub },
        { provide: CommonProvider, useClass: CommonProviderStub },
        { provide: NotesProvider, useClass: NotesProviderStub },
        { provide: CategoriesProvider, useClass: CategoriesProviderStub }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCreatePage);
    component = fixture.componentInstance;
  });

  function updateForm(data, allowEmpty = false) {
    for (const key in data) {
      if (data[key] || allowEmpty) {
        component.form.get(key).setValue(data[key]);
      }
    }
  }

  it('Should be valid', () => {
    const date = new Date().toISOString().substr(0, 10);

    const data = {
      name: 'Note name',
      category: 'https://example.com/api/categories/1/',
      text: 'Text'
    };

    updateForm(data);
    expect(component.form.valid).toBeTruthy();
    expect(component.form.value).toEqual(data);
  });

  it('Should be invalid due to missing required fields', () => {
    expect(component.form.valid).toBeFalsy();
    expect(component.name.errors['required']).toBeTruthy();
    expect(component.category.errors['required']).toBeTruthy();
    expect(component.text.errors['required']).toBeTruthy();
  });

});
