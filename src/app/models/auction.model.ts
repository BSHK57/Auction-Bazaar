// models/auction.model.ts
export interface Auction {
isFavorite: any;
isHovered: any;
  id: number;
  title: string;
  description: string;
  currentBid: number;
  timeLeft: string;
  image: string;
  bids: number;
  watchers: number;
  seller: {
    name: string;
    rating: number;
    image: string;
  };
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

