import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  code: string;
  name: string;
  description?: string;
  unitPrice: number;
  quantityInStock: number;
  alertThreshold?: number;
  categoryId?: number;
  categoryName?: string;
  supplierIds?: number[];
  supplierNames?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:9090/api/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  add(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/code/${code}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?keyword=${keyword}`);
  }

  updateStock(id: number, quantity: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/stock?quantity=${quantity}`, {});
  }
}
