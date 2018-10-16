import { element, by, ElementFinder } from 'protractor';

export class UserRegistrationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-user-registration div table .btn-danger'));
    title = element.all(by.css('jhi-user-registration div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserRegistrationUpdatePage {
    pageTitle = element(by.id('jhi-user-registration-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    userNameInput = element(by.id('field_userName'));
    countryCodeInput = element(by.id('field_countryCode'));
    cityInput = element(by.id('field_city'));
    citizenshipCodeInput = element(by.id('field_citizenshipCode'));
    secondCitizenshipCodeInput = element(by.id('field_secondCitizenshipCode'));
    secondCitizenshipInput = element(by.id('field_secondCitizenship'));
    rolSelect = element(by.id('field_rol'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setUserNameInput(userName) {
        await this.userNameInput.sendKeys(userName);
    }

    async getUserNameInput() {
        return this.userNameInput.getAttribute('value');
    }

    async setCountryCodeInput(countryCode) {
        await this.countryCodeInput.sendKeys(countryCode);
    }

    async getCountryCodeInput() {
        return this.countryCodeInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setCitizenshipCodeInput(citizenshipCode) {
        await this.citizenshipCodeInput.sendKeys(citizenshipCode);
    }

    async getCitizenshipCodeInput() {
        return this.citizenshipCodeInput.getAttribute('value');
    }

    async setSecondCitizenshipCodeInput(secondCitizenshipCode) {
        await this.secondCitizenshipCodeInput.sendKeys(secondCitizenshipCode);
    }

    async getSecondCitizenshipCodeInput() {
        return this.secondCitizenshipCodeInput.getAttribute('value');
    }

    getSecondCitizenshipInput() {
        return this.secondCitizenshipInput;
    }

    async rolSelectLastOption() {
        await this.rolSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async rolSelectOption(option) {
        await this.rolSelect.sendKeys(option);
    }

    getRolSelect(): ElementFinder {
        return this.rolSelect;
    }

    async getRolSelectedOption() {
        return this.rolSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class UserRegistrationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-userRegistration-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-userRegistration'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
