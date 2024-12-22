import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  imports:[CommonModule, FormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  passwordFieldType: string = "password";
  errorMessage: string = "";
  name: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  signupAs: string = "";

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
    alert("SignUp Successful");
    console.log('Form submitted successfully:', { name, username, email, password, signupAs });
    signupForm.reset();
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
