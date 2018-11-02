import {Injectable} from '@angular/core';

const TOKEN_AUTH_KEY = 'AuthToken';
const TOKEN_USER_KEY = 'UserId';
const TENANT_NAME = 'TENANT_NAME';
const TENANT_VALUE = 'TENANT_VALUE';
const USERNAME = 'USERNAME';
const PASSWORD = 'PASSWORD';
const REMEMBER = 'REMEMBER';

@Injectable()
export class TokenStorage {
    constructor() {
    }

    signOut() {
        window.sessionStorage.removeItem(TOKEN_AUTH_KEY);
        window.sessionStorage.removeItem(TOKEN_USER_KEY);
        window.sessionStorage.removeItem(TENANT_NAME);
        window.sessionStorage.removeItem(TENANT_VALUE);
        window.sessionStorage.clear();
    }

    public saveToken(token:any) {
        window.sessionStorage.removeItem(TOKEN_AUTH_KEY);
        window.sessionStorage.removeItem(TOKEN_USER_KEY);
        window.sessionStorage.setItem(TOKEN_AUTH_KEY, token.sessionId);
        window.sessionStorage.setItem(TOKEN_USER_KEY, token.userId);
    }

    public getToken():string {
        return sessionStorage.getItem(TOKEN_AUTH_KEY);
    }

    public getUsedId():string {
        return sessionStorage.getItem(TOKEN_USER_KEY);
    }

    public setTenant(tenant:any) {
        localStorage.removeItem(TENANT_NAME);
        localStorage.removeItem(TENANT_VALUE);
        localStorage.setItem(TENANT_NAME, tenant.tenantName);
        localStorage.setItem(TENANT_VALUE, tenant.tenantValue);
    }

    public getTenantName():string {
        return localStorage.getItem(TENANT_NAME);
    }

    public getTenantValue():string {
        return localStorage.getItem(TENANT_VALUE);
    }

    public saveUserDetail(userDetail: any) {
        localStorage.setItem(USERNAME, userDetail.userName);
        localStorage.setItem(PASSWORD, btoa(userDetail.passWord));
        localStorage.setItem(REMEMBER, userDetail.rememberMe);
    }

    public getUserName() {
        return localStorage.getItem(USERNAME);
    }
    public getPassWord() {
        return localStorage.getItem(PASSWORD);
    }
    public getRememberMe() {
        return localStorage.getItem(REMEMBER);
    }
}
