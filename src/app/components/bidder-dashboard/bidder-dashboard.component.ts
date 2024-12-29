import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AllAuction, Auction1, Item, ParticipatedBid, WonBid } from '../../models/auction.model';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../auction.service';

@Component({
  selector: 'app-bidder-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './bidder-dashboard.component.html',
  styleUrl: './bidder-dashboard.component.css'
})
export class BidderDashboardComponent implements OnInit {
  isModalOpen: boolean=false;
  selectedItem: any;
  selectedAuction: any;
  currentBid: any;

  constructor(private route: ActivatedRoute, private userService: AuctionService) { }

  ngOnInit(): void {
    this.getUserDetails();
    this.getBidderDashboardData();
  }
  userRole = 'bidder'; // Example role
  userDetails: any;
  auctioneer: any;
  bidder: any;
  participatedBids: ParticipatedBid[] = []; // Populate from API
  wonBids: WonBid[] = []; // Populate from API
  allAuctions: AllAuction[] = []; // Populate from API

  selectedTab = 'participatedBids';

  // Filters
 

  categories = [
    { name: 'Electronics', checked: false },
    { name: 'Fashion', checked: false },
    { name: 'Books', checked: false },
    { name: 'Laptops', checked: false },
    { name: 'Antiques', checked: false },
    { name: "TV's", checked: false },
  ];
  searchQuery = '';
  filterCategories: any = [];

  getUserDetails() {
    const id = localStorage.getItem('User_Id') || '';
    this.userService.getUserDetails(id).subscribe(
      (response) => {
        this.userDetails = response;
        if (this.userDetails.auctioneer) {
          this.auctioneer = this.userDetails.auctioneer;
        }
        if (this.userDetails.bidder) {
          this.bidder = this.userDetails.bidder;
        }
        // console.log(this.userDetails);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }


  getBidderDashboardData() {
    const Id=localStorage.getItem('B_Id') || '';
    this.userService.getBidderDashboardData(Id)
      .subscribe((response: any) => {
        console.log(response);
        // Set the values based on the response from the API
        this.participatedBids = response.participatedBids;
        console.log(this.allAuctions);
        this.wonBids = response.wonBids;
        this.allAuctions = response.allAuctions;
      }, (error) => {
        console.error('Error fetching bidder dashboard data', error);
      });
  }

  filteredParticipatedBids = this.participatedBids;
  filteredWonBids = this.wonBids;
  filteredAuctions = this.allAuctions;
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

  setTab(tab: string) {
    this.selectedTab = tab;
    this.filterItems();
  }

  currency(Number: number) {
    return Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', }).format(Number);
  }

  filterItems() {
    // Implement filters based on selectedTab and search criteria
  }

  placeBid(itemId: string) {

  }
  viewDetails(item: any,auction?:any,bidd?:any) {
    this.selectedItem = item;
    this.selectedAuction=auction;
    this.isModalOpen = true;
    this.currentBid=bidd;
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedItem = undefined;
    this.currentBid=null;
    this.selectedAuction=null;

  }

}
