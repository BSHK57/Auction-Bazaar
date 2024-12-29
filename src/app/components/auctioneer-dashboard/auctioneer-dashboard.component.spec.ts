import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctioneerDashboardComponent } from './auctioneer-dashboard.component';

describe('AuctioneerDashboardComponent', () => {
  let component: AuctioneerDashboardComponent;
  let fixture: ComponentFixture<AuctioneerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuctioneerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctioneerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
