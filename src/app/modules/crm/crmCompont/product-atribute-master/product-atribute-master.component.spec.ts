import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductAtributeMasterComponent } from './product-atribute-master.component';

describe('ProductAtributeMasterComponent', () => {
  let component: ProductAtributeMasterComponent;
  let fixture: ComponentFixture<ProductAtributeMasterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAtributeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAtributeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
