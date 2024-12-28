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

