import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent {

  products: Product[] = [];
  currentcategoryId: number = 1;
  constructor(private ps: ProductService, private route: ActivatedRoute){}

  ngOnInit(){
    
    this.route.paramMap.subscribe(() =>{
      this.listProducts()
    });
  }

  listProducts(){

    // check if 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      this.currentcategoryId = +this.route.snapshot.paramMap.get('id')!;
    }else{
      this.currentcategoryId = 1;
    }

    this.ps.getProducts(this.currentcategoryId).subscribe(
      vada =>{
        this.products = vada;
        console.log(this.products);
        
      }
    );
  }

  // check balance
  checkBalance(){
    //console.log('Please wait while we are fetching details for you');
    
    this.ps.getBalance().subscribe( 
      data => {
        console.log(data)
      }
    )
  }
} // end of class
