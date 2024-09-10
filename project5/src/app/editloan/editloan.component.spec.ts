import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditloanComponent } from './editloan.component';

describe('EditloanComponent', () => {
  let component: EditloanComponent;
  let fixture: ComponentFixture<EditloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditloanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
