import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddItemComponent } from './admin-add-item.component';

describe('AdminAddItemComponent', () => {
  let component: AdminAddItemComponent;
  let fixture: ComponentFixture<AdminAddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
