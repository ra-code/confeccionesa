import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditItemComponent } from './admin-edit-item.component';

describe('AdminEditItemComponent', () => {
  let component: AdminEditItemComponent;
  let fixture: ComponentFixture<AdminEditItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
