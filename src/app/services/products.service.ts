import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private endpoint: string;
  public products : Product[];
  constructor(private httpClient: HttpClient) {
    this.endpoint = environment.endpoint;
    this.products = [];
  }

  getProducts() : Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.endpoint}`);
  }

}