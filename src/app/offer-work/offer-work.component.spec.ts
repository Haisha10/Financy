import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferWorkComponent } from './offer-work.component';

describe('OfferWorkComponent', () => {
  let component: OfferWorkComponent;
  let fixture: ComponentFixture<OfferWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
