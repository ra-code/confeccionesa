import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Input,ViewChild} from'@angular/core'

@Component({
  selector: 'app-admin-index',
  templateUrl: './admin-index.component.html',
  styleUrls: ['./admin-index.component.css']
})
export class AdminIndexComponent implements OnInit {
  
  role: string;
  user: string;

  @ViewChild('drawer') public drawer;
  opened: string;
  mode: any;
  constructor(public router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('adminUserName');
    this.role = localStorage.getItem('adminUserRole');

    if (this.role == 'admin') {
      this.role = 'Administrador'
    }

    if (window.screen.width <= 680) {
      this.mode = 'over';
      this.opened = "false"
    } else {
      this.mode = 'side';
      this.opened = "true"
    }
  }
  logOut() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUserName');
    localStorage.removeItem('adminRole');
    this.router.navigate(['/admin/login'])
  }
  closeDrawer() {
    
    if (this.mode == 'over') {
      this.drawer.opened=false;
    }

  }

}
