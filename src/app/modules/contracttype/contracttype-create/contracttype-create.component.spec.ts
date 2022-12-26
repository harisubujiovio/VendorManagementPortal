import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContracttypeCreateComponent } from './contracttype-create.component';

describe('ContracttypeCreateComponent', () => {
  let component: ContracttypeCreateComponent;
  let fixture: ComponentFixture<ContracttypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContracttypeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContracttypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
