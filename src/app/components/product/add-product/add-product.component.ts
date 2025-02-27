import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  imports: [FormsModule, CommonModule]
})
export class AddProductComponent {
  newProduct: Product = {
    code: '',
    name: '',
    unitPrice: 0,
    quantityInStock: 0
  };

  @Output() productAdded = new EventEmitter<Product>();

  addProduct(): void {
    this.productAdded.emit(this.newProduct);
    this.newProduct = { code: '', name: '', unitPrice: 0, quantityInStock: 0 };
  }
}
