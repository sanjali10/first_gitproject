import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { RoomListComponent } from './room-list.component';
import { AppMaterialModule } from '../../material/material.module';

describe('RoomListComponent', () => {
    let component: RoomListComponent;
    let fixture: ComponentFixture<RoomListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RoomListComponent],
            imports: [
                BrowserAnimationsModule,
                TranslateModule.forRoot(),
                RouterTestingModule,
                AppMaterialModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RoomListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
