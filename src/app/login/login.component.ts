import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email: '',
    password: ''
  }

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  showSuccess() {
    this.toastr.success('Logged in! Welcome', 'Success')
  }

  showError(){
    this.toastr.error('Wrong Username or Password. Please check your input data.', 'Major Error');
    this.router.navigate(['/login'])
  }

  loginUser () {
    this.authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        // console.log(res)
        this.showSuccess();
        localStorage.setItem('token', res.token)
        this.router.navigate(['/issues'])
      },
      err => {
        this.showError();
        console.log(err)
      }
    ) 
  }
}
