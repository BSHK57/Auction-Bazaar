import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/auction.model'; // Adjust the path as needed

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule,FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    productName: '',
    minPrice: null,
    category: '',
    time: '',
    date: '',
    selectedFile: null,
    description: null,
  };

  constructor(private dialogRef: MatDialogRef<AddProductComponent>) {}

  categories = ['Electronics', 'Clothing', 'Home', 'Books'];
  filePreview: string | null = null;

  // This method is triggered when a file is selected
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.product.selectedFile = input.files[0];
      // Create a file preview if it's an image
      if (this.isImage(this.product.selectedFile)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.filePreview = e.target.result;
        };
        reader.readAsDataURL(this.product.selectedFile);
      }
    } else {
      this.product.selectedFile = null;
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
    console.log('Product Details:', this.product);
    this.dialogRef.close(this.product);
  }

  clearForm() {
    this.product = {
      productName: '',
      minPrice: null,
      category: '',
      time: '',
      date: '',
      selectedFile: null,
      description: null,
    };
    this.filePreview = null;
  }
}
