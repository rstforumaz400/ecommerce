import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product!: Product;

  constructor(private productService: ProductService,
              private route : ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe(()=>{
      this.getProduct();
    });
  }

  getProduct() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
        console.log(`Details Ek Product ka: ${this.product.name}`);
        
      }
    )

  }

}
