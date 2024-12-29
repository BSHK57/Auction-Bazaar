import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  private apiUrl = 'http://localhost:5000';  // Adjust with your backend API URL

  constructor(private http: HttpClient) {} 

  getAuctionsByAuctioneerId(auctioneerId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auctions/${auctioneerId}`);
  }

  getUserDetails(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  updateAuction(auctionId: string, status?: string, salePrice?: number, bid?: any): Observable<any> {
    const updateParams: any = {  };

    if (status) {
      updateParams.status = status;
    }

    if (status === 'Ended' && salePrice !== undefined) {
      updateParams.salePrice = salePrice;
    }
    
    if (bid) {
      updateParams.bid = bid; // Single bid object
    }

    return this.http.put<any>(`${this.apiUrl}/auctions/${auctionId}`, updateParams);
  }

  updateAuctionStatusAndBid(auctionId: string, status?: string, salePrice?: number, bid?: any) {
    console.log(salePrice);
    this.updateAuction(auctionId, status, salePrice, bid).subscribe({
      next: (response) => {
        console.log('Auction updated successfully:', response);
      },
      error: (error) => {
        console.error('Error updating auction:', error);
      }
    });
  }
  getBidderDashboardData(bidderId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/bids-dashboard/${bidderId}`);
  }

  placeBid(bidData: { bidderId: string; itemId: string; bidAmount: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/place-bid`, bidData);
  }
  makeBid(bidderId:string,itemId:string,bidAmount:number) {
    console.log(bidAmount);
    if (bidAmount <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }
    const bidData = {bidderId,itemId,bidAmount};

    this.placeBid(bidData).subscribe({
      next: (response) => {
        alert('Bid placed successfully!');
        return response;
      },
      error: (error) => {
        alert(error.error.error);
        console.error(error.error.message || 'Failed to place bid.');
      }
    });
  }
}
