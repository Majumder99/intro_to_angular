import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private productService: ProductsService) {}

  products: Product[] = [];
  rows: number = 5;
  totalRecords: number = 0;
  onProductOutput(product: Product) {
    console.log('output', product);
  }
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }
  fetchProducts(page: number, perPage: number) {
    this.productService
      .getProducts('http://localhost:3000/clothes', {
        page,
        perPage,
      })
      .subscribe({
        next: (response: Products) => {
          this.products = response.items;
          this.totalRecords = response.total;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.productService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productService
      .addProduct('http://localhost:3000/clothes', product)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
