import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ItemsService } from '../../services/items.service'
import { Router } from '@angular/router'
import {AppGlobals} from '../../app.globals'
@Component({
  selector: 'app-cart-min',
  templateUrl: './cart-min.component.html',
  styleUrls: ['./cart-min.component.css']
})
export class CartMinComponent implements OnInit {
  api: any;
  items: any;
  cart_item: any;
  constructor(private itemsService: ItemsService, private router: Router, public dialogRef: MatDialogRef<CartMinComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private globals:AppGlobals) { 
      this.api=this.globals.baseAPIUrl
    }


  ngOnInit() {
    this.items = JSON.parse(localStorage.getItem('cart_item'))
    // this.itemsService.findListOfItems(this.cart_item)
    // .subscribe(data=>{

    //   this.items=data
    //   console.log(this.items)
    // })

  }
  deleteAllItemsCart() {

    localStorage.removeItem('cart_item')
    this.items = null
  }
  proceedCheckout() {
    this.dialogRef.close();
    this.router.navigate(['/checkout'])
  }
}
