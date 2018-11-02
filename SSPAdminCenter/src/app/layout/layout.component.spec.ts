import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AppMaterialModule } from '../material/material.module';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';
import { TokenStorage } from '../core/token.storage';

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent {}

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LayoutComponent,
                HeaderComponent,
                SidebarComponent,
                RouterOutletStubComponent,
            ],
            imports: [
                TranslateModule.forRoot(),
                HttpClientTestingModule,
                RouterTestingModule,
                AppMaterialModule,
            ],
            providers: [AuthService, UserService, TokenStorage],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
