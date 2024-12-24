import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Auction_bazaar';
  isDropdownVisible: boolean = false;
  constructor(private router: Router) {}

  toggleDropdown(state: boolean): void {
    this.isDropdownVisible = state;
  }

  logout(): void {
    // Implement logout functionality
    console.log('User logged out');
    this.router.navigate(['/login']);
    
  }
}
