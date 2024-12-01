import { Component, OnInit} from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';



@Component({
  selector: 'app-seller-auth',
  standalone: false,
  
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent implements OnInit{
  constructor(private seller:SellerService,private router:Router) {}

  showlogin=false;
  authError:string='';
  ngOnInit():void{
    this.seller.reloadSeller()
  }
  signUp(data:signUp):void
  {
    
    this.seller.userSignUp(data)
  }
  login(data:login):void
  {
    this.authError="";
   this.seller.userlogin(data);
   this.seller.isloginError.subscribe((isError)=>{
    if(isError)
    {
      this.authError="Email or Password Not Correct ";
    }
   })
  }
  openlogin()
  {
    this.showlogin=true;
  }
  openSignUp()
  {
    this.showlogin=false;
  }
 
  
}
