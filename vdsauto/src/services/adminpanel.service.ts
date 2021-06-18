import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";

@Injectable({
  providedIn: 'root'
})
export class AdminpanelService implements CanActivate {

  constructor(private router: Router,
              private sessionStorage: SessionService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (sessionStorage.getItem('user')) {
      return true;
    }
    return this.router.createUrlTree(['/']);
  }
}
