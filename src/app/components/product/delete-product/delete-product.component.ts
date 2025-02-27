import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-product',
  standalone: true,
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
  imports: [CommonModule]
})
export class DeleteProductComponent {
  @Input() productName: string = '';
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();
}
