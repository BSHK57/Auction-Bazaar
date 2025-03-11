import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuctionChartComponent } from './user-auction-chart.component';

describe('UserAuctionChartComponent', () => {
  let component: UserAuctionChartComponent;
  let fixture: ComponentFixture<UserAuctionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAuctionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAuctionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
