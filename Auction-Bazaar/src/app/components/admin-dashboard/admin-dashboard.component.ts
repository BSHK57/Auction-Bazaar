import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserAuctionChartComponent } from '../user-auction-chart/user-auction-chart.component';
import { CategoryService } from '../../category.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, UserAuctionChartComponent],
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  userRole: string = 'admin'; // Mocked user role
  selectedTab: string = 'manageUsers'; // Default tab
  isSidebarCollapsed = false;

  // Admin details
  admin: any;

  // Dashboard statistics
  totalUsers: number = 0;
  activeAuctionsCount: number = 0;
  pendingApprovalsCount: number = 0;
  totalRevenue: number = 0;

  // Data
  users: any[] = [];
  pendingApprovals: any[] = [];
  items: any[] = [];
  selectedBids: any;
  showBidsModal: boolean = false;
  showItemsModal: boolean = false;
  selectedItems: any;

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  ngOnInit() {
    this.fetchAdminData();
    this.fetchDashboardStats();
    this.fetchUsers();
    this.fetchPendingApprovals();
    this.fetchItems();
    this.getcategory();
  }
  fetchAdminData() {
    this.http.get(`http://localhost:5000/admin/${localStorage.getItem('Admin_Id')}`).subscribe((admin: any) => {
      this.admin = admin;
      console.log(admin);
      this.admin.profilePicture = "Admin123.webp";
      console.log(this.admin);
    });
  }
  // Fetch dashboard statistics
  fetchDashboardStats() {
    this.http.get('http://localhost:5000/api/dashboard/stats').subscribe((stats: any) => {
      this.totalUsers = stats.totalUsers;
      this.activeAuctionsCount = stats.activeAuctionsCount;
      this.pendingApprovalsCount = stats.pendingApprovalsCount;
      this.totalRevenue = stats.totalRevenue;
    });
  }

  currency(Number: number) {
    return Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', }).format(Number);
  }

  // Fetch all users
  fetchUsers() {
    this.http.get('http://localhost:5000/api/users').subscribe((users: any) => {
      this.users = users;
      for (const user of this.users) {
        if (user.auctioneer && !user.bidder) {
          user.role = "Auctioneer";
        }
        else if (!user.auctioneer && user.bidder) {
          user.role = "Bidder";
        }
        else {
          user.role = "Both(Auctioneer and Bidder)";
        }
      }
      console.log(this.users);
    });


  }

  // Fetch pending auction approvals
  fetchPendingApprovals() {
    this.http.get('http://localhost:5000/api/auctions/pending').subscribe((approvals: any) => {
      this.pendingApprovals = approvals;
    });
  }

  // Fetch all items
  fetchItems() {
    this.http.get('http://localhost:5000/api/items').subscribe((items: any) => {
      this.items = items;
    });
  }

  // Set active tab
  setTab(tab: string) {
    this.selectedTab = tab;
  }

  // Toggle user status
  toggleUserStatus(userId: number) {
    this.http.patch(`http://localhost:5000/api/users/${userId}/status`, {}).subscribe(() => {
      this.fetchUsers();
    });
  }

  // Approve an auction
  approveAuction(auctionId: string) {
    this.http.patch(`http://localhost:5000/api/auctions/${auctionId}/approve`, {}).subscribe(() => {
      this.fetchPendingApprovals();
      this.fetchDashboardStats();
    });
  }

  // Reject an auction
  rejectAuction(auctionId: number) {
    this.http.patch(`http://localhost:5000/api/auctions/${auctionId}/reject`, {}).subscribe(() => {
      this.fetchPendingApprovals();
    });
  }

  // Delete an item
  deleteItem(itemId: string) {
    this.http.delete(`http://localhost:5000/api/items/${itemId}`).subscribe(() => {
      this.fetchItems();
    });
  }

  // View all bids for a user
  viewAllBids(bidderId: any) {
    this.http.get(`http://localhost:5000/api/bids/${bidderId}`).subscribe((bids: any) => {
      this.selectedBids = bids;
      this.showBidsModal = true;
      console.log('Bids:', this.selectedBids, this.showBidsModal);
    }); this.showBidsModal = true;
  }

  // View all items for a user
  viewAllItems(auctioneerId: any) {
    this.http.get(`http://localhost:5000/api/items/${auctioneerId}`).subscribe((items: any) => {
      console.log('Items:', items);
      this.selectedItems = items;
      this.showItemsModal = true;
    });
  }

  // Get status button class
  getStatusButtonClass(status: string): string {
    return status === 'Active' ? 'active' : 'inactive';
  }
  categories: any[] = []; // Array to store categories
  newCategory: string = ''; // For new category input
  showAddCategoryModal: boolean = false;
  showEditCategoryModal: boolean = false;
  editCategory1: string = ''; editIndex: any;
  getcategory() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  editCategory(i: number, category1: string) {
    this.editIndex = i;
    this.editCategory1 = category1;
    this.showEditCategoryModal = true;
  }
  onEditCategory() {
    if (this.editCategory1.trim()) {
      this.categoryService.updateCategory(this.editIndex, this.editCategory1);
      this.updateCategories();
      this.editCategory1 = '';
      this.editIndex = null;
      this.showEditCategoryModal = false; // Close the modal
    }
  }
  deleteCategory(category: string) {
    this.categoryService.removeCategory(category);
    this.updateCategories();
  }

  onAddCategory() {
    if (this.newCategory.trim()) {
      this.categoryService.addCategory(this.newCategory);
      this.updateCategories();
      this.newCategory = '';
      this.showAddCategoryModal = false; // Close the modal
    }
  }

  private updateCategories(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  // Close the modal without adding
  onCloseModal() {
    this.newCategory = '';
    this.showAddCategoryModal = false;
    this.showEditCategoryModal = false;
  }
  closeBidsModal() {
    this.showBidsModal = false;
  }
  closeItemsModal() {
    this.showItemsModal = false;
  }
}
