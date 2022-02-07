import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkTimesComponent } from './user-work-times.component';

describe('UserWorkTimesComponent', () => {
  let component: UserWorkTimesComponent;
  let fixture: ComponentFixture<UserWorkTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWorkTimesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
