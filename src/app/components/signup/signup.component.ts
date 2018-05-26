import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { MatSnackBar } from '@angular/material'
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  token_decoded: any;
  res: any;
  document: any;
  nation: any;
  documentType: any;
  signUpForm: FormGroup;
  helper = new JwtHelperService();

  constructor(private fb: FormBuilder, private clientsService: ClientsService, private snackBar: MatSnackBar, private router: Router) {
    this.createForm()
    

  }
  createForm() {
    this.signUpForm = this.fb.group({
      'name': ['', Validators.required],
      'lastName': ['', Validators.required],
      'docType': ['', Validators.required],
      'docNac': ['', Validators.required],
      'docNumber': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
    })
  }
  selectNac(type) {
    console.log(type)
    if (type == 'Pasaporte') {
      this.nation = [
        { id: '1', name: 'P' }
      ];
    } else if (type == 'Rif') {
      this.nation = [
        { id: '1', name: 'V' },
        { id: '2', name: 'J' },
        { id: '3', name: 'G' },
        { id: '4', name: 'E' },
        { id: '5', name: 'P' }
      ];
    } else if (type == 'CI') {
      this.nation = [
        { id: '1', name: 'V' },
        { id: '2', name: 'E' },
      ];
    }

  }
  ngOnInit() {
    console.log(localStorage.getItem('user_token'))
    
    console.log(localStorage.getItem('user_tokenDecoded'))

    this.documentType = [
      { id: '1', name: 'Pasaporte' },
      { id: '2', name: 'Rif' },
      { id: '3', name: 'CI' }
    ];

  }
  register(formData) {
    this.clientsService.registerUser(formData)
      .subscribe(data => {
        console.log(data)
        this.res = data
        if (this.res.err) {
          this.snackBar.open(this.res.err, 'X', {
            duration: 4000
          })
        } else {
          const decodedToken = this.helper.decodeToken(this.res.token);
       
          localStorage.setItem('user_token', JSON.stringify(this.res.token))
          localStorage.setItem('user_tokenDecoded', JSON.stringify(decodedToken))
          // localStorage.setItem('user_id', this.res.token)
          // localStorage.setItem('user_id', this.res.token.id)
          // localStorage.setItem('user_email', this.res.token.email)
           
          // console.log(localStorage.getItem('user_email'))
          this.router.navigate(['/'])
        }

      })
  }
}
