import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastConversions } from './last-conversions';

describe('LastConversions', () => {
  let component: LastConversions;
  let fixture: ComponentFixture<LastConversions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastConversions],
    }).compileComponents();

    fixture = TestBed.createComponent(LastConversions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
