import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone:true,
  imports:[CommonModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';

  onSubmit(): void {
    if (this.name && this.email && this.message) {
      console.log('Contact Form Submitted:');
      console.log(`Name: ${this.name}`);
      console.log(`Email: ${this.email}`);
      console.log(`Message: ${this.message}`);

      // Reset form fields after submission
      this.name = '';
      this.email = '';
      this.message = '';

      // Add further actions, such as sending data to a server
      alert('Thank you for contacting us. We will get back to you shortly!');
    } else {
      alert('Please fill out all fields before submitting.');
    }
  }
}
