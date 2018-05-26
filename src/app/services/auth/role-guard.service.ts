import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();
@Injectable()
export class RoleGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {

    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;

    const token = localStorage.getItem('adminToken');

    // decode the token to get its payload
    const tokenPayload = helper.decodeToken(token);
    
    if (!this.auth.isAuthenticated() || tokenPayload.payload.role != expectedRole) {
      this.router.navigate(['admin/login']);
      return false;
    }
    return true;
  }
}
