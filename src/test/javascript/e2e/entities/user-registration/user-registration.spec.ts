/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserRegistrationComponentsPage, UserRegistrationDeleteDialog, UserRegistrationUpdatePage } from './user-registration.page-object';

const expect = chai.expect;

describe('UserRegistration e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let userRegistrationUpdatePage: UserRegistrationUpdatePage;
    let userRegistrationComponentsPage: UserRegistrationComponentsPage;
    let userRegistrationDeleteDialog: UserRegistrationDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load UserRegistrations', async () => {
        await navBarPage.goToEntity('user-registration');
        userRegistrationComponentsPage = new UserRegistrationComponentsPage();
        expect(await userRegistrationComponentsPage.getTitle()).to.eq('testApp.userRegistration.home.title');
    });

    it('should load create UserRegistration page', async () => {
        await userRegistrationComponentsPage.clickOnCreateButton();
        userRegistrationUpdatePage = new UserRegistrationUpdatePage();
        expect(await userRegistrationUpdatePage.getPageTitle()).to.eq('testApp.userRegistration.home.createOrEditLabel');
        await userRegistrationUpdatePage.cancel();
    });

    it('should create and save UserRegistrations', async () => {
        const nbButtonsBeforeCreate = await userRegistrationComponentsPage.countDeleteButtons();

        await userRegistrationComponentsPage.clickOnCreateButton();
        await userRegistrationUpdatePage.setUserNameInput('userName');
        expect(await userRegistrationUpdatePage.getUserNameInput()).to.eq('userName');
        await userRegistrationUpdatePage.setCountryCodeInput('countryCode');
        expect(await userRegistrationUpdatePage.getCountryCodeInput()).to.eq('countryCode');
        await userRegistrationUpdatePage.setCityInput('city');
        expect(await userRegistrationUpdatePage.getCityInput()).to.eq('city');
        await userRegistrationUpdatePage.setCitizenshipCodeInput('citizenshipCode');
        expect(await userRegistrationUpdatePage.getCitizenshipCodeInput()).to.eq('citizenshipCode');
        await userRegistrationUpdatePage.setSecondCitizenshipCodeInput('secondCitizenshipCode');
        expect(await userRegistrationUpdatePage.getSecondCitizenshipCodeInput()).to.eq('secondCitizenshipCode');
        const selectedSecondCitizenship = userRegistrationUpdatePage.getSecondCitizenshipInput();
        if (await selectedSecondCitizenship.isSelected()) {
            await userRegistrationUpdatePage.getSecondCitizenshipInput().click();
            expect(await userRegistrationUpdatePage.getSecondCitizenshipInput().isSelected()).to.be.false;
        } else {
            await userRegistrationUpdatePage.getSecondCitizenshipInput().click();
            expect(await userRegistrationUpdatePage.getSecondCitizenshipInput().isSelected()).to.be.true;
        }
        await userRegistrationUpdatePage.rolSelectLastOption();
        await userRegistrationUpdatePage.save();
        expect(await userRegistrationUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await userRegistrationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last UserRegistration', async () => {
        const nbButtonsBeforeDelete = await userRegistrationComponentsPage.countDeleteButtons();
        await userRegistrationComponentsPage.clickOnLastDeleteButton();

        userRegistrationDeleteDialog = new UserRegistrationDeleteDialog();
        expect(await userRegistrationDeleteDialog.getDialogTitle()).to.eq('testApp.userRegistration.delete.question');
        await userRegistrationDeleteDialog.clickOnConfirmButton();

        expect(await userRegistrationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
