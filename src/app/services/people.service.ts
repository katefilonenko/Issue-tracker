import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { People } from '../interfaces/people';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private peopleUrl = 'api/people';

  getPeople(): Observable<People[]>{
    return this.http.get<People[]>(this.peopleUrl) 
  }

  getPearson(id): Observable<People> {
    const url = `${this.peopleUrl}/${id}`
    return this.http.get<People>(url)
  }

  deletePearson(pearson: People | number){
    const id = typeof pearson === 'number' ? pearson : pearson.id;
    const url = `${this.peopleUrl}/${id}`;
    return this.http.delete<People>(url, this.httpOptions)
  }

  createPearson(pearson: People): Observable<People>{
    return this.http.post<People>(this.peopleUrl, pearson, this.httpOptions)
  }

  updatePearson(pearson: People): Observable<any>{
    return this.http.put(this.peopleUrl, pearson, this.httpOptions)
  }

  // updatePearson(id): Observable<People>{
  //   const url = `${this.peopleUrl}/${id}`;
  //   return this.http.put<People>(url, this.httpOptions);
  // }

}
