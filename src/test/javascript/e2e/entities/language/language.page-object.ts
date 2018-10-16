import { element, by, ElementFinder } from 'protractor';

export class LanguageComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-language div table .btn-danger'));
    title = element.all(by.css('jhi-language div h2#page-heading span')).first();

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

export class LanguageUpdatePage {
    pageTitle = element(by.id('jhi-language-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    languageCodeInput = element(by.id('field_languageCode'));
    descriptionInput = element(by.id('field_description'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setLanguageCodeInput(languageCode) {
        await this.languageCodeInput.sendKeys(languageCode);
    }

    async getLanguageCodeInput() {
        return this.languageCodeInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
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

export class LanguageDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-language-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-language'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
