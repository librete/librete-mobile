import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'chart.js';

import { Event } from '../../models/event';
import { Note } from '../../models/note';
import { Task } from '../../models/task';

import { EventDetailPage } from '../event-detail/event-detail';
import { NoteDetailPage } from '../note-detail/note-detail';
import { TaskDetailPage } from '../task-detail/task-detail';

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
  @ViewChild('activityCanvas') activityCanvas: ElementRef;

  public stats: object;
  public upcoming = 'events';
  public latest = 'events';
  public upcomingEvents: Array<Event>;
  public upcomingTasks: Array<Task>;
  public latestEvents: Array<Event>;
  public latestNotes: Array<Note>;
  public latestTasks: Array<Task>;

  constructor(
    private _navCtrl: NavController,
    private _translateService: TranslateService,
    private _settingsProvider: SettingsProvider,
    private _eventsProvider: EventsProvider,
    private _notesProvider: NotesProvider,
    private _tasksProvider: TasksProvider,
    private _categoriesProvider: CategoriesProvider
  ) {

    this._settingsProvider.readSettings().then(
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
          value => {
            this._addStats();
            this._displayActivityChart('line');
            this._displayOverview();
          }
        );
      }
    );
  }

  private get events() {
    return this._eventsProvider.events.getValue();
  }

  private get notes() {
    return this._notesProvider.notes.getValue();
  }

  private get tasks() {
    return this._tasksProvider.tasks.getValue();
  }

  private get chartLabels() {
    const currentYear = new Date().getFullYear();
    const labels = [];

    for (let i = 1; i < 13; i++) {
      let month = String(i);
      if (i < 10) {
        month = '0' + month;
      }
      labels.push(`${month}.${currentYear}`);
    }
    return labels;
  }

  private get chartValues() {
    let events = this.events;
    let notes = this.notes;
    let tasks = this.tasks;
    const currentYear = new Date().getFullYear();

    function filterByYear(items, year, field) {
      return items.filter(item => {
        return (new Date(item[field]).getFullYear() === year);
      });
    }

    function groupByMonth(events, key) {
      return events.reduce(function (accumulator, x) {
        (accumulator[new Date(x[key]).getMonth() + 1] = accumulator[new Date(x[key]).getMonth() + 1] || []).push(x);
        return accumulator;
      }, {});
    }

    events = filterByYear(events, currentYear, 'startDate');
    notes = filterByYear(notes, currentYear, 'createdAt');
    tasks = filterByYear(tasks, currentYear, 'startDate');

    const groupedData = {};
    groupedData['events'] = groupByMonth(events, 'startDate');
    groupedData['notes'] = groupByMonth(notes, 'createdAt');
    groupedData['tasks'] = groupByMonth(tasks, 'startDate');

    const values = {};
    values['events'] = new Array(12).fill(0);
    values['notes'] = new Array(12).fill(0);
    values['tasks'] = new Array(12).fill(0);

    for (const type in groupedData) {
      const data = groupedData[type];
      for (const key in data) {
        values[type][key] = data[key].length;
      }
    }
    return values;
  }

  public navigateToDetailPage(item: Event | Note | Task) {
    if (item instanceof Event) {
      this._navCtrl.push(EventDetailPage, { event: item });
    } else if (item instanceof Note) {
      this._navCtrl.push(NoteDetailPage, { note: item });
    } else {
      this._navCtrl.push(TaskDetailPage, { task: item });
    }
  }

  private _addStats() {
    this.stats = {
      'events': this.events.length,
      'notes': this.notes.length,
      'tasks': this.tasks.length
    };
  }

  private _displayActivityChart(type) {
    let eventChartLabel = 'Events';
    let notesChartLabel = 'Notes';
    let tasksChartLabel = 'Tasks';

    this._translateService.get([
      'home.charts.activity.events',
      'home.charts.activity.notes',
      'home.charts.activity.tasks'
    ]).subscribe(
      values => {
        eventChartLabel = values['home.charts.activity.events'];
        notesChartLabel = values['home.charts.activity.notes'];
        tasksChartLabel = values['home.charts.activity.tasks'];
      }
    );

    const chartDatasets = [
      {
        label: eventChartLabel,
        data: this.chartValues['events'],
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        scaleStartValue: 0
      },
      {
        label: notesChartLabel,
        hidden: true,
        data: this.chartValues['notes'],
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        scaleStartValue: 0
      },
      {
        label: tasksChartLabel,
        hidden: true,
        data: this.chartValues['tasks'],
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        scaleStartValue: 0
      }
    ];

    this._createChart(type, this.activityCanvas, this.chartLabels, chartDatasets);
  }

  private _createChart(type, canvas, labels, datasets) {
    return new Chart(canvas.nativeElement, {
      type: type,
      data: {
        labels: labels,
        datasets: datasets
      }
    });
  }

  private _displayOverview() {

    function filter(items: Array<any>, date: Date, field: string) {
      return items.filter(item => {
        return (new Date(item[field]).getTime() > date.getTime());
      });
    }

    function sort(items: Array<any>, field: string, descending = false) {
      return items.sort((a: Event | Note | Task, b: Event | Note | Task) => {
        if (a[field] > b[field]) {
          return descending ? -1 : 1;
        } else if (a[field] < b[field]) {
          return descending ? 1 : -1;
        }
        return 0;
      });
    }

    const currentDate = new Date();

    const events = filter(this.events, currentDate, 'startDate');
    this.upcomingEvents = sort(events, 'startDate').slice(0, 5);

    const tasks = filter(this.tasks, currentDate, 'startDate');
    this.upcomingTasks = sort(tasks, 'startDate').slice(0, 5);

    this.latestEvents = sort(this.events, 'createdAt', true).slice(0, 5);
    this.latestNotes = sort(this.notes, 'createdAt', true).slice(0, 5);
    this.latestTasks = sort(this.tasks, 'createdAt', true).slice(0, 5);
  }

}
