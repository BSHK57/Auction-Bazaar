import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
electronicsChecked: boolean =false;
clothingChecked: boolean =false;
homeChecked: boolean =false;
booksChecked: boolean = false;
searchItems() {
throw new Error('Method not implemented.');
}
toggleCategory(arg0: string) {
throw new Error('Method not implemented.');
}
  // Auctioneer and user data
  auctioneer = {
    name: 'sai hari',
    email: 'SHK@mail.com',
  };
  userRole = 'auctioneer'; 

  // Dashboard data
  totalSales = 45231;
  activeAuctions = [
    {
      id: '1',
      productName: 'Vintage Watch',
      description: 'Luxury vintage timepiece',
      currentBid: '₹1,50,000',
      daysLeft: 2,
      image: 'vintage-watch.jpeg',
    },
    {
      id: '2',
      productName: 'Art Painting',
      description: 'Original abstract art',
      currentBid: '₹20,000',
      daysLeft: 5,
      image: 'art-painting.png',
    },
  ];

  soldItems = [
    {
      id: '1',
      name: 'Antique Vase',
      soldPrice: '₹12,00,000',
      soldDate: '12/12/2024',
      image: 'Vase.png',
    },
    {
      id: '2',
      name: 'Rare Book',
      soldPrice: '₹80,000',
      soldDate: '10/12/2024',
      image: 'book.jpeg',
    },
    {
      id: '3',
      name: 'Laptop',
      soldPrice: '₹60,000',
      soldDate: '01/12/2024',
      image: 'laptop.jpeg',
    },
  ];

  selectedTab: string = 'activeAuctions'; 

  categories = ['Electronics', 'Furniture', 'Books'];
  auctions = [
    { name: 'Auction 1', category: 'Electronics' },
    { name: 'Auction 2', category: 'Furniture' },
  ];

  searchQuery = '';
  filterCategory = '';

  // Constructor
  constructor(private dialog: MatDialog) {}

  // Filtered auctions
  get filteredAuctions() {
    return this.auctions.filter(
      (auction) =>
        auction.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (!this.filterCategory || auction.category === this.filterCategory)
    );
  }

  // Tab management
  setTab(tab: string): void {
    this.selectedTab = tab;
  }

  // Add product function
  addproductfunction(): void {
    const dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Product added:', result);
        // Logic to handle adding the product to active auctions
        this.activeAuctions.push(result);
      }
    });
  }

  // Complete auction function
  completeAuction(auctionId: string): void {
    const auctionIndex = this.activeAuctions.findIndex(
      (auction) => auction.id === auctionId
    );

    if (auctionIndex !== -1) {
      const completedAuction = this.activeAuctions.splice(auctionIndex, 1)[0];
      this.soldItems.push({
        id: completedAuction.id,
        name: completedAuction.productName,
        soldPrice: completedAuction.currentBid,
        soldDate: new Date().toLocaleDateString(),
        image: completedAuction.image,
      });
      console.log(`Auction with ID ${auctionId} completed.`);
    }
  }
}
