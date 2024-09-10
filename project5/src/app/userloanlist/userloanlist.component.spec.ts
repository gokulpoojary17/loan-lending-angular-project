import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloanlistComponent } from './userloanlist.component';

describe('UserloanlistComponent', () => {
  let component: UserloanlistComponent;
  let fixture: ComponentFixture<UserloanlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserloanlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserloanlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
