import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentAddEditComponent } from './employment-add-edit.component';

describe('EmploymentAddEditComponent', () => {
  let component: EmploymentAddEditComponent;
  let fixture: ComponentFixture<EmploymentAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
