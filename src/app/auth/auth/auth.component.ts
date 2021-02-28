import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { PeopleService } from '../../services/people.service';
import { People } from '../../interfaces/people'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  pearson = {
    id:'',
    name:'', 
    username:'', 
    email:'',
    password: ''
  };

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private peopleService: PeopleService,
  ) { }

  ngOnInit(): void {
    this.getPe();
  }

  showSuccess() {
    this.toastr.success('Logged in! Welcome', 'Success')
  }

  showError(){
    this.toastr.error('Wrong Username or Password. Please check your input data.', 'Major Error');
    this.router.navigate(['/auth'])
  }

  num: any;
  people: People[];
  getPe(){
    this.peopleService.getPeople()
    .subscribe(people => {
      this.people = people;
      this.num = Math.max.apply(Math, this.people.map(function(o) {return o.id})) + 1;
      this.pearson.id = this.num;
      console.log(this.num);
      console.log(this.people);
    });
  }

  register(){
    this.authService.signup(this.pearson)
    .subscribe(res => {
      console.log(this.pearson);
      // localStorage.setItem('token', res.token)
      // this.router.navigate(['/issues'])
      this.getPe();
      this.showSuccess();
    }, error => this.showError()
    )
  }

  getAllInfo(){
    this.peopleService.getPeople()
    .subscribe(people => {
      this.people = people as People[];
      // this.people2 = people as People[];
      console.log(people);
    });
  }

  // register(
  //   name: string,
  //   username: string,
  //   email: string,
  //   password: string
  // ) {
  //   this.authService.signup({
  //     name,
  //     username,
  //     email,
  //     password
  //   } as People)
  //     .subscribe(pearson1 => {
  //       // console.log(this.pearson);
  //       this.people.push(pearson1);
  //       this.getPe();
  //       this.showSuccess();
  //     }, error => this.showError()
  //     )
  // }

  login(){
    this.authService.signup(this.pearson)
    .subscribe(res => {
      console.log(this.pearson);
      // localStorage.setItem('token', res.token)
      //   this.router.navigate(['/issues'])
      this.getPe();
      this.showSuccess();
    }, error => this.showError()
    )
  }

}
