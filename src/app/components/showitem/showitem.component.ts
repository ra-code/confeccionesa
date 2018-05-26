import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { ActivatedRoute,Router } from '@angular/router';
import { AppGlobals } from '../../app.globals';


@Component({
  selector: 'app-showitem',
  templateUrl: './showitem.component.html',
  styleUrls: ['./showitem.component.css']
})
export class ShowitemComponent implements OnInit {
  data: any;
  // cart_cant = new Array();
  cart_item:any= new Array;


  // cart_item: any;


  imageSelected: any;
  cant: any;
  item: any;
  id: any;
  sub: any;

  constructor(private itemsService: ItemsService, private route: ActivatedRoute,private r:Router, private _global: AppGlobals) { }
  //Añadir articulo al carrito de compras
  addToCart(id) {
    this.cart_item=[]
    if (localStorage.getItem('cart_item')) {
      
      this.cart_item = JSON.parse(localStorage.getItem('cart_item'))
            this.data = {
        'title':this.item.title,
        'price':this.item.price,
        'images':this.item.images,
        'id': id,
        'cant': this.cant,
        'res_cant': this.item.cant
      }
      var cart_item:any= new Array;
            this.cart_item.push(this.data)
      localStorage.setItem('cart_item', JSON.stringify(this.cart_item))
      

    } else {
      
      this.data = {
        'title':this.item.title,
        'price':this.item.price,
        'images':this.item.images,
        'id': id,
        'cant': this.cant,
        'res_cant': this.item.cant
      }   
      this.cart_item.push(this.data)
      localStorage.setItem('cart_item', JSON.stringify(this.cart_item))
      
    }

  }
  ngOnInit() {

    this.cant = 0;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];


    });
    var dat = {
      id: this.id
    }
    this.itemsService.findOneItem(dat)
      .subscribe(data => {
        if(data['err']){
          this.r.navigate(['/'])
        }
        this.item = data;
        this.imageSelected = this._global.baseAPIUrl + 'uploads/' + this.item.images[0];

      })

  }
  sumaCant() {
    if (this.cant < this.item.cant) {
      this.cant = this.cant + 1;
    }

  }
  resCant() {
    if (this.cant < 0) { this.cant = 0 }
    if (this.cant > 0) {
      this.cant = this.cant - 1;
    }

  }
  selectImage(image) {
    this.imageSelected = this._global.baseAPIUrl + 'uploads/' + image;

  }


}
