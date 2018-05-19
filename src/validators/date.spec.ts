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
    const date = new Date();
    const control = getDateFormControl(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate() - 1
    );
    const expectedResult = {
      pastDate: true
    };
    expect(DateValidators.pastDate(control)).toEqual(expectedResult);
  });

  it('Should pass swappedDates validation', () => {
    const date = new Date();
    const form = new FormGroup({
      firstControl: getDateFormControl(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      ),
      secondControl: getDateFormControl(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate() + 1
      )
    });
    const validator = DateValidators.swappedDates('firstControl', 'secondControl');
    expect(validator(form)).toBeNull();
  });

  it('Should fail swappedDates validation', () => {
    const date = new Date();
    const form = new FormGroup({
      firstControl: getDateFormControl(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate() + 1
      ),
      secondControl: getDateFormControl(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      )
    });
    const validator = DateValidators.swappedDates('firstControl', 'secondControl');
    const expectedResult = {
      swappedDates: true
    };
    expect(validator(form)).toEqual(expectedResult);
  });

});
