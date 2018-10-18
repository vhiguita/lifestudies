/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CountryLocationComponentsPage, CountryLocationDeleteDialog, CountryLocationUpdatePage } from './country-location.page-object';

const expect = chai.expect;

describe('CountryLocation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let countryLocationUpdatePage: CountryLocationUpdatePage;
    let countryLocationComponentsPage: CountryLocationComponentsPage;
    let countryLocationDeleteDialog: CountryLocationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load CountryLocations', async () => {
        await navBarPage.goToEntity('country-location');
        countryLocationComponentsPage = new CountryLocationComponentsPage();
        expect(await countryLocationComponentsPage.getTitle()).to.eq('testApp.countryLocation.home.title');
    });

    it('should load create CountryLocation page', async () => {
        await countryLocationComponentsPage.clickOnCreateButton();
        countryLocationUpdatePage = new CountryLocationUpdatePage();
        expect(await countryLocationUpdatePage.getPageTitle()).to.eq('testApp.countryLocation.home.createOrEditLabel');
        await countryLocationUpdatePage.cancel();
    });

    it('should create and save CountryLocations', async () => {
        const nbButtonsBeforeCreate = await countryLocationComponentsPage.countDeleteButtons();

        await countryLocationComponentsPage.clickOnCreateButton();
        await countryLocationUpdatePage.setCountryCodeInput('countryCode');
        expect(await countryLocationUpdatePage.getCountryCodeInput()).to.eq('countryCode');
        await countryLocationUpdatePage.setContentInput('content');
        expect(await countryLocationUpdatePage.getContentInput()).to.eq('content');
        await countryLocationUpdatePage.languageSelectLastOption();
        await countryLocationUpdatePage.save();
        expect(await countryLocationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await countryLocationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last CountryLocation', async () => {
        const nbButtonsBeforeDelete = await countryLocationComponentsPage.countDeleteButtons();
        await countryLocationComponentsPage.clickOnLastDeleteButton();

        countryLocationDeleteDialog = new CountryLocationDeleteDialog();
        expect(await countryLocationDeleteDialog.getDialogTitle()).to.eq('testApp.countryLocation.delete.question');
        await countryLocationDeleteDialog.clickOnConfirmButton();

        expect(await countryLocationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
