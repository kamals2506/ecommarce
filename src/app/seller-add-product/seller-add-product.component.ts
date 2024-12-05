import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: false,
  
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {
  addProductMsg:string|undefined;
constructor(private product:ProductService){}

  submitProduct(data:product)
  {
    console.warn(data);
    this.product.addProduct(data).subscribe((result)=>{
      console.warn("add data",result);
      if(result)
      {
        this.addProductMsg="Product successfully Added";
       
      }
      setTimeout(() => (this.addProductMsg = undefined),3000);
    })
  }
}
