import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { SettingsProvider } from '../../providers/settings/settings';
import { EventsProvider } from '../../providers/events/events';
import { NotesProvider } from '../../providers/notes/notes';
import { TasksProvider } from '../../providers/tasks/tasks';
import { CategoriesProvider } from '../../providers/categories/categories';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public stats: object;

  constructor(
    private _translateService: TranslateService,
    private _settingsProvider: SettingsProvider,
    private _eventsProvider: EventsProvider,
    private _notesProvider: NotesProvider,
    private _tasksProvider: TasksProvider,
    private _categoriesProvider: CategoriesProvider
  ) {

    _settingsProvider.readSettings().then(
      data => {
        if (data && data.language) {
          _translateService.use(data.language);
        }
      }
    );

    this._categoriesProvider.readCategories().then(
      data => {
        Promise.all([
          this._eventsProvider.readEvents(),
          this._notesProvider.readNotes(),
          this._tasksProvider.readTasks(),
        ]).then(
          value => this._addStats()
        );
      }
    );
  }

  private _addStats() {
    this.stats = {
      'events': this._eventsProvider.events.getValue().length,
      'notes': this._notesProvider.notes.getValue().length,
      'tasks': this._tasksProvider.tasks.getValue().length
    };
  }

}
