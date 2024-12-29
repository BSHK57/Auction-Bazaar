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
  selector: 'app-auctioneer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './auctioneer-dashboard.component.html',
  styleUrl: './auctioneer-dashboard.component.css'
})
export class AuctioneerDashboardComponent implements OnInit{
  userDetails: any;
  auctioneer:any;
  bidder:any;
  auctions: any=[];
  activeAuctions :Auction []=[];
  // notStarted:Auction []=[];
  soldItems:SoldItems []=[];
  userRole = 'auctioneer';
  // Constructor
  constructor(private dialog: MatDialog,private route: ActivatedRoute,private userService: AuctionService) {}

  ngOnInit() {
    setInterval(() => {
      this.updateRemainingTime();
    }, 1000);
    this.getUserDetails();
    this.getAuctions();
  }
  get totalSales(){
    return this.auctioneer.totalSales;
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
       // console.log(this.userDetails);
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
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  splitAuctions(auctions:any){
    for (const auction of auctions) {
      auction.endDate=new Date(auction.endDate);
      auction.startDate=new Date(auction.startDate);
      auction.remainingTime='';
      if (auction.status==="Not Started"){
        this.activeAuctions.push(auction);
      }
      else if (auction.status==="Active"){
        this.activeAuctions.push(auction);
      }
      else{
        // console.log(auction);
        this.addToSoldItems(auction);
      }
    }
    // console.log(this.soldItems);
    // console.log(this.activeAuctions);
  }

  addToSoldItems(auction:Auction){
    const price=auction.salePrice;
    this.soldItems.push({
      _id : auction._id,
      name: auction.productName,
      description: auction.description,
      soldPrice: price,//Intl.NumberFormat('en-IN', {style: 'currency',currency: 'INR',}).format(price),
      soldDate:new Date(auction.soldDate),
      image: auction.image,
      category: auction.category,
      bids: auction.bids
    });
  }
  currency(Number:number){
    return Intl.NumberFormat('en-IN', {style: 'currency',currency: 'INR',}).format(Number);
  }

  categories = [
    { name: 'Electronics', checked: false },
    { name: 'Fashion', checked: false },
    { name: 'Books', checked: false },
    { name: 'Laptops', checked: false },
    { name: 'Antiques', checked: false },
    { name: "TV's", checked: false },
  ];

  selectedTab: string = 'activeAuctions';

  searchQuery = '';
  filterCategories :any= [];

  updateRemainingTime() {
    this.activeAuctions.forEach((auction) => {
      const now = new Date();
      if (auction.status==="Active" || auction.startDate<=now){
      if(auction.status!=="Active"){
        auction.status="Active"
        this.userService.updateAuctionStatusAndBid(auction._id,auction.status);
      }
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
        window.location.reload();
        console.log('Product added:', result);
        // Logic to handle adding the product to active auctions
        //result.endDate=new Date(result.endDate);
        this.getAuctions();
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
      this.userService.updateAuctionStatusAndBid(completedAuction._id,"Ended",completedAuction.currentBid);
      this.getAuctions();
      console.log(`Auction with ID ${auctionId} completed.`+completedAuction.currentBid);
    }
  }
}
