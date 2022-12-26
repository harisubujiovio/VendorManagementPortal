import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionmethodCreateComponent } from './commissionmethod-create.component';

describe('CommissionmethodCreateComponent', () => {
  let component: CommissionmethodCreateComponent;
  let fixture: ComponentFixture<CommissionmethodCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionmethodCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionmethodCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
