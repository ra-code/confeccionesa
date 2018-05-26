import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CartMinComponent } from '../cart-min/cart-min.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  cart_cant: any;
  cart_item: any;
  fileNameDialogRef: MatDialogRef<CartMinComponent>;
  token:any=JSON.parse(localStorage.getItem('user_tokenDecoded'))
  constructor(public dialog: MatDialog, private router:Router) { }

  ngOnInit() {
    console.log(this.token)
  }
  register() {
    this.router.navigate(['client/signup'])
  }
  signOut(){
    localStorage.removeItem('user_tokenDecoded');
    localStorage.removeItem('user_token');
    this.router.navigate([''])
  }
  //mat dialog carrito de compras
  openDialog(): void {
    this.fileNameDialogRef = this.dialog.open(CartMinComponent, {
      width: '1200px',
      maxHeight: '100%',
    });

  }
}
