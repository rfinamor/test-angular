import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private endpoint: string;
  private domain: string;
  public products : Product[];
  constructor(private httpClient: HttpClient) {
    this.domain = environment.apiDomain;
    this.endpoint = environment.shoppingPath;
    this.products = [];
  }

  getProducts(){
    return this.httpClient.get<Observable<Product[]>>(`${this.domain}${this.endpoint}`);
  }

}