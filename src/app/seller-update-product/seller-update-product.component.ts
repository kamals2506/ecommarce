import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { SellerHomeComponent } from '../seller-home/seller-home.component';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-seller-update-product',
  standalone: false,
  
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent {

  productData : undefined | product;
  productMsg: undefined | string;
  
  constructor(private route:ActivatedRoute, private product:ProductService, private router:Router){}
  ngOnInit()
  {
      let productId=this.route.snapshot.paramMap.get('id');
      console.warn(productId);
      productId && this.product.getProduct(productId).subscribe(
        (data)=>
        {
          console.warn(data);
          this.productData= data;
        }
      )
  }

  updateProduct(product:any)
  {
    
  }
  submit(data:product)
  {
    console.warn(data);
    if(this.productData)
    {
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result)
      {
        this.productMsg="Product has Updated"
        
      }
    });
    setTimeout(() => {
        this.productMsg=undefined;
        this.router.navigate(['/seller-home']);
    }, 3000);
    
  }
}
