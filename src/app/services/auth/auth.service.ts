import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
const helper = new JwtHelperService();
@Injectable()
export class AuthService {

  constructor() { }
  public isAuthenticated(): boolean {

    const token = localStorage.getItem('adminToken');
    var decodedToken = helper.decodeToken(token)
    
    // Check whether the token is expired and return
    // true or false
    if (localStorage.getItem('adminToken')) {
      if (decodedToken.exp) {
        if (helper.isTokenExpired(token)) {
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminUserName')
          localStorage.removeItem('adminUserRole')
        }
        return !helper.isTokenExpired(token);
      } else {
        return true
      }
    }
    return false
  }
}
