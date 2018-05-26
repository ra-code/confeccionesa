import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppGlobals } from '../app.globals'
import 'rxjs/add/operator/map';
@Injectable()
export class ClientsService {

  constructor(private http: HttpClient, private global: AppGlobals) { }

  registerUser(data) {
    return this.http.post(`${this.global.baseAPIUrl}clients/registerUser`, data)
      .map(res => res)
  }



}
