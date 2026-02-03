import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = 'http://localhost:3000/products'; // this should be replaced with backend url

  constructor( private http: HttpClient ) { }


  // GET : fetch all the products.
  getProducts() : Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURL);
  }

  // POST : Add a new Product.
  addProduct(product: Product) : Observable<Product>{
    return this.http.post<Product>(this.apiURL , product);
  }

  //UPDATE : update an existing product
  updateProduct(product: Product) : Observable<Product>{
    const url = `${this.apiURL}/${product.id}`;
    return this.http.put<Product>(url,product);
  }

  // DELETE : delete an existing product
  deleteProduct(id: number) : Observable<any>{
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url);
  }

}
