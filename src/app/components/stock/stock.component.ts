import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import * as bootstrap from 'bootstrap'; // ✅ Importation correcte

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  products: Product[] = [];
  searchKeyword: string = '';
  selectedProduct: Product | null = null;
  productToDelete: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Charger tous les produits
  loadProducts(): void {
    this.productService.getAll().subscribe((data) => {
      this.products = data;
    });
  }

  // Rechercher un produit
  searchProducts(): void {
    if (this.searchKeyword.trim()) {
      this.productService.search(this.searchKeyword).subscribe((data) => {
        this.products = data;
      });
    } else {
      this.loadProducts();
    }
  }

  // Confirmer la suppression avec un modal Bootstrap
  confirmDelete(product: Product): void {
    this.productToDelete = product;
    const modalElement = document.getElementById('deleteConfirmationModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }  

  // Supprimer un produit
  deleteProduct(): void {
    if (this.productToDelete) {
      this.productService.delete(this.productToDelete.id!).subscribe(() => {
        this.loadProducts();
        this.productToDelete = null;
        
        // Fermer le modal après suppression
        const modalElement = document.getElementById('deleteConfirmationModal');
        if (modalElement) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          modal?.hide();
        }
      });
    }
  }

  // Ajouter un produit
  onProductAdded(product: Product): void {
    this.productService.add(product).subscribe(() => {
      this.loadProducts();
    });
  }

  // Modifier un produit
  
editProduct(product: Product): void {
  this.selectedProduct = { ...product }; // Cloner l'objet pour éviter les modifications directes
  const modalElement = document.getElementById('editProductModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }
}
updateProduct(): void {
  if (this.selectedProduct && this.selectedProduct.id) {
    this.productService.update(this.selectedProduct.id, this.selectedProduct).subscribe(() => {
      this.loadProducts();
      this.selectedProduct = null;

      // Fermer le modal après mise à jour
      const modalElement = document.getElementById('editProductModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }
    });
  }
}

  // Mettre à jour un produit
  onProductUpdated(product: Product): void {
    if (product.id) {
      this.productService.update(product.id, product).subscribe(() => {
        this.loadProducts();
        this.selectedProduct = null;
      });
    }
  }
  
}
