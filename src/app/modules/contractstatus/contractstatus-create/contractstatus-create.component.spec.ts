import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractstatusCreateComponent } from './contractstatus-create.component';

describe('ContractstatusCreateComponent', () => {
  let component: ContractstatusCreateComponent;
  let fixture: ComponentFixture<ContractstatusCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractstatusCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractstatusCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
