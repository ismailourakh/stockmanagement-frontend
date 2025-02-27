import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductComponent } from './components/product/product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule, ProductListComponent, SidebarComponent, ProductComponent]
})
export class AppComponent {
  title = 'stock-management-frontend';
}
