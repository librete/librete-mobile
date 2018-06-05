export class Settings {
  language: string;

  public static get languages() {
    return [
      {label: 'English', code: 'en'},
      {label: 'Български', code: 'bg'}
    ];
  }

  constructor(language = 'en') {
    this.language = language;
  }

}
