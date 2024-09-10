import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanlendingComponent } from './loanlending.component';

describe('LoanlendingComponent', () => {
  let component: LoanlendingComponent;
  let fixture: ComponentFixture<LoanlendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanlendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanlendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
