import { Injectable } from '@angular/core';
import {AppGlobals} from '../app.globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentsService {

  constructor(private globals:AppGlobals, private http:HttpClient) { }

  proceedToPay(data){
    return this.http.post(`${this.globals.baseAPIUrl}clients/payments`,data)
    .map(res=>res)
  }

}
