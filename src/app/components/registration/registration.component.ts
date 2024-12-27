import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink], // Add HttpClientModule to imports here
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  passwordFieldType: string = "password";
  errorMessage: string = "";
  name: string = ""; // Include name field
  username: string = "";
  email: string = "";
  password: string = "";
  signupAs: string = "";

  constructor(private http: HttpClient,private router: Router) {} // Inject HttpClient directly into the component

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onSignup(signupForm: any): void {
    if (signupForm.invalid) {
      this.errorMessage = "Please fill all required fields correctly!";
      return;
    }

    const { name, username, email, password, signupAs } = signupForm.value;

    if (!this.isValidEmail(email)) {
      this.errorMessage = "Please enter a valid email address.";
      return;
    }

    this.errorMessage = "";

    // Create the user data object to send to the backend, including name
    const userData = { name, username, email, password, role: signupAs };

    // Make the POST request to the backend
    this.http.post('http://localhost:5000/register', userData).subscribe(
      (response: any) => {
        // Handle successful response
        alert(response.message);
        // console.log('User registered successfully:', response);
        signupForm.reset();
        this.router.navigate(["/login"]);
      },
      error => {
        // Handle error response
        this.errorMessage = error.error.error;//"Error registering user. Please try again.";
        // console.error('Error registering user:', error);
      }
    );
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
