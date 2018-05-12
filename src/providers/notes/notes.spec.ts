import { TestBed, inject } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { CommonProvider } from './../common/common';
import { CategoriesProvider } from './../categories/categories';
import { NotesProvider } from './notes';

import { Category } from './../../models/category';
import { Note } from './../../models/note';

const getNotesResponse = {
  'results': [
    {
      'url': 'https://example.com/api/notes/1/',
      'name': 'Note name',
      'author': 'https://example.com/api/authors/1/',
      'category': 'https://example.com/api/categories/1/',
      'created_at': '2018-04-01T06:23:05.288858Z',
      'updated_at': '2018-04-01T06:23:05.288906Z',
      'text': 'Text',
    },
    {
      'url': 'https://example.com/api/notes/2/',
      'name': 'Note name 2',
      'author': 'https://example.com/api/authors/1/',
      'category': 'https://example.com/api/categories/2/',
      'created_at': '2018-04-01T06:26:01.288858Z',
      'updated_at': '2018-04-01T06:26:01.288858Z',
      'text': 'Text 2'
    }
  ]
};

class CommonProviderStub {

  public performRequest(relativeUrl: string,
    requestMethod: string,
    requestData?: object | HttpParams): Observable<Object> {
    return Observable.of(getNotesResponse);
  }
}

class CategoriesProviderStub {

  get categories() {
    const categoryList: Array<Category> = [this.createCategory(1), this.createCategory(2)];
    return new BehaviorSubject<Array<Category>>(categoryList);
  }

  private createCategory(id) {
    const category = new Category();
    category.url = `https://example.com/api/categories/${id}/`;
    category.name = `Category ${id}`;
    return category;
  }
}

describe('Providers: NotesProvider', () => {
  let provider;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      NotesProvider,
      { provide: CommonProvider, useClass: CommonProviderStub },
      { provide: CategoriesProvider, useClass: CategoriesProviderStub },
    ]
  }));

  beforeEach(inject([NotesProvider], notesProvider => {
    provider = notesProvider;
  }));


  it('Should update notes', (done) => {

    provider.updateNotes().then(
      data => {
        const notes = provider.notes.getValue();
        expect(notes.length).toBe(getNotesResponse.results.length);
        for (const note of notes) {
          expect(note).toEqual(jasmine.any(Note));
          expect(note.category).toEqual(jasmine.any(Category));
          expect(note.categoryUrl).toEqual(note.category.url);
        }
        done();
      }
    );

  });

});
