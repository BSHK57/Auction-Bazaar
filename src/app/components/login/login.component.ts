import { Component  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {  HttpClient } from '@angular/common/http'; // Import HttpClientModule
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
          const user=response.user;
          alert(`Hi ${user.name}, Login Successful!`);
          loginForm.reset();
          localStorage.setItem("User_Id",user._id);
          // Redirect based on the role
          if (user.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);  // Navigate to admin dashboard
          } else if (user.role === 'auctioneer') {
            localStorage.setItem("role","Auctioneer")
            this.router.navigate(['/user-dashboard']);  // Navigate to auctioneer dashboard
          } else {
            localStorage.setItem("role","Bidder")
            this.router.navigate(['/user-dashboard']);  // Default user dashboard or redirect based on the role
          }
          loginForm.reset();
        },
        (error) => {
          if (error.error.error){
            this.errorMessage=error.error.error;
          }
          else{
            this.errorMessage = 'Invalid email or password ';
          }
          // console.error('Login error:', error);
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
