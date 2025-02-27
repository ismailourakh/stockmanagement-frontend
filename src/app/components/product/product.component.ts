import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, AddProductComponent, UpdateProductComponent, DeleteProductComponent]
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  searchKeyword: string = '';
  selectedProduct: Product | null = null;
  productToDelete: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  searchProducts(): void {
    if (this.searchKeyword.trim()) {
      this.productService.search(this.searchKeyword).subscribe((data) => {
        this.products = data;
      });
    } else {
      this.loadProducts();
    }
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
      this.productToDelete = null;
    });
  }

  onProductAdded(product: Product): void {
    this.productService.add(product).subscribe(() => {
      this.loadProducts();
    });
  }

  editProduct(product: Product): void {
    this.selectedProduct = { ...product };
  }

  onProductUpdated(product: Product): void {
    if (product.id) { // Vérifie que l'ID existe
        this.productService.update(product.id, product).subscribe(() => {
            this.loadProducts();
            this.selectedProduct = null;
        });
    }
}


  confirmDelete(product: Product): void {
    this.productToDelete = product;
  }
}