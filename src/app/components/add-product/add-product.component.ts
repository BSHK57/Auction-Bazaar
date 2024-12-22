import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productName: string = '';
  minPrice: number = 0;
  category: string = '';
  time: string = '';
  date: string = '';
  categories = ['Electronics', 'Clothing', 'Home', 'Books'];
  selectedFile: File | null = null;
  filePreview: string | null = null;

  // This method is triggered when a file is selected
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      // Create a file preview if it's an image
      if (this.isImage(this.selectedFile)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.filePreview = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    } else {
      this.selectedFile = null;
      this.filePreview = null;
    }
  }

  // Check if the selected file is an image
  isImage(file: File | null): boolean {
    return file ? file.type.startsWith('image/') : false;
  }

  // Handle form submission
  onSubmit() {
    console.log('Product Name:', this.productName);
    console.log('Min Price:', this.minPrice);
    console.log('Category:', this.category);
    console.log('Time:', this.time);
    console.log('Date:', this.date);
    console.log('Selected File:', this.selectedFile);
  }

  clearForm() {
    this.selectedFile = null;
    this.filePreview = null;
    this.productName = '';
    this.minPrice = 0;
    this.category = '';
    this.time = '';
    this.date = '';
}

}
