import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnertypeCreateComponent } from './partnertype-create.component';

describe('PartnertypeCreateComponent', () => {
  let component: PartnertypeCreateComponent;
  let fixture: ComponentFixture<PartnertypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnertypeCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnertypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
