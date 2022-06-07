import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WDataComponent } from './w-data.component';

describe('WDataComponent', () => {
  let component: WDataComponent;
  let fixture: ComponentFixture<WDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
