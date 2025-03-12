import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {
    this.loadCategoriesFromFile();
  }

  // Load categories from the text file
  loadCategoriesFromFile(): void {
    this.http
      .get("categories.txt", { responseType: 'text' })
      .pipe(
        map((data: string) => data.split('\n').map((category) => category.trim()).filter((category) => category))
      )
      .subscribe((categories: string[]) => {
        this.categories.next(categories);
      });
  }

  // Get the current list of categories
  getCategories(): Observable<string[]> {
    // this.loadCategoriesFromFile();
    return this.categories.asObservable();
  }

  // Add a new category
  addCategory(category: string): void {
    const updatedCategories = [...this.categories.getValue(), category];
    this.categories.next(updatedCategories);
    // this.loadCategoriesFromFile();
  }

  // Remove a category by name
  removeCategory(category: string): void {
    const updatedCategories = this.categories.getValue().filter((c) => c !== category);
    this.categories.next(updatedCategories);
    this.loadCategoriesFromFile();
  }

  // Update a category by index
  updateCategory(index: number, newCategory: string): void {
    const currentCategories = [...this.categories.getValue()];
    if (index >= 0 && index < currentCategories.length) {
      currentCategories[index] = newCategory;
      this.categories.next(currentCategories);
    }
    this.loadCategoriesFromFile();
  }
}
