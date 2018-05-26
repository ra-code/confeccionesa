import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar } from '@angular/material';
import {Router } from '@angular/router';
const URL = 'http://localhost:3000/admin/newitem/';



@Component({
  selector: 'app-admin-add-item',
  templateUrl: './admin-add-item.component.html',
  styleUrls: ['./admin-add-item.component.css']
})
export class AdminAddItemComponent implements OnInit {
  form: any;
  id_category: any;
  categories: any;
  public pageTitle: string = 'Artículos';
  public pageSubtitle: string = 'Añadir artículo';
  files1: any[];
  files2: any[];
  code: string;
  title: string;
  category: string;
  price: number;
  cant: number;
  description: number;
  image_1: any;
  image_2: any;
  id_item: number;
  res: any = '';
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'images' });
  public hasBaseDropZoneOver: boolean = false;
  public hasAnotherDropZoneOver: boolean = false;

  constructor(private itemService: ItemsService, public snackBar: MatSnackBar, private router: Router) {

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      
      form.append('id_item', this.id_item);
      form.append('title', this.title);
      form.append('price', this.price);
      form.append('cant', this.cant);
      form.append('code', this.code);
      form.append('description', this.description);
      form.append('id_category', this.id_category);
    };
    this.uploader.onSuccessItem = (item: any, response: any, status: number, headers: any): any => {
      if (response) {  
        if(response=='ok'){
           this.router.navigate(['/admin/showitems']);
        }  else{
           this.snackBar.open(response, 'X', {
            duration: 4000
          })
        }    
       
          
      }
    }
    this.id_item = Date.now();
  }
  //uploader functions
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  // end uploader functions
  fillCategorie(data){
    console.log(data)
    this.id_category=data
    
  }
  public options: Object = {
    placeholder: "Añade algo de contenido...",
    heightMin: 300
  }
  uploadAll(form){
    if(this.title.trim() == ''){
 
    }else{
      this.uploader.uploadAll()
    }
    
  }
  // send(addItem) {
  //   var data = {
  //     code: this.code,
  //     title: this.title,
  //     category: this.category,
  //     price: this.price,
  //     cant: this.cant,
  //     description: this.description,
  //     image_1: this.files1,
  //     image_2: this.files2,
  //   };

  //   this.itemService.newItem(data)
  //     .subscribe(data => {
  //       this.res = data,
  //         console.log(this.res)
  //       window.alert("Post subido con exito")

  //     })




  // }
  
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.itemService.showCategories()
    .subscribe(res=>{
      this.categories=res;
    })
  }


}