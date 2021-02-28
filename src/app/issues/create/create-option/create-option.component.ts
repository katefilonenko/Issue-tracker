import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LocationsService } from 'src/app/services/locations.service';
import { Location_ } from '../../../interfaces/location';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-option',
  templateUrl: './create-option.component.html',
  styleUrls: ['./create-option.component.css']
})
export class CreateOptionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateOptionComponent>,
    public locationsService: LocationsService,
    private toastr: ToastrService,
    private location: Location
    
  ) { }

  ngOnInit(): void {
  }

  myForm: FormGroup = new FormGroup({
    "locname": new FormControl("", Validators.required)
  });

  submit() {
    console.log(this.myForm);
  }

  onClose() {
    this.dialogRef.close();
  }

  locationSuccess() {
    this.toastr.success('Created', 'Success');
  }

  locationdError(){
    this.toastr.error('Name must be unique', 'Major Error');
  }

  locations:any
  getLocations(){
    this.locationsService.getLocations()
    .subscribe(locations => {
      this.locations = locations;
      // console.log(this.locations);
      // console.log('this.locations');
    })
  }

  addLocation(locname: string){
    this.locationsService.addLocation({locname} as Location_)
    .subscribe(t => {
      this.locationSuccess();
      this.getLocations();
      this.onClose();
    }, err => {
      this.locationdError();
    })
  }

}
