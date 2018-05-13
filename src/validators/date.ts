import { FormControl, FormGroup } from '@angular/forms';

export class DateValidators {

  static pastDate(control: FormControl) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const inputDate = new Date(control.value);

    if (currentDate > inputDate) {
      return {
        pastDate: true
      };
    }

    return null;
  }

  static swappedDates(firstFieldKey: string, secondFieldKey: string) {
    return (group: FormGroup) => {
      const firstFormControl = group.controls[firstFieldKey];
      const secondFormControl = group.controls[secondFieldKey];

      const firstDateObject = new Date(firstFormControl.value);
      const secondDateObject = new Date(secondFormControl.value);

      if (firstDateObject > secondDateObject) {
        return {
          swappedDates: true
        };
      }

      return null;
    };
  }

}
