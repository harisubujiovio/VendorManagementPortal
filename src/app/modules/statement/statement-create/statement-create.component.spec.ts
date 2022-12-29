import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementCreateComponent } from './statement-create.component';

describe('StatementCreateComponent', () => {
  let component: StatementCreateComponent;
  let fixture: ComponentFixture<StatementCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
