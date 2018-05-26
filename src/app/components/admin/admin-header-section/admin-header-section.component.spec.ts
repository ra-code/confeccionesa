import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderSectionComponent } from './admin-header-section.component';

describe('AdminHeaderSectionComponent', () => {
  let component: AdminHeaderSectionComponent;
  let fixture: ComponentFixture<AdminHeaderSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHeaderSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
