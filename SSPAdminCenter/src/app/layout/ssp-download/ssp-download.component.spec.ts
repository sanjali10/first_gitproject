import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SspDownloadComponent } from './ssp-download.component';

describe('SspDownloadComponent', () => {
  let component: SspDownloadComponent;
  let fixture: ComponentFixture<SspDownloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SspDownloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SspDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
