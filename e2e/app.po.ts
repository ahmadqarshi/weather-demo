import { browser, element, by, Key } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getCityNameInputText() {
    return element.all(by.css('app-root input')).first();
  }

  getSearchButton() {
    return element(by.css('#btnSearch'));
  }

  getDataTableNoDataFoundSpan() {
    return element(by.css('p-datatable tr td span'));
  }

  getDataTableBodyRowForcaseCityId() {
    return element.all(by.css('p-datatable tbody tr td span.ui-cell-data')).count();
  }
}
