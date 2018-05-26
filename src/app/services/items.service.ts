import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemsService {
  domain = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }
  showAll() {
    return this.http.get(`${this.domain}admin/showallitems`)
      .map(res => res);
  }
  deleteItem(a) {
    return this.http.delete(`${this.domain}admin/items/`+a)
      .map(res => res);
  }
  findOneItem(data){

  return this.http.post(`${this.domain}admin/showoneitem`,data)
  .map(res=>res)
}
findListOfItems(data){
  return this.http.post(`${this.domain}admin/findListOfItems`,data)
  .map(res=>res)
}
  // editItem(data) {
  //   return this.http.put(`${this.domain}/admin/items/`+a,data)
  //     .map(res => res);
  // }
  //Categories--------------------------------------------
  showCategories() {
    return this.http.get(`${this.domain}admin/categories`)
      .map(res => res);
  }
  newCategorie(data) {
    console.log(data)
    return this.http.post(`${this.domain}admin/categories`, data)
      .map(res => res);
  }

  deleteCategorie(a) {
    return this.http.delete(`${this.domain}admin/categories/`+a)
      .map(res => res);
  }
//ConfigsAdmin
  showConfig(){
    return this.http.get(`${this.domain}admin/config`)
    .map(res=>res)
  }
  saveConfig(data){
    return this.http.post(`${this.domain}admin/config`,data)
    .map(res=>res)
  }
  //login and sigup admin
  loginAdmin(data){
    return this.http.post(`${this.domain}admin/login`,data)
    .map(res=>res)
  }


  // newItem(data) {
  //   console.log('entro');
  //   console.log(data);
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryvaPSgvkOAxWheGp5',
  //       'Authorization': 'my-auth-token'
  //     })
  //   };
  //   return this.http.post(`${this.domain}/admin/newitem`, data)
  //     .map(res => res);
  // }
}
