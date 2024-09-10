import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoandetailviewComponent } from './loandetailview.component';

describe('LoandetailviewComponent', () => {
  let component: LoandetailviewComponent;
  let fixture: ComponentFixture<LoandetailviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoandetailviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoandetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
