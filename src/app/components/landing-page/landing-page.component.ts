import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit{
  // Auctioneer and user data
  auctioneer = {
    name: 'sai hari',
    email: 'SHK@mail.com',
  };
  userRole = 'auctioneer';
  get totalsales(){
    const totalSales =this.soldItems.reduce((sum, currentItem) => {
      // Remove the currency symbol and commas, and convert the value to a number
      let price = parseFloat(currentItem.soldPrice.replace('₹', '').replace(/,/g, ''));
      return sum + price;
    }, 0);

    return Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(totalSales);
  }
  activeAuctions = [
    {
      id: '1',
      productName: 'Vintage Watch',
      description: 'Luxury vintage timepiece',
      currentBid: '₹1,50,000',
      remainingTime:"",
      daysLeft: 2,
      endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
      image: 'vintage-watch.jpeg',
      category: 'Electronics',
    },
    {
      id: '2',
      productName: 'Art Painting',
      description: 'Original abstract art',
      currentBid: '₹20,000',
      daysLeft: 5,
      remainingTime:"",
      endDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
      image: 'art-painting.png',
      category: 'Art',
      
    },
    {
      id: '3',
      productName: 'Sofa Set',
      description: 'Comfortable seating',
      currentBid: '₹15,000',
      daysLeft: 3,
      remainingTime:"",
      endDate: new Date(new Date().getTime() + 3* 24 * 60 * 60 * 1000),
      image: 'sofa-set.jpeg',
      category: 'Home',
    },
  ];

  soldItems = [
    {
      id: '1',
      name: 'Antique Vase',
      soldPrice: '₹12,00,000',
      soldDate: '12/12/2024',
      category:"Antiques",
      image: 'Vase.png',
    },
    {
      id: '2',
      name: 'Rare Book',
      soldPrice: '₹80,000',
      soldDate: '10/12/2024',
      category:"Books",
      image: 'book.jpeg',
    },
    {
      id: '3',
      name: 'Laptop',
      category:"Laptops",
      soldPrice: '₹60,000',
      soldDate: '01/12/2024',
      image: 'laptop.jpeg',
    },
  ];
  categories = [
    { name: 'Electronics', checked: false },
    { name: 'Fashion', checked: false },
    { name: 'Books', checked: false },
    { name: 'Laptops', checked: false },
    { name: 'Antiques', checked: false },
  ];

  selectedTab: string = 'activeAuctions';

  searchQuery = '';
  filterCategories :any= [];

  // Constructor
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    setInterval(() => {
      this.updateRemainingTime();
    }, 1000);
  }

  updateRemainingTime() {
    this.activeAuctions.forEach((auction) => {
      const now = new Date();
      const remainingTime = auction.endDate.getTime() - now.getTime();
      if (remainingTime > 0) {
        const daysLeft = Math.floor(remainingTime / (1000 * 3600 * 24));
        const hoursLeft = Math.floor((remainingTime % (1000 * 3600 * 24)) / (1000 * 3600));
        const minutesLeft = Math.floor((remainingTime % (1000 * 3600)) / (1000 * 60));
        const secondsLeft = Math.floor((remainingTime % (1000 * 60)) / 1000);
        auction.remainingTime = `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
      } else {
        auction.remainingTime = 'Auction Ended';
      }
    });
  }

  // Function to search items
  searchItems(): void {
    // Filtering active auctions based on the search query
    this.filteredAuctions;  // This will automatically update based on the search query
  }

  // Toggle category filter
  toggleCategory(category: string): void {
    const index = this.filterCategories.indexOf(category);
    if (index > -1) {
      // If the category is already in the array, remove it
      this.filterCategories.splice(index, 1);
    } else {
      // If it's not in the array, add it
      this.filterCategories.push(category);
    }
  }

  // Filtered auctions based on the search query and category
  get filteredAuctions() {
    return this.activeAuctions.filter(
      (auction) =>
        auction.productName.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.filterCategories.length === 0 || this.filterCategories.includes(auction.category))
    );
  }

  get filteredSoldItems() {
    return this.soldItems.filter(
      (item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.filterCategories.length === 0 || this.filterCategories.includes(item.category))
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
        category:completedAuction.category,
        soldDate: new Date().toLocaleDateString(),
        image: completedAuction.image,
      });
      console.log(`Auction with ID ${auctionId} completed.`);
    }
  }
}
