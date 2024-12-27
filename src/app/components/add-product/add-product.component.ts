import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for API calls
import { Product } from '../../models/auction.model'; // Adjust the path as needed

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  formatDateToDatetimeLocal(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
  product: Product = {
    auctioneerId: '',
    name: '',
    startingPrice: 0,
    category: 'Electronics', // Default category
    startTime: this.formatDateToDatetimeLocal(new Date()),
    endTime: this.formatDateToDatetimeLocal(new Date()),
    description: '',
    image: null,
  };
  auctionData = {
    productName: '',
    description: '',
    minPrice: 0,
    currentBid: 0,
    category: '',
    remainingTime: '',
    endDate: '',
    image: ''
  };

  categories = ['Electronics', 'Fashion', 'Laptops', 'Books', "TV's", "Antiques"];
  filePreview: string | null = null;

  constructor(
    private dialogRef: MatDialogRef<AddProductComponent>,
    private http: HttpClient // Inject HttpClient to make the API request
  ) {}

  // This method is triggered when a file is selected
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.product.image = input.files[0];
      // Create a file preview if it's an image
      if (this.isImage(this.product.image)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.filePreview = e.target.result;
        };
        reader.readAsDataURL(this.product.image);
      }
    } else {
      this.product.image = null;
      this.filePreview = null;
    }
  }

  // Check if the selected file is an image
  isImage(file: File | null): boolean {
    return file ? file.type.startsWith('image/') : false;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // Handle form submission
  onSubmit() {
    const formData = new FormData();
    const startTime = new Date(this.product.startTime);
    const endTime = new Date(this.product.endTime);
    const auctioneerId =localStorage.getItem('A_Id') || '';
    // Append product details to formData
    formData.append('auctioneerId',auctioneerId);// this.product.auctioneerId);
    formData.append('startTime', startTime.toISOString());
    formData.append('endTime', endTime.toISOString());
    formData.append('startingPrice', this.product.startingPrice.toString());
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('category', this.product.category);

    // Append the image file to formData
    if (this.product.image) {
      formData.append('itemImage', this.product.image, this.product.image.name);
    }

    // Send the data to the backend API
    this.http.post('http://localhost:5000/create-auction', formData).subscribe(
      (response) => {
        console.log('Product created successfully:', response);
        // const item=response.item;
        // this.r.endDate=new Date(this.r.Date);
        this.dialogRef.close(response); // Close the dialog with the response data
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }

  // Clear the form
  clearForm() {
    this.product = {
      auctioneerId: '',
      name: '',
      startingPrice: 0,
      category: 'Electronics',
      startTime: new Date(),
      endTime: new Date(),
      description: '',
      image: null,
    };
    this.filePreview = null;
  }

  closeForm() {
    this.dialogRef.close();
  }
}
