import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as _ from 'lodash';
import { People } from '../interfaces/people';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };  

  private usersUrl = 'api/people';

  private _registerUrl = 'http://localhost:8080/api/register';
  private _loginUrl = 'http://localhost:8080/api/login';
  private peopleUrl = 'http://localhost:8080/api';
  private commentUrl = 'http://localhost:8080/comment';

  signup(user) {
    // const url = `${this.usersUrl}/${id}`
    return this.http.post(this.usersUrl, user, this.httpOptions) 
  }


  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/home'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  getPeople(){
    return this.http.get(this.peopleUrl);
  }
  
  getPeople2(): Observable<People>{
    return this.http.get<People>(this.peopleUrl);
  }

  getPearson(id){
    const url = `${this.peopleUrl}/${id}`;
    return this.http.get(url);
  }

  addPearson(data) {
    return this.http.post(this.peopleUrl, data)
  }

  updatePearson(id, data: People) {
    const url = `${this.peopleUrl}/${id}`
    return this.http.put(url, data)
  }

  updateComment(id, data){
    const url = `${this.commentUrl}/${id}`
    return this.http.put(url, data)
  }

  deletePearson(id){        
    return this.http.delete(`${this.peopleUrl}/${id}`)
  }

  myForm: FormGroup = new FormGroup({
    // _id: new FormControl(null),
    // id: new FormControl(null),
    // __v: new FormControl(null),
    "name": new FormControl("", Validators.required),
    "username": new FormControl("", Validators.required),
    // "password": new FormControl(""),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "location": new FormControl("", Validators.required),
    // "hireDate": new FormControl("", Validators.required),
    "hireDate": new FormControl({value : new Date()}, Validators.required),
    "type": new FormControl("", Validators.required),
    "severity": new FormControl("", Validators.required),
    "status": new FormControl("", Validators.required),
    "description": new FormControl("", Validators.required),
    "comment": new FormControl(""),
  });

  populateForm(pearson){
    this.myForm.patchValue(pearson);
    // console.log(pearson)
  }
}
