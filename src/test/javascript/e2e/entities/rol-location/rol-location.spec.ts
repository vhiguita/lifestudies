/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RolLocationComponentsPage, RolLocationDeleteDialog, RolLocationUpdatePage } from './rol-location.page-object';

const expect = chai.expect;

describe('RolLocation e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let rolLocationUpdatePage: RolLocationUpdatePage;
    let rolLocationComponentsPage: RolLocationComponentsPage;
    let rolLocationDeleteDialog: RolLocationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load RolLocations', async () => {
        await navBarPage.goToEntity('rol-location');
        rolLocationComponentsPage = new RolLocationComponentsPage();
        expect(await rolLocationComponentsPage.getTitle()).to.eq('testApp.rolLocation.home.title');
    });

    it('should load create RolLocation page', async () => {
        await rolLocationComponentsPage.clickOnCreateButton();
        rolLocationUpdatePage = new RolLocationUpdatePage();
        expect(await rolLocationUpdatePage.getPageTitle()).to.eq('testApp.rolLocation.home.createOrEditLabel');
        await rolLocationUpdatePage.cancel();
    });

    it('should create and save RolLocations', async () => {
        const nbButtonsBeforeCreate = await rolLocationComponentsPage.countDeleteButtons();

        await rolLocationComponentsPage.clickOnCreateButton();
        await rolLocationUpdatePage.setContentInput('content');
        expect(await rolLocationUpdatePage.getContentInput()).to.eq('content');
        await rolLocationUpdatePage.rolSelectLastOption();
        await rolLocationUpdatePage.languageSelectLastOption();
        await rolLocationUpdatePage.save();
        expect(await rolLocationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await rolLocationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last RolLocation', async () => {
        const nbButtonsBeforeDelete = await rolLocationComponentsPage.countDeleteButtons();
        await rolLocationComponentsPage.clickOnLastDeleteButton();

        rolLocationDeleteDialog = new RolLocationDeleteDialog();
        expect(await rolLocationDeleteDialog.getDialogTitle()).to.eq('testApp.rolLocation.delete.question');
        await rolLocationDeleteDialog.clickOnConfirmButton();

        expect(await rolLocationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
