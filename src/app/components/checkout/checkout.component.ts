import { Component, OnInit } from '@angular/core';
import { AppGlobals } from '../../app.globals';
import { PaymentsService } from '../../services/payments.service';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  stringTemplate: string;
  voucher: string;
  data: any;
  chck_iva: number;
  chck_cargos_web: number;
  chck_subtotal: number;
  chck_total: number;
  api: string;
  items: any;
  types: any
  pay: FormGroup;
  constructor(private _appGlobals: AppGlobals, private paymentsService: PaymentsService, private fb:FormBuilder) { 
    
  }

 
  proceedToPay() {

    if (localStorage.getItem('user_token')) {
      console.log('entramos a pagar')
      var data = {
        'token': JSON.parse(localStorage.getItem('user_token')),
        'items': this.items,
        'amount': this.chck_total
      }
      this.paymentsService.proceedToPay(data)
        .subscribe(data => {
          this.data = data
          
          if(this.data.success==false){console.log(this.data.err)}
          else{
            this.voucher=JSON.stringify(this.data.voucher)
            
            
          

          }


        })
    } else {
      console.log('debe iniciar sesion')
    }
    // var data={
    //   'items':this.items,
    //   'amount':this.chck_total
    // }
    // this.paymentsService.proceedToPay(data)
    // .subscribe(data=>{

    // })
  }
  ngOnInit() {
    
    this.api = this._appGlobals.baseAPIUrl
    this.items = JSON.parse(localStorage.getItem('cart_item'))
    this.chck_subtotal = 0
    for (var i = 0; i < this.items.length; i++) {
      this.chck_subtotal = this.chck_subtotal + (this.items[i].price) * this.items[i].cant
    }
    this.chck_cargos_web = this.chck_subtotal * 0.02
    this.chck_iva = (this.chck_cargos_web + this.chck_subtotal) * 0.12
    this.chck_total = this.chck_cargos_web + this.chck_subtotal + this.chck_iva;
    localStorage.setItem('chck_total', JSON.stringify(this.chck_total))


  }

}
