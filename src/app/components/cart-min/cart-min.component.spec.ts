import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMinComponent } from './cart-min.component';

describe('CartMinComponent', () => {
  let component: CartMinComponent;
  let fixture: ComponentFixture<CartMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
