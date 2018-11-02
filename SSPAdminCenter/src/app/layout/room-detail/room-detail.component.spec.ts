import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TranslateModule } from '@ngx-translate/core';

import { AppMaterialModule } from '../../material/material.module';

import { RoomDetailComponent } from './room-detail.component';

describe('RoomDetailComponent', () => {
  let component: RoomDetailComponent;
  let fixture: ComponentFixture<RoomDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [RoomDetailComponent],
        imports: [
            BrowserAnimationsModule,
            TranslateModule.forRoot(),
            RouterTestingModule,
            FlexLayoutModule,
            AppMaterialModule,
        ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
