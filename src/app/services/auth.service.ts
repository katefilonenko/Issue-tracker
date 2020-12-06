import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  signup(user) {
    // const url = `${this.usersUrl}/${id}`
    return this.http.post(this.usersUrl, user, this.httpOptions) 
  }

}
