import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancesAddEditComponent } from './finances-add-edit.component';

describe('FinancesAddEditComponent', () => {
  let component: FinancesAddEditComponent;
  let fixture: ComponentFixture<FinancesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancesAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
