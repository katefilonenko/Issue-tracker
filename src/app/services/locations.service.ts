import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }

  private locationsUrl = 'http://localhost:8080/location';

  myForm: FormGroup = new FormGroup({
    "locname": new FormControl("", Validators.required)
  });

  getLocations(){
    return this.http.get(this.locationsUrl);
  }

  addLocation(data) {
    return this.http.post(this.locationsUrl, data)
  }

}
