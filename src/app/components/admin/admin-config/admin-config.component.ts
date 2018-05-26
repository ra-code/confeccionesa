import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {ItemsService} from '../../../services/items.service'
import {MatSnackBar} from '@angular/material'
@Component({
  selector: 'app-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.css']
})
export class AdminConfigComponent implements OnInit {
  configs: Object=[];
  pageSubtitle = 'Configuraciones';
  pageTitle='Configuraciones generales';
  configForm: FormGroup;
  constructor(private fb:FormBuilder,private itemsService:ItemsService, private snackBar:MatSnackBar) {
    this.createForm();
   }

  ngOnInit() {
    this.itemsService.showConfig()
    .subscribe(data=>{
      
      this.configs=data[0]
      
      
    })
  }
  createForm() {
    
    this.configForm = this.fb.group({
      webCharges: '', // <--- the FormControl called "name"
    });
  }
  saveConfig(data){
    
    if(this.configs==data){
      console.log('no hay cambios')
      return
    }
    this.itemsService.saveConfig(data)
    .subscribe(data=>{
      if(data['status']=='ok'){
        this.snackBar.open('Se ha actualizado la configuración', 'X', {
            duration: 4000
          })
      }
    })
  }

}
