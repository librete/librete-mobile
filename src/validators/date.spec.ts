import { TestBed, inject } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { DateValidators } from './date';

describe('Validators: DateValidators', () => {

  function getDateFormControl(year, month, date) {
    const dateString = `${year}-${month}-${date}`;
    return new FormControl(dateString);
  }

  it('Should pass pastDate validation', () => {
    const date = new Date();
    const control = getDateFormControl(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    expect(DateValidators.pastDate(control)).toBeNull();
  });

  it('Should fail pastDate validation', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const control = getDateFormControl(
      yesterday.getFullYear(),
      yesterday.getMonth() + 1,
      yesterday.getDate()
    );
    const expectedResult = {
      pastDate: true
    };
    expect(DateValidators.pastDate(control)).toEqual(expectedResult);
  });

  it('Should pass swappedDates validation', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const form = new FormGroup({
      firstControl: getDateFormControl(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      ),
      secondControl: getDateFormControl(
        tomorrow.getFullYear(),
        tomorrow.getMonth() + 1,
        tomorrow.getDate()
      )
    });
    const validator = DateValidators.swappedDates('firstControl', 'secondControl');
    expect(validator(form)).toBeNull();
  });

  it('Should fail swappedDates validation', () => {
    const today = new Date();
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1);

    const form = new FormGroup({
      firstControl: getDateFormControl(
        tomorrow.getFullYear(),
        tomorrow.getMonth() + 1,
        tomorrow.getDate()
      ),
      secondControl: getDateFormControl(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      )
    });
    const validator = DateValidators.swappedDates('firstControl', 'secondControl');
    const expectedResult = {
      swappedDates: true
    };
    expect(validator(form)).toEqual(expectedResult);
  });

});
