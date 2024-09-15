import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  ekUrl: string = 'http://localhost:8080/products'

  searchByCategoryUrl: string = 'http://localhost:8080/products/search/findByCategoryId?id='
  
  dusraUrl: string = 'http://localhost:8080/balance'

  constructor(private badam: HttpClient) { }

  getProducts(categoryId: number): Observable<Product[]>{
    console.log('current Category id is: '+categoryId);
    
    return this.badam.get<ProductResponse>(this.searchByCategoryUrl+categoryId).pipe(
      map(data => data._embedded.products)
    );
  }

  // get a product
  getProduct(productId: number): Observable<Product>{
    // Need to build url, based on product id
    const productUrl = `${this.ekUrl }/${productId}`;
    return this.badam.get<Product>(productUrl);
  }

  // method for consuming rest api to check balance

  getBalance(){
    return this.badam.get(this.dusraUrl)
  }


}


interface ProductResponse{
  _embedded : {
    products: Product[];
  }
}