import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { People } from 'src/app/interfaces/people';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  people: People[];
  // @Input() pearson: People;
  @Inject(MAT_DIALOG_DATA)

  pearson = {
    id: 13,
    name: '',
    username: '',
    email: '',
    password: '',
    location: '',
    hireDate: '',
    severity: '',
    status: '', 
    description: '',
    comment:''
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
    
  ) { }
 
  ngOnInit(): void {
    this.getPearson(this.pearson);
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

  getAllInfo(){
    this.peopleService.getPeople()
    .subscribe(people => {
      this.people = people as People[];
      console.log(people);
    });
  }

  getPearson(pearson){
    this.peopleService.getPearson(pearson.id)
    .subscribe(pearson => {
      this.pearson = pearson;
      console.log(pearson)
    })
  }

  updatePearson(){
    // const id = +this.route.snapshot.paramMap.get('id');
    this.peopleService.updatePearson(this.pearson)
    .subscribe(pearson => {
      // this.pearson = pearson;
      // console.log(pearson);
      this.onClose();
      this.editSuccess();
    }, err => {
      this.editError();
    })
  }

}
