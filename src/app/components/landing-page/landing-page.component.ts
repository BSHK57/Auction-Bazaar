import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  userRole = 'auctioneer'; // Can be 'auctioneer' or 'bidder'
  userName = 'John Doe';
  totalSales = 10000;
  salesList = [
    { productName: 'Product A', amount: 5000 },
    { productName: 'Product B', amount: 3000 },
    { productName: 'Product C', amount: 2000 },
  ];
  activeAuctions = [{ name: 'Auction 1' }, { name: 'Auction 2' }];
  completedAuctions = [{ name: 'Auction 3' }, { name: 'Auction 4' }];
  activeBids = 5;
  bidsWon = 3;
  totalSpent = 1500;
  searchQuery = '';
  filterCategory = '';
  categories = ['Electronics', 'Furniture', 'Books'];
  auctions = [
    { name: 'Auction 1', category: 'Electronics' },
    { name: 'Auction 2', category: 'Furniture' },
  ];

  get filteredAuctions() {
    return this.auctions.filter(
      (auction) =>
        auction.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (!this.filterCategory || auction.category === this.filterCategory)
    );
  }

  ngOnInit(): void {}

  showTooltip(title: string, content: string) {
    // Logic to display tooltip
  }

  hideTooltip() {
    // Logic to hide tooltip
  }
  // userRole = 'auctioneer'; // Set user role dynamically
  selectedTab: string = 'activeAuctions'; // Default tab

  setTab(tab: string) {
    this.selectedTab = tab;
  }
}
