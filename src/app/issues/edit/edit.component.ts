import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { People } from 'src/app/interfaces/people';
import { PeopleService } from 'src/app/services/people.service';
import { LocationsService } from 'src/app/services/locations.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  people: any;
  // @Input() pearson: People;
  @Inject(MAT_DIALOG_DATA)

  // pearson = {
  //   id: 1,
  //   name: '',
  //   username: '',
  //   email: '',
  //   password: '',
  //   location: '',
  //   hireDate: '',
  //   severity: '',
  //   status: '', 
  //   description: '',
  //   comment:''
  // }
  pearson: any;

  myForm: FormGroup = new FormGroup({
    "name": new FormControl("", Validators.required),
    "username": new FormControl("", Validators.required),
    "email": new FormControl("", [Validators.required, Validators.email]),
    "location": new FormControl("", Validators.required),
    "hireDate": new FormControl("", Validators.required),
    "severity": new FormControl("", Validators.required),
    "status": new FormControl("", Validators.required),
    "description": new FormControl("", Validators.required),
    "comment": new FormControl(""),
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

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    private toastr: ToastrService,
    public peopleService: PeopleService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: People,
    public authService: AuthService,
    public locationsService: LocationsService
  ) { }

  ngOnInit(): void {
    this.pearson = this.data;
    this.getAllInfo();
    this.getLocations();
    this.getPearson(this.pearson);
    this.func();
  }

  minDate
  func() {
    const pearsonDate = this.pearson.hireDate;
    // console.log(pearsonDate)
    this.minDate = new Date(pearsonDate);
    // console.log(this.minDate)
  }

  onClose() {
    this.dialogRef.close();
  }

  editSuccess() {
    this.toastr.success('Edited', 'Success');
  }

  editError(){
    this.toastr.error('Not Edited', 'Major Error');
  }

  checkelements=[];
  allnames = [];
  allusernames = [];
  allemails = [];
  getAllInfo() {
    this.authService.getPeople()
      .subscribe(people => {
        this.people = people;
        this.people.forEach(element => {
          // console.log(element);
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


  getPearson(pearson){
    this.authService.getPearson(pearson._id)
    .subscribe(pearson => {
      this.pearson = pearson;
      // console.log(this.pearson)
    })
  }

  locations:any
  getLocations(){
    this.locationsService.getLocations()
    .subscribe(locations => {
      this.locations = locations;
    })
  }

  updatePearson(name,
    username,
    email,
    location,
    hireDate, 
    severity,
    status,
    description,
    comment){
    this.authService.updatePearson(this.pearson._id, {
      name,
      username,
      email,
      location,
      hireDate, 
      severity,
      status,
      description,
      comment } as People)
    .subscribe(pearson => {
      // this.pearson = pearson;
      this.onClose();
      this.editSuccess();
    }, err => {
      this.editError();
    })
  }

  // updatePearson(){
  //   this.authService.updatePearson2(this.authService.myForm.value);
  // }


}
