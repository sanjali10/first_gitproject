import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppMaterialModule } from '../material/material.module';
import { AuthService } from '../shared/services/auth.service';
import { TokenStorage} from '../core/token.storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
            BrowserAnimationsModule,
            TranslateModule.forRoot(),
            HttpClientTestingModule,
            RouterTestingModule,
            ReactiveFormsModule,
            AppMaterialModule,
        ],
        providers: [AuthService, TokenStorage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
