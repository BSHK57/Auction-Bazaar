import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuctionChartComponent } from '../user-auction-chart/user-auction-chart.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, UserAuctionChartComponent],
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  userRole: string = 'admin'; // Mocked user role
  selectedTab: string = 'manageUsers'; // Default tab
  isSidebarCollapsed = false;

  // Mocked admin details
  adminDetails = {
    name: 'John Doe',
    email: 'admin@example.com',
    profileImage: 'Admin123.webp',
  };

  // Mocked dashboard statistics
  totalUsers: number = 3;
  activeAuctionsCount: number = 15;
  pendingApprovalsCount: number = 3;
  totalRevenue: number = 105000; // Example revenue

  // Mocked user data
  users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Bidder', status: 'Active' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Auctioneer', status: 'Inactive' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'Bidder', status: 'Active' },
  ];

  // Mocked pending auction approvals
  pendingApprovals = [
    {
      id: 101,
      productName: 'Vintage Watch',
      description: 'A rare vintage watch from the 1950s.',
      submittedBy: 'Alice',
    },
    {
      id: 102,
      productName: 'Antique Vase',
      description: 'A beautiful handcrafted vase from the 1800s.',
      submittedBy: 'Bob',
    },
  ];

  // Mocked categories and items
  categories = [
    { id: 1, name: 'Watches' },
    { id: 2, name: 'Vases' },
    { id: 3, name: 'Jewelry' },
  ];

  items = [
    {
      auctionId: '123',
      name: 'Vintage Watch',
      description: 'A rare vintage watch from the 1950s.',
      salePrice: 15000,
      category: 'Watches',
      image: 'path/to/image.jpg',
    },
    {
      auctionId: '124',
      name: 'Antique Vase',
      description: 'A beautiful handcrafted vase from the 1800s.',
      salePrice: 5000,
      category: 'Vases',
      image: 'path/to/image2.jpg',
    },
    {
      auctionId: '125',
      name: 'Gold Necklace',
      description: 'A stunning 24K gold necklace.',
      salePrice: 20000,
      category: 'Jewelry',
      image: 'path/to/image3.jpg',
    },
  ];

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  setTab(tab: string) {
    this.selectedTab = tab;
  }

  toggleUserStatus(userId: number) {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    }
  }

  approveAuction(auctionId: number) {
    this.pendingApprovals = this.pendingApprovals.filter((auction) => auction.id !== auctionId);
    this.pendingApprovalsCount--;
    this.activeAuctionsCount++; // Example logic: Add to active auctions count
  }

  rejectAuction(auctionId: number) {
    this.pendingApprovals = this.pendingApprovals.filter((auction) => auction.id !== auctionId);
    this.pendingApprovalsCount--;
  }

  getStatusButtonClass(status: string): string {
    return status === 'Active' ? 'active' : 'inactive';
  }

  // Methods for managing categories and items
  editItem(itemId: string) {
    console.log('Editing item with ID:', itemId);
    // Implement editing functionality
  }

  deleteItem(itemId: string) {
    this.items = this.items.filter((item) => item.auctionId !== itemId);
    console.log('Deleted item with ID:', itemId);
  }
}
