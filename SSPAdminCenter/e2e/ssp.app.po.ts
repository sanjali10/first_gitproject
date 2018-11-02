import {browser, by, element} from 'protractor';

export class SspRoomPage {
    navigateTo() {
        return browser.get('/login');
    }

    getOffice365SyncButton() {
        return element(by.id('sspRoom-id-O365-login'));
    }
    getSspRoomDeleteButton()
    {
        return element(by.id('sspRoom-Id-Delete'))
    }

    getSspRoomEditButton()
    {
        return element(by.id('sspRoom-Id-Edit'))
    }

    getSearchTextBox()
    {
        return element(by.id('ssp-Id-Search-Box'));
    }

    getAddRoomButton()
    {
        return element(by.id('sspRoom-Id-Add-Room'));
    }

    getO365UserNameTextBox()
    {
        return element(by.name('loginfmt'));
    }

    getO365PasswordTextBox()
    {
        return element(by.name('passwd'));
    }

    getO365LoginButton()
    {
        return element(by.id('idSIButton9'));
    }

}
