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
}
