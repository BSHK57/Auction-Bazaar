// models/auction.model.ts
export interface Auction {
  _id: string;
  productName: string;
  description: string;
  currentBid: number;
  remainingTime: string;
  minPrice: number;
  endDate: Date;
  image: string;
  category: string;
  bids:any[];
  soldDate:Date;
  salePrice:number;
  status:string;
  startDate:Date;
}

export interface SoldItems {
  _id: string;
  name: string;
  description: string;
  soldPrice: number;
  soldDate: any;
  image: string;
  category: string;
  bids:any[];
}

export interface Product {
  auctioneerId: string;       // The ID of the auctioneer
  startTime: Date | string;    // The start time of the auction
  endTime: Date | string;      // The end time of the auction
  startingPrice: number;      // The starting price of the auction
  name: string;               // Name of the item being auctioned
  description: string;        // Description of the item
  image: File | null; 
  category : 'Electronics'| 'Fashion'| 'Laptops'| 'Books'|"TV's"|"Antiques"    // Image of the item being auctioned
}

export interface Bid {
  _id: string; // Unique identifier for the bid
  bidderId: string; // ID of the bidder
  // itemId: string; // ID of the item being bid on
  bidAmount: number; // Amount of the bid
  bidTime: Date; // Timestamp of the bid
}

export interface Item {
  _id: string; // Unique identifier for the item
  auction: string; // ID of the associated auction
  name: string; // Name of the item
  description: string; // Description of the item
  salePrice: number; // Final sale price (optional, for sold items)
  category: 'Electronics' | 'Fashion' | 'Laptops' | 'Books' | "TV's" | "Antiques"; // Category of the item
  image: string; // Image URL of the item
  bids: Bid[]; // Array of bid IDs associated with the item
}

export interface Auction1 {
  _id: string; // Unique identifier for the auction
  auctioneerId: string; // ID of the auctioneer
  startTime: Date; // Auction start time
  endTime: Date; // Auction end time
  completedTime?: Date; // Completion time (optional)
  status: 'Active' | 'Ended' | 'Cancelled' | 'Not Started'; // Current status of the auction
  startingPrice: number; // Starting price for the auction
  item: Item; // Associated item object
}

export interface ParticipatedBid extends Bid {
  itemId: Item & { auctionId:Auction1}; // Detailed information about the item
}

export interface WonBid extends ParticipatedBid {
  itemId: Item & { salePrice: number; soldDate: Date; auctionId:Auction1}; // Sold item with additional details
}

export interface AllAuction extends Auction1 {
  item: Item; // Include the item details for each auction
}

