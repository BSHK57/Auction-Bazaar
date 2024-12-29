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
  signinAs: string='';

  constructor(private http: HttpClient,private router:Router) { } // Inject HttpClient

  onClick(loginForm: any): void {
    console.log(this.signinAs);
    if (loginForm.valid) {
      this.errorMessage = '';
      const loginData = { email: this.email, password: this.password,role:this.signinAs };
      this.http.post('http://localhost:5000/login', loginData).subscribe(
        (response: any) => {
          const user=response.user;
          alert(`Hi ${user.name}, Login Successful! as ${this.signinAs}`);
          if (user.auctioneer){
            localStorage.setItem("A_Id",user.auctioneer.toString());
          }
          if (user.bidder){
            localStorage.setItem("B_Id",user.bidder.toString());
          }
          localStorage.setItem("User_Id",user._id);
          console.log(user._id);
          // Redirect based on the role
          if (this.signinAs === 'admin') {
            this.router.navigate(['/admin-dashboard']);  // Navigate to admin dashboard
          } 
          if (this.signinAs === "auctioneer") {
            localStorage.setItem("role","auctioneer");
            this.router.navigate(['/auctioneer-dashboard']);  // Navigate to auctioneer dashboard
          } 
          if (this.signinAs === "bidder") {
            localStorage.setItem("role","bidder");
            this.router.navigate(['/bidder-dashboard']);  // Default user dashboard or redirect based on the role
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
