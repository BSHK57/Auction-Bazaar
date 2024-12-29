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
  isModalOpen: boolean = false;
  selectedItem: any;
  selectedAuction: any;
  currentBid: any;
  isPlaceBidModalOpen: boolean = false;
  bidAmount: number | null = null;

  constructor(private route: ActivatedRoute, private userService: AuctionService) { }

  ngOnInit() {
    setInterval(() => {
      this.updateAuctions();
    }, 1000);
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
        console.log(response);
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
    const Id = localStorage.getItem('B_Id') || '';
    this.userService.getBidderDashboardData(Id)
      .subscribe((response: any) => {
        console.log(response);
        // Set the values based on the response from the API
        this.participatedBids = response.participatedBids;
        console.log(this.participatedBids,"all" );
       
        this.wonBids = response.wonBids;
        this.allAuctions = response.allAuctions;
        console.log(this.allAuctions,this.wonBids);
      }, (error) => {
        console.error('Error fetching bidder dashboard data', error);
      });
  }

  filteredParticipatedBids = this.participatedBids;
  // filteredWonBids = this.wonBids;
  // filteredAuctions = this.allAuctions;
  updateAuctions() {
    const now = new Date;
    for (let auction of this.allAuctions) {
      if (auction.endTime <= now && auction.status === "Active") {
        this.userService.updateAuctionStatusAndBid(auction._id, "Ended", auction.item.bids[auction.item.bids.length - 1].bidAmount | auction.startingPrice);
      }
    }
  }

  get filteredAuctions() {
    const now = new Date;
    return this.allAuctions.filter(
      (auction) =>
        auction.item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.filterCategories.length === 0 || this.filterCategories.includes(auction.item.category))
    );
  }

  get filteredWonBids() {
    return this.wonBids.filter(
      (bid) =>
        bid.itemId.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.filterCategories.length === 0 || this.filterCategories.includes(bid.itemId.category))
    );
  }

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
  }

  currency(Number: number) {
    return Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', }).format(Number);
  }
  placeBid(item:any,auction:any): void {
    this.isPlaceBidModalOpen = true;
    this.bidAmount = null; // Reset bid amount for the new bid
    this.currentBid = item.bids[item.bids.length-1];
    this.selectedItem=item
    this.selectedAuction=auction
  }

  // Close Place Bid Modal
  closePlaceBidModal(): void {
    this.isPlaceBidModalOpen = false;
  }

  // Submit Bid
  submitBid(item:any) {
    //event.preventDefault(); // Prevent default form submission behavior
    if (this.bidAmount && this.bidAmount > (this.currentBid?.bidAmount || this.selectedAuction.startingPrice)) {
      // Process the bid submission logic
      console.log(this.bidAmount);
      this.userService.makeBid(localStorage.getItem('B_Id') || '',item._id,this.bidAmount)
      console.log('Bid submitted:', this.bidAmount);
      this.closePlaceBidModal(); // Close the modal after submitting
    } else {
      alert('Please enter a valid bid amount.');
    }
  }
  viewDetails(item: any, auction?: any, bid?: any) {
    this.selectedItem = item;
    this.selectedAuction = auction;
    this.isModalOpen = true;
    this.currentBid = bid;
  }
  closeModal() {
    this.isModalOpen = false;
    this.selectedItem = undefined;
    this.currentBid = null;
    this.selectedAuction = null;

  }

}
