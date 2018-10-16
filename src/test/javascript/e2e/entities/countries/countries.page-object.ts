import { element, by, ElementFinder } from 'protractor';

export class CountriesComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-countries div table .btn-danger'));
    title = element.all(by.css('jhi-countries div h2#page-heading span')).first();

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

export class CountriesUpdatePage {
    pageTitle = element(by.id('jhi-countries-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    countryCodeInput = element(by.id('field_countryCode'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCountryCodeInput(countryCode) {
        await this.countryCodeInput.sendKeys(countryCode);
    }

    async getCountryCodeInput() {
        return this.countryCodeInput.getAttribute('value');
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

export class CountriesDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-countries-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-countries'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
