import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { FileUploader } from 'ng2-file-upload';
const URL = 'http://localhost:3000/admin/newitem/';

@Component({
  selector: 'app-admin-edit-item',
  templateUrl: './admin-edit-item.component.html',
  styleUrls: ['./admin-edit-item.component.css']
})
export class AdminEditItemComponent implements OnInit {
  domain:any=this.itemsService.domain;
  images: any;
  description: any;
  cat: any;
  id_category: any;
  categories: any;
  cant: any;
  price: any;
  category: any;
  code: any;
  title: any;
  data: any;
  pageSubtitle = 'Editar artículo';
  pageTitle = 'Artículos'
  id: any;
  private sub: any
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'images' });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;
  constructor(private route: ActivatedRoute, private itemsService: ItemsService) { }

  fillCategorie(data) {

    this.id_category = data

  }
  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      
    });
    var data = {
      id: this.id
    }
    this.itemsService.showCategories()
      .subscribe(res => {
        this.categories = res;

        this.itemsService.findOneItem(data)
          .subscribe(data => {

            this.data = data
            this.category = this.data.id_category
            this.title = this.data.title
            this.code = this.data.code
            this.price = this.data.price
            this.cant = this.data.cant
            this.description = this.data.description
            this.images=this.data.images

            for (var i = 0; i < this.categories.length; i++) {
              if (this.categories[i]._id == this.category) {
                this.category = this.categories[i].name
              }
            }
            console.log(this.category)

          })
      })


    // console.log(this.categories)
    // const resultado = this.categories.find(this.categories.title == 'Bonito' );
    // console.log(resultado)

  }

}
