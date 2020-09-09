import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanActivateChildGuard implements  CanActivateChild {
  
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)  : boolean
  {
    alert('Can activate chikd calld')
    return true;
  }
}
