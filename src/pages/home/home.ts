import { Component, ElementRef, ViewChild } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'chart.js';

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

  constructor(
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
          }
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
    let events = this._eventsProvider.events.getValue();
    let notes = this._notesProvider.notes.getValue();
    let tasks = this._tasksProvider.tasks.getValue();
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

  private _createChart(type, canvas, labels, datasets) {
    return new Chart(canvas.nativeElement, {
      type: type,
      data: {
        labels: labels,
        datasets: datasets
      }
    });
  }

}
