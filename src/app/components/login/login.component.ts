import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClientModule
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule // Add HttpClientModule here
  ],
})
export class LoginComponent {
  email = '';
  password: string = '';
  errorMessage: string = '';
  passwordFieldType: string = 'password';
  signinAs: any;

  constructor(private http: HttpClient,private router:Router) { } // Inject HttpClient

  onClick(loginForm: any): void {
    if (loginForm.valid) {
      this.errorMessage = '';
      const loginData = { email: this.email, password: this.password,role:this.signinAs };
      this.http.post('http://localhost:5000/login', loginData).subscribe(
        (response: any) => {
          alert(`Hi ${response.name}, Login Successful!`);
          loginForm.reset();
          // Redirect based on the role
          if (response.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);  // Navigate to admin dashboard
          } else if (response.role === 'auctioneer') {
            this.router.navigate(['/auctioneer-dashboard']);  // Navigate to auctioneer dashboard
          } else {
            this.router.navigate(['/user-dashboard']);  // Default user dashboard or redirect based on the role
          }

          loginForm.reset();
        },
        (error) => {
          this.errorMessage = 'Invalid email or password ';
          
          console.error('Login error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill out all required fields';
    }
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
