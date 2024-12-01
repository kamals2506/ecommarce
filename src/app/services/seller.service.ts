import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  isSellerLoggedIn=new BehaviorSubject<boolean>(false)
  isloginError=new EventEmitter<Boolean>(false)
  constructor(private http:HttpClient,private router:Router) { }
 private url="http://localhost:3000/seller";

  userSignUp(data:signUp)
  {
    // this.http.post(this.url,data,{observe:'response'}).subscribe((result)=>{
    //   this.isSellerLoggedIn.next(true);
    //   console.warn("result",result);
    // })
    if (!data.name || !data.email || !data.password) { 
      alert("Please fill in all the required fields.");
      return;
    }
   this.http.post(this.url,data,{observe:'response'}).subscribe((result)=>{
    this.isSellerLoggedIn.next(true);
    localStorage.setItem('seller',JSON.stringify(result.body))
    
    this.router.navigate(['seller-home'])
    //console.warn("result",result);
    }); 
  }
  reloadSeller()
  {
    if(localStorage.getItem('seller'))
    {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userlogin(data:login)
  {
    if (!data.email || !data.password) { 
      alert("Please fill in all the required fields.");
      return;
    }
    console.warn(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      {observe:'response'}
    ).subscribe((result:any)=>{ 
      
      if(result && result.body && result.body.length)
      {
        //console.warn("user Logged In")
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
      else{
        console.warn("login fail")
        this.isloginError.emit(true)
      }
    })
  }
}
