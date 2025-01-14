import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  getDashboardData(): Observable<any> {
    return of({
      auctionInsights: {
        labels: ['January', 'February', 'March', 'April', 'May'],
        auctions: [120, 150, 180, 200, 230],
        growth: [10, 25, 20, 15, 30],
        categories: {
          Electronics: 80,
          Furniture: 40,
          Clothing: 110,
        },
      },
      userBehavior: {
        activeUsers: [20, 30, 25, 35, 40],
        avgBidsPerAuction: [2, 3, 4, 3.5, 4.2],
        freqAuctionsPerUser: [5, 7, 6, 8, 10],
      },
      financialMetrics: {
        revenue: [500, 700, 800, 900, 1200],
        avgBidValue: [25, 28, 32, 30, 34],
        priceRange: { highest: 100, lowest: 5 },
      },
      geographicInsights: {
        regions: {
          'North America': 120,
          Europe: 90,
          Asia: 150,
        },
      },
    });
  }
}
