import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentOverviewComponent } from './employment-overview.component';

describe('EmploymentOverviewComponent', () => {
  let component: EmploymentOverviewComponent;
  let fixture: ComponentFixture<EmploymentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
