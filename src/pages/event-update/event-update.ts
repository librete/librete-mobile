import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';

import { Event } from '../../models/event';
import { CommonProvider } from '../../providers/common/common';
import { EventsProvider } from '../../providers/events/events';
import { CategoriesProvider } from '../../providers/categories/categories';

import { DateValidators } from '../../validators/date';

@Component({
  selector: 'page-event-update',
  templateUrl: 'event-update.html',
})
export class EventUpdatePage {
  public event: Event;
  public form: FormGroup;
  public maxDate: string;
  public minDate: string;
  public isSubmitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private commonProvider: CommonProvider,
    private eventsProvider: EventsProvider,
    private categoriesProvider: CategoriesProvider,
    private datePipe: DatePipe
  ) {
    this.event = this.navParams.get('event');
    this.createForm();

    const minDateObject = new Date();
    const maxDateObject = new Date();
    maxDateObject.setFullYear(maxDateObject.getFullYear() + 10);
    this.minDate = this.datePipe.transform(minDateObject, 'yyyy-MM-dd');
    this.maxDate = this.datePipe.transform(maxDateObject, 'yyyy-MM-dd');
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

  public get startDate() {
    return this.form.get('startDate');
  }

  public get endDate() {
    return this.form.get('endDate');
  }

  public get location() {
    return this.form.get('location');
  }

  public get description() {
    return this.form.get('description');
  }

  public updateEvent() {
    this.isSubmitted = true;
    this.eventsProvider.updateEvent(this.event.url, this.form.value).then(
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
      name: [this.event.name, [Validators.required]],
      category: [this.event.categoryUrl, [Validators.required]],
      startDate: [this.event.startDate, [Validators.required, DateValidators.pastDate]],
      endDate: [this.event.endDate, [Validators.required, DateValidators.pastDate]],
      location: [this.event.location, [Validators.required]],
      description: this.event.description,
    }, { validator: DateValidators.swappedDates('startDate', 'endDate') });
  }

}
