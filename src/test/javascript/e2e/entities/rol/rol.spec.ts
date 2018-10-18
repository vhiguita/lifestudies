/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RolComponentsPage, RolDeleteDialog, RolUpdatePage } from './rol.page-object';

const expect = chai.expect;

describe('Rol e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let rolUpdatePage: RolUpdatePage;
    let rolComponentsPage: RolComponentsPage;
    let rolDeleteDialog: RolDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Rols', async () => {
        await navBarPage.goToEntity('rol');
        rolComponentsPage = new RolComponentsPage();
        expect(await rolComponentsPage.getTitle()).to.eq('testApp.rol.home.title');
    });

    it('should load create Rol page', async () => {
        await rolComponentsPage.clickOnCreateButton();
        rolUpdatePage = new RolUpdatePage();
        expect(await rolUpdatePage.getPageTitle()).to.eq('testApp.rol.home.createOrEditLabel');
        await rolUpdatePage.cancel();
    });

    it('should create and save Rols', async () => {
        const nbButtonsBeforeCreate = await rolComponentsPage.countDeleteButtons();

        await rolComponentsPage.clickOnCreateButton();
        await rolUpdatePage.setDescriptionInput('description');
        expect(await rolUpdatePage.getDescriptionInput()).to.eq('description');
        await rolUpdatePage.save();
        expect(await rolUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await rolComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Rol', async () => {
        const nbButtonsBeforeDelete = await rolComponentsPage.countDeleteButtons();
        await rolComponentsPage.clickOnLastDeleteButton();

        rolDeleteDialog = new RolDeleteDialog();
        expect(await rolDeleteDialog.getDialogTitle()).to.eq('testApp.rol.delete.question');
        await rolDeleteDialog.clickOnConfirmButton();

        expect(await rolComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
