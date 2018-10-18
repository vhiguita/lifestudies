import { element, by, ElementFinder } from 'protractor';

export class CountryLocationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-country-location div table .btn-danger'));
    title = element.all(by.css('jhi-country-location div h2#page-heading span')).first();

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

export class CountryLocationUpdatePage {
    pageTitle = element(by.id('jhi-country-location-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    countryCodeInput = element(by.id('field_countryCode'));
    contentInput = element(by.id('field_content'));
    languageSelect = element(by.id('field_language'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCountryCodeInput(countryCode) {
        await this.countryCodeInput.sendKeys(countryCode);
    }

    async getCountryCodeInput() {
        return this.countryCodeInput.getAttribute('value');
    }

    async setContentInput(content) {
        await this.contentInput.sendKeys(content);
    }

    async getContentInput() {
        return this.contentInput.getAttribute('value');
    }

    async languageSelectLastOption() {
        await this.languageSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async languageSelectOption(option) {
        await this.languageSelect.sendKeys(option);
    }

    getLanguageSelect(): ElementFinder {
        return this.languageSelect;
    }

    async getLanguageSelectedOption() {
        return this.languageSelect.element(by.css('option:checked')).getText();
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

export class CountryLocationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-countryLocation-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-countryLocation'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
