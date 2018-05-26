import { Component, OnInit } from '@angular/core';
import {ItemsService} from '../../../services/items.service' 

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  items: any;
  data: any;
  categories: any;

  constructor(private itemsService:ItemsService) { }

  ngOnInit() {
    this.itemsService.showCategories()
    .subscribe(data=>{
      this.data=data
      this.categories=this.data.length;
    })
    this.itemsService.showAll()
    .subscribe(data=>{
      this.data=data
      this.items=this.data.length;
    })
  }

}
