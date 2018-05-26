import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowAllItemsComponent } from './admin-show-all-items.component';

describe('AdminShowAllItemsComponent', () => {
  let component: AdminShowAllItemsComponent;
  let fixture: ComponentFixture<AdminShowAllItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShowAllItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShowAllItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
