import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate,CanActivateChild{

  private test: Observable<boolean>;

  constructor(private router: Router) {

  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)  : boolean
  {
    alert('Can activate chikd calld')
    return true;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('SampleToken') !== '' && localStorage.getItem('SampleToken') !== undefined) {
      // alert('You are a valid user');
      return true;
    }
    else {
      // alert('Invalid User!!!, Please login to continue');
      this.router.navigate(['/login']);
      return false;
      
    }
    return false;
  }

}
