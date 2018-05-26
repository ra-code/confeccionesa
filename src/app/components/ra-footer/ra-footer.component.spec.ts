import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaFooterComponent } from './ra-footer.component';

describe('RaFooterComponent', () => {
  let component: RaFooterComponent;
  let fixture: ComponentFixture<RaFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
