import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true, // Mark as standalone
  imports: [CommonModule] // Import CommonModule for directives like *ngFor
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe(data => {
      console.log('Fetched products:', data);
      this.products = data;
    });
  }
  
}
