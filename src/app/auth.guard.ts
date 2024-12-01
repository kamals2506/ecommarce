import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { SellerService } from './services/seller.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService);

  // Access the BehaviorSubject as an observable and pipe through logic
  return sellerService.isSellerLoggedIn.pipe(
    map((isLoggedIn) => {
      if (isLoggedIn) {
        return true; // Allow access
      } else { 
        console.warn('Access denied. Seller is not logged in.');
        return false; // Deny access
      }
    })
  );
};
