/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CountriesComponentsPage, CountriesDeleteDialog, CountriesUpdatePage } from './countries.page-object';

const expect = chai.expect;

describe('Countries e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let countriesUpdatePage: CountriesUpdatePage;
    let countriesComponentsPage: CountriesComponentsPage;
    let countriesDeleteDialog: CountriesDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Countries', async () => {
        await navBarPage.goToEntity('countries');
        countriesComponentsPage = new CountriesComponentsPage();
        expect(await countriesComponentsPage.getTitle()).to.eq('testApp.countries.home.title');
    });

    it('should load create Countries page', async () => {
        await countriesComponentsPage.clickOnCreateButton();
        countriesUpdatePage = new CountriesUpdatePage();
        expect(await countriesUpdatePage.getPageTitle()).to.eq('testApp.countries.home.createOrEditLabel');
        await countriesUpdatePage.cancel();
    });

    it('should create and save Countries', async () => {
        const nbButtonsBeforeCreate = await countriesComponentsPage.countDeleteButtons();

        await countriesComponentsPage.clickOnCreateButton();
        await countriesUpdatePage.setCountryCodeInput('countryCode');
        expect(await countriesUpdatePage.getCountryCodeInput()).to.eq('countryCode');
        await countriesUpdatePage.save();
        expect(await countriesUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await countriesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Countries', async () => {
        const nbButtonsBeforeDelete = await countriesComponentsPage.countDeleteButtons();
        await countriesComponentsPage.clickOnLastDeleteButton();

        countriesDeleteDialog = new CountriesDeleteDialog();
        expect(await countriesDeleteDialog.getDialogTitle()).to.eq('testApp.countries.delete.question');
        await countriesDeleteDialog.clickOnConfirmButton();

        expect(await countriesComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
