import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { PeopleService } from '../../../services/people.service';
import { People } from '../../../interfaces/people';
import { Location_ } from '../../../interfaces/location';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'angular-highcharts';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LocationsService } from 'src/app/services/locations.service';
import { CreateOptionComponent } from '../create-option/create-option.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  people: any;

  pearson2={
    name:'',
    username:'',
    email:'',
    location:'',
    hireDate:'',
    severity:'',
    status:'',
    description:''
  };

 

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required),
    "username": new FormControl("", Validators.required),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "location": new FormControl("", Validators.required),
    // "locname": new FormControl("", Validators.required),
    "hireDate": new FormControl("", Validators.required),
    "severity": new FormControl("", Validators.required),
    "status": new FormControl("", Validators.required),
    "description": new FormControl("", Validators.required),
    "comment": new FormControl(""),
  });

  myForm1: FormGroup = new FormGroup({
    "locname": new FormControl("", Validators.required)
  });

  submit() {
    console.log(this.myForm);
  }

  status1 = [
    {id: 1, value: 'Not started'},
    {id: 2, value: 'In progress'},
    {id: 3, value: 'Done'}
  ]

  severity1 = [
    {id: 1, value: 'Trivial'},
    {id: 2, value: 'Minor'},
    {id: 3, value: 'Major'},
    {id: 4, value: 'Critical'}
  ]

  minDate = new Date();

  constructor(
    public peopleService: PeopleService,
    public dialogRef: MatDialogRef<CreateComponent>,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public authService: AuthService,
    public locationsService: LocationsService
  ) { }

  ngOnInit(): void {
    this.getAllInfo();
    this.getLocations();
  }

  createSuccess() {
    this.toastr.success('Created', 'Success');
  }

  createError(){
    this.toastr.error('Not Created', 'Major Error');
  }

  locationSuccess() {
    this.toastr.success('Created', 'Success');
  }

  locationdError(){
    this.toastr.error('Not Created', 'Major Error');
  }

  onClose() {
    this.dialogRef.close();
  }

  checkelements=[];
  allnames = [];
  allusernames = [];
  allemails = [];
  pearson:any;
  getAllInfo() {
    this.authService.getPeople()
      .subscribe(people => {
        this.people = people;
        this.people.forEach(element => {
          // console.log(element);
          this.pearson = element;
          this.allnames.push(element.name);
          this.allusernames.push(element.username);
          this.allemails.push(element.email);
        });
        this.findUniqueNames(this.allnames);
        this.findUniqueUsernames(this.allusernames);
        this.findUniqueEmails(this.allemails);
      });
      
  }

  names=[];
  usernames=[];
  emails=[];
  findUniqueNames(arr) {
    for (let str of arr) {
      if(!this.names.includes(str)){
        this.names.push(str);
      }
    }
    // console.log(this.names);
  }
  findUniqueUsernames(arr) {
    for (let str of arr) {
      if(!this.usernames.includes(str)){
        this.usernames.push(str);
      }
    }
    // console.log(this.usernames);
  }
  findUniqueEmails(arr) {
    for (let str of arr) {
      if(!this.emails.includes(str)){
        this.emails.push(str);
      }
    }
    // console.log(this.emails);
  }

  searchName: string;
  searchUsername: string;
  searchEmail: string;
  searchLocation: string;
  searchHireDate: string;
  searchSeverity: string;
  searchSatus: string;
  searchDescription: string;
  
  names_from_array=[];
  index_of_selected_name:any;
  username1:any;
  email1:any;
  first = false;
  onChangeName(name) {
    this.first = !this.first;
    if(!this.first){
      this.second = false;
      this.third = false;
    }
    this.searchName = name;
    this.people.forEach(element => {
      this.names_from_array.push(element.name);
    });
    this.index_of_selected_name = this.names_from_array.indexOf(name);
    this.username1 = this.people[this.index_of_selected_name].username;
    this.email1 = this.people[this.index_of_selected_name].email;
  }

  usernames_from_array=[];
  index_of_selected_username:any;
  name1:any;
  second = false;
  onChangeUsername(username) {
    this.second = !this.second;
    if(!this.second){
      this.first = false;
      this.third = false;
    }
    this.searchUsername = username;
    this.people.forEach(element => {
      this.usernames_from_array.push(element.username);
    });
    this.index_of_selected_username = this.usernames_from_array.indexOf(username);
    this.name1 = this.people[this.index_of_selected_username].name;
    this.email1 = this.people[this.index_of_selected_username].email;
  }

  emails_from_array=[];
  index_of_selected_email:any;
  third = false;
  onChangeEmail(email) {
    this.third = !this.third;
    if(!this.third){
      this.first = false;
      this.second = false;
    }
    this.searchEmail = email;
    this.people.forEach(element => {
      this.emails_from_array.push(element.email);
    });
    this.index_of_selected_email = this.emails_from_array.indexOf(email);
    this.name1 = this.people[this.index_of_selected_email].name;
    this.username1 = this.people[this.index_of_selected_email].username;
  }

  locations:any
  getLocations(){
    this.locationsService.getLocations()
    .subscribe(locations => {
      this.locations = locations;
    })
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "300px";
    dialogConfig.height = "250px";
    this.dialog.open(CreateOptionComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.getLocations();
      this.onClose();
    })
  }

  addLocation(locname: string){
    this.locationsService.addLocation({locname} as Location_)
    .subscribe(t => {
      this.locationSuccess();
    }, err => {
      this.locationdError();
    })
  }

  addPearson(name: string, username: string, email: string, location: string,
    hireDate: Date, severity: string, status: string, description: string, comment: string){
    this.authService.addPearson({name, username, email, location,
    hireDate, severity, status,description, comment} as People)
    .subscribe(pearson => {
      this.onClose();
      this.createSuccess();
    }, err => {
      this.createError();
    });
  }

  addPearsonBig(name: string, username: string, email: string, location: string,
    hireDate: Date, severity: string, status: string, description: string, comment: string, locname:string) {

    this.locationsService.addLocation({ locname } as Location_)
      .subscribe(t => {
        this.locationSuccess();
      }, err => {
        this.locationdError();
      });

    this.authService.addPearson({
      name, username, email, location,
      hireDate, severity, status, description, comment
    } as People)
      .subscribe(pearson => {
        this.onClose();
        this.createSuccess();
      }, err => {
        this.createError();
      });
  }


}
