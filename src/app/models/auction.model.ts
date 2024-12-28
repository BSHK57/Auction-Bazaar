// models/auction.model.ts
export interface Auction {
  _id: string;
  productName: string;
  description: string;
  currentBid: string;
  remainingTime: string;
  minPrice: number;
  endDate: Date;
  image: string;
  category: string;
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

