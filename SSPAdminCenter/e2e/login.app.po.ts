import {browser, by, element} from 'protractor';

export class SspLoginPage {
    navigateTo() {
        return browser.get('/login');
    }

    getParagraphText() {
        return element(by.css('app-root h1')).getText();
    }

    getTenantName() {
        return element(by.id('login-tenant-link')).getText();
    }

    getTenantTextBoxText() {
        return element(by.id('login-id-tenant')).getText();
    }

    getTenantSaveButton() {
        return element(by.id('login-id-tenant-save'));
    }

    getLoginButton() {
        return element(by.id('login-id-do-login'));
    }

    getUserTextBox() {
        return element(by.id('user'));
    }

    getPasswordTextBox() {
        return element(by.id('passWord'));
    }
}
