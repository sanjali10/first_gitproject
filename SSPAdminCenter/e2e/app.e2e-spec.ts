import { SspLoginPage } from './login.app.po';
import { SspRoomPage } from './ssp.app.po';
import { browser, by, element } from 'protractor';


describe('SSP APP', () => {
    let login: SspLoginPage;
    let sspRoom: SspRoomPage;
    const browserSleepTime = 1000;

    beforeEach(() => {
        login = new SspLoginPage();
        sspRoom = new SspRoomPage();

    });

    it('should check tenant , user ,password text box is present or not at very first time ', () => {
        console.log('===should check tenant text box, user ,password text box is present or not at very first time');
        login.navigateTo();
        browser.driver.sleep(browserSleepTime);
        expect(login.getTenantTextBoxText().isPresent()).toBeTruthy();
        expect(login.getUserTextBox().isPresent()).toBeTruthy();
        expect(login.getPasswordTextBox().isPresent()).toBeTruthy();
        expect(login.getLoginButton().isPresent()).toBeTruthy();
        expect(login.getUserTextBox().isEnabled()).toBeTruthy();
        expect(login.getPasswordTextBox().isEnabled()).toBeTruthy();
        expect(login.getLoginButton().isEnabled()).toBeFalsy();

    });

    it('should login and save the tenant name first time', () => {
        console.log('===should save the tenant name first time');
        browser.driver.sleep(browserSleepTime);
        login.getTenantTextBoxText().clear();
        login.getTenantTextBoxText().sendKeys('test-bssol2-2.to.ideep.com');
        browser.driver.sleep(browserSleepTime);
        login.getUserTextBox().clear();
        login.getUserTextBox().sendKeys('Fanish');
        login.getPasswordTextBox().clear();
        login.getPasswordTextBox().sendKeys('ssdi.blr');
        expect(login.getLoginButton().isEnabled()).toBeTruthy();
        browser.driver.sleep(browserSleepTime);
        login.getLoginButton().click();
        browser.driver.sleep(browserSleepTime);
    });

    it('should login to O365 account  ', () => {
        console.log('===should login to O365 account');
        sspRoom.getOffice365SyncButton().click();
        browser.driver.sleep(browserSleepTime);
        const emailInput = browser.driver.findElement(by.name('loginfmt'));
        emailInput.sendKeys('rajshekhard@ssdiiteam.onmicrosoft.com');
        browser.driver.sleep(browserSleepTime);
        const signInButton = browser.driver.findElement(by.id('idSIButton9'));
        signInButton.click();
        browser.driver.sleep(browserSleepTime);
        const passwordInput = browser.driver.findElement(by.name('passwd'));
        passwordInput.sendKeys('Smart@2018');  // you should not commit this to VCS
        const pwdClickButton = browser.driver.findElement(by.id('idSIButton9'));
        pwdClickButton.click();
        browser.driver.sleep(browserSleepTime);
    });

    it('should click on user name and click on log out button', () => {
        console.log('===should click on user name and click on log out button');
        browser.driver.sleep(browserSleepTime);
        element(by.linkText('Singh Fanish')).click();
        browser.driver.sleep(browserSleepTime);
        element(by.linkText('Log Out')).click();
        browser.driver.sleep(browserSleepTime);
    });

    it('should check tenant name is present or not as a link  ', () => {
        console.log('===should check tenant name is present or not as a link ');
        browser.driver.sleep(browserSleepTime);
        expect(login.getTenantName()).toEqual('test-bssol2-2.to.ideep.com');
    });


    it('should click on present tenant link', () => {
        console.log('===should click on present tenant link');
        browser.driver.sleep(browserSleepTime);
        element(by.linkText('test-bssol2-2.to.ideep.com')).click();
        expect(login.getTenantTextBoxText().isPresent()).toBeTruthy();
        browser.driver.sleep(browserSleepTime);
    });

    it('should tenant name present in tenant text box ', () => {
        console.log('===should tenant name present in tenant text box');
        expect(login.getTenantTextBoxText().getAttribute('value')).toEqual('test-bssol2-2.to.ideep.com');
    });

    it('should change the tenant name', () => {
        console.log('===should change the tenant name');
        browser.driver.sleep(browserSleepTime);
        login.getTenantTextBoxText().clear();
        login.getTenantTextBoxText().sendKeys('test-bssol2.to.ideep.com');
        browser.driver.sleep(browserSleepTime);
        expect(login.getTenantTextBoxText().getAttribute('value')).toEqual('test-bssol2.to.ideep.com');
    });

    // user name should not be hard coded
    it('should enter the user name and password', () => {
        console.log('===should enter the user credential');
        browser.driver.sleep(browserSleepTime);
        login.getUserTextBox().clear();
        login.getUserTextBox().sendKeys('Fanish');
        login.getPasswordTextBox().clear();
        login.getPasswordTextBox().sendKeys('ssdi.blr');
        expect(login.getLoginButton().isEnabled()).toBeTruthy();
        browser.driver.sleep(browserSleepTime);
        login.getLoginButton().click();
        browser.driver.sleep(browserSleepTime);
    });

    it('should click on user name and click on log out button', () => {
        console.log('===should click on user name and click on log out button');
        browser.driver.sleep(browserSleepTime);
        element(by.linkText('Singh Fanish')).click();
        browser.driver.sleep(browserSleepTime);
        element(by.linkText('Log Out')).click();
        browser.driver.sleep(browserSleepTime);
    });

    it('should check tenant name is present or not as a link  ', () => {
        console.log('===should check tenant name is present or not as a link ');
        browser.driver.sleep(browserSleepTime);
        expect(login.getTenantName()).toEqual('test-bssol2.to.ideep.com');
    });

});
