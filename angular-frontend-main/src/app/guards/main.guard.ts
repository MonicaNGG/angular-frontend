import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';




export const mainGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  if( sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === undefined ) 
  {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
