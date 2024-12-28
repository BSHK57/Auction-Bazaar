import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddProductComponent } from '../add-product/add-product.component';
import { AuctionService } from '../../auction.service';
import { ActivatedRoute } from '@angular/router';
import {Auction, SoldItems} from '../../models/auction.model';
@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit{
  userDetails: any;
  auctioneer:any;
  bidder:any;
  auctions: any=[];
  activeAuctions :Auction []=[];
  notStarted:Auction []=[];
  soldItems:SoldItems []=[];
  // Constructor
  constructor(private dialog: MatDialog,private route: ActivatedRoute,private userService: AuctionService) {}

  ngOnInit() {
    setInterval(() => {
      this.updateRemainingTime();
    }, 1000);
    this.getUserDetails();
    this.getAuctions();
  }
  // Auctioneer and user data
  getUserDetails() {
    const id=localStorage.getItem('User_Id')||'';
    this.userService.getUserDetails(id).subscribe(
      (response) => {
        this.userDetails = response;
        if (this.userDetails.auctioneer){
          this.auctioneer=this.userDetails.auctioneer;
        }
        if (this.userDetails.bidder){
          this.bidder=this.userDetails.bidder;
        }
        console.log(this.userDetails);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  getAuctions() {
    const id1=localStorage.getItem('A_Id')||'';
    this.userService.getAuctionsByAuctioneerId(id1).subscribe(
      (response) => {
        this.auctions=response;
        console.log(this.auctions);
        this.splitAuctions(this.auctions);
        console.log(this.auctions);
        // this.splitAuctions(this.auctions);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  splitAuctions(auctions:any){
    for (const auction of auctions) {
      auction.endDate=new Date(auction.endDate);
      auction.remainingTime='';
      auction.currentBid=Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(auction.currentBid);
      console.log(auction);
      if (auction.status==="Not Started"){
        this.notStarted.push(auction);
      }
      if (auction.status==="Active"){
        this.activeAuctions.push(auction);
      }
      else{
        this.addToSoldItems(auction);
      }
    }
    console.log(this.activeAuctions);
  }

  addToSoldItems(auction:Auction){
    this.soldItems.push({
      _id : auction._id,
      name: auction.productName,
      description: auction.description,
      soldPrice: auction.salePrice,
      soldDate:new Date(auction.soldDate),
      image: auction.image,
      category: auction.category,
      bids: auction.bids
    });
  }

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
  /*activeAuctions=[
    {
      id:'',
      productName: '',
      description: '',
      currentBid: '',
      remainingTime:"",
      minPrice:0,
      endDate: new Date(),
      image: '',
      category: '',
    }
  ];/* [
    {
      id: '1',
      productName: 'Vintage Watch',
      description: 'Luxury vintage timepiece',
      currentBid: '₹1,50,000',
      remainingTime:"",
      minPrice:0,
      endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
      image: 'vintage-watch.jpeg',
      category: 'Electronics',
    },
    {
      id: '2',
      productName: 'Art Painting',
      description: 'Original abstract art',
      currentBid: '₹20,000',
      minPrice:0,
      remainingTime:"",
      endDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
      image: 'art-painting.png',
      category: 'Art',
      
    },
    {
      id: '3',
      productName: 'Sofa Set',
      description: 'Comfortable seating',
      minPrice:0,
      currentBid: '₹15,000',
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
      _id: '2',
      name: 'Rare Book',
      soldPrice: '₹80,000',
      soldDate: '10/12/2024',
      category:"Books",
      image: 'book.jpeg',
    },
    {
      _id: '3',
      name: 'Laptop',
      category:"Laptops",
      soldPrice: '₹60,000',
      soldDate: '01/12/2024',
      image: 'laptop.jpeg',
    },
  ];*/
  categories = [
    { name: 'Electronics', checked: false },
    { name: 'Fashion', checked: false },
    { name: 'Books', checked: false },
    { name: 'Laptops', checked: false },
    { name: 'Antiques', checked: false },
    { name: "Tv's", checked: false },
  ];

  selectedTab: string = 'activeAuctions';

  searchQuery = '';
  filterCategories :any= [];

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
        this.completeAuction(auction._id);
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
        result.endDate=new Date(result.endDate);
        result.startingPrice=Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(result.startingPrice);
        this.activeAuctions.push(result);
      }
    });
  }

  // Complete auction function
  completeAuction(auctionId: string): void {
    const auctionIndex = this.activeAuctions.findIndex(
      (auction) => auction._id === auctionId
    );

    if (auctionIndex !== -1) {
      const completedAuction = this.activeAuctions.splice(auctionIndex, 1)[0];
      this.soldItems.push({
        _id: completedAuction._id,
        name: completedAuction.productName,
        soldPrice: completedAuction.currentBid,
        category: completedAuction.category,
        soldDate: new Date().toLocaleDateString(),
        image: completedAuction.image,
        description: completedAuction.description,
        bids: completedAuction.bids,
      });
      console.log(`Auction with ID ${auctionId} completed.`);
    }
  }
}
