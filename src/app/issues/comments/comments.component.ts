import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { People } from 'src/app/interfaces/people';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  // pearson = {
  //   id: '',
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

  constructor(
    public dialogRef: MatDialogRef<CommentsComponent>,
    public peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.getPearson();
  }

  onClose() {
    this.dialogRef.close();
  }

  @Input() pearson: People;

  getPearson(){
    const id = 1;
    this.peopleService.getPearson(id)
    .subscribe(pearson => {
      this.pearson = pearson;
      console.log(pearson)
    })
  }

  saveComment() {

  }

}
