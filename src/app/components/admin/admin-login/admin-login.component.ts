import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemsService } from '../../../services/items.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material'

const helper = new JwtHelperService();

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  error: any;
  tokenDecode: any;
  loginAdminForm: FormGroup;

  constructor(private fb: FormBuilder, public itemsService: ItemsService, public router: Router, public snack: MatSnackBar) {
    this.createForm()
  }

  ngOnInit() {
    if(helper.isTokenExpired(localStorage.getItem('adminToken'))){
      this.router.navigate(['/admin'])
    }
  }
  loginAdmin(formData) {
    this.itemsService.loginAdmin(formData)
      .subscribe((data) => {
        if (data['success'] == true) {
          console.log(data)
          this.tokenDecode = helper.decodeToken(data['token'])

          localStorage.setItem('adminToken', data['token'])
          localStorage.setItem('adminUserName', this.tokenDecode.payload.userName)
          localStorage.setItem('adminUserRole', this.tokenDecode.payload.role)
          this.router.navigate(['/admin/'])
        } else {
          this.error = data['message']
          this.snack.open(this.error, 'X', {
            duration: 4000
          })
        }


      },
      (error) => {
        console.log(error)
      })
  }
  createForm() {
    this.loginAdminForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
    })
  }

}
