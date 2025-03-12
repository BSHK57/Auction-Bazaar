import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  email: string = '';
  message: string = '';
  errorMessage: string = '';

  onSubmit(): void {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    if (this.email && emailRegex.test(this.email)) {
      // Simulating an API call or backend process
      setTimeout(() => {
        this.message = `A reset link has been sent to ${this.email}.`;
        this.errorMessage = '';
      }, 10);
    } else {
      if (!this.email) {
        this.errorMessage = 'Email is required.';
      } else if (!emailRegex.test(this.email)) {
        this.errorMessage = 'Please enter a valid email address.';
      }
      this.message = '';
    }
  }
  
}
