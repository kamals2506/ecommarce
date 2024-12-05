import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash, faPen} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  standalone: false,
  
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent {
  productList:undefined | product[];
  productMsg:undefined | string;
  iconDelete = faTrash;
  iconEdit=faPen;
  constructor(private product:ProductService){}

  ngOnInit():void
  {
   this.list();
  }
  deleteProduct(id:number)
  {
    //debugger
    //console.warn('test id',id);
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result)
      {
       
        this.productMsg="Product Delete Successfully";
        this.list();
      }
    })
    setTimeout(() => {
      this.productMsg=undefined
    }, 3000);

  }
  list()
  {
    this.product.productList().subscribe((result)=>{
      console.warn(result);
      this.productList=result;
    })
  }
  editProduct(id:number)
  {

  }
}
