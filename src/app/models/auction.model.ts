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
  productName: string;
  minPrice: number | null;
  category: string;
  time: string;
  date: string;
  selectedFile: File | null;
  description: string | null;
}
