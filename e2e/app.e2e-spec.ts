import { AppPage } from './app.po';
import { browser, until } from 'protractor';

describe('weather-demo App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Weather Forcast Demo Application');
  });

  it('should load forcast data for London,gb', () => {
    page.navigateTo();
    page.getCityNameInputText().sendKeys('London,gb');
    page.getSearchButton().click().then(() => {
      browser.waitForAngular().then(() => {
        expect(page.getDataTableBodyRowForcaseCityId()).toEqual(10);
      });
    });

  });

  it('should nod add duplicate forcast data for London,gb', () => {
    page.navigateTo();
    page.getCityNameInputText().sendKeys('London,gb');
    page.getSearchButton().click().then(() => {
      browser.waitForAngular().then(() => {
        page.getSearchButton().click().then(() => {
          browser.waitForAngular().then(() => {
            expect(page.getDataTableBodyRowForcaseCityId()).toEqual(10);
          });
        });
      });
    });

  });

});
