import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorktimeComponent } from './add-worktime.component';

describe('AddWorktimeComponent', () => {
  let component: AddWorktimeComponent;
  let fixture: ComponentFixture<AddWorktimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorktimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorktimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
