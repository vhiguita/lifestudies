import { element, by, ElementFinder } from 'protractor';

export class RolLocationComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-rol-location div table .btn-danger'));
    title = element.all(by.css('jhi-rol-location div h2#page-heading span')).first();

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

export class RolLocationUpdatePage {
    pageTitle = element(by.id('jhi-rol-location-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    contentInput = element(by.id('field_content'));
    rolSelect = element(by.id('field_rol'));
    languageSelect = element(by.id('field_language'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setContentInput(content) {
        await this.contentInput.sendKeys(content);
    }

    async getContentInput() {
        return this.contentInput.getAttribute('value');
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

export class RolLocationDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-rolLocation-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-rolLocation'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
