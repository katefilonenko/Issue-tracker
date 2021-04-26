import { Component, Input, OnInit,  ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { People } from '../../interfaces/people';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CreateComponent } from '../create/create/create.component';
import { EditComponent } from '../edit/edit.component';
import { DialogService } from '../../services/dialog.service';
import { LoaderService } from '../../loader/loader.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {

  customClicked = false;
  filterClicked = false;
  statisticsClicked = false;

  default: boolean;

  isCD = true;
  isDes = true;
  isSeverity = true;
  isStatus = true;
  isRD = true;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('group') toggle: MatButtonToggle;
  people: any;
  people2: People[];
  displayedColumns: string[] = [
    'name', 
    'username', 
    'email', 
    'location', 
    'hireDate', 
    'type',
    'severity', 
    'status', 
    'description', 
    'comments', 
    'actions'
  ];
  dataSource = new MatTableDataSource<People> (this.people);

  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    public loaderService: LoaderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllInfo();
  }

  refreshPage() {
    window.location.reload();
   }

  deleteSuccess() {
    this.toastr.success('Deleted', 'Success');
  }

  deleteError(){
    this.toastr.error('Not deleted', 'Major Error');
  }

  form:FormGroup = new FormGroup({
    name: new FormControl(true),
    username: new FormControl(true),
    email: new FormControl(true),
    location: new FormControl(true),
    hireDate: new FormControl(true),
    type: new FormControl(true), 
    severity: new FormControl(true),
    status: new FormControl(true),
    description: new FormControl(true),
    comment: new FormControl(true),
    actions: new FormControl(true),
  });

  name = this.form.get('name');
  username = this.form.get('username');
  email = this.form.get('email');
  location = this.form.get('location');
  hireDate = this.form.get('hireDate');
  type = this.form.get('type');
  severity = this.form.get('severity');
  status = this.form.get('status');
  description = this.form.get('description');
  comment = this.form.get('comment');
  actions = this.form.get('actions');

  cbValues;

  columnDefinitions = [
    { def: 'name', label: 'Name', hide: this.name.value},
    { def: 'username', label: 'Username', hide: this.username.value},
    { def: 'email', label: 'Email', hide: this.email.value},
    { def: 'location', label: 'Location', hide: this.location.value},
    { def: 'hireDate', label: 'Created Date', hide: this.hireDate.value},
    { def: 'type', label: 'Type', hide: this.type.value},
    { def: 'severity', label: 'Severity', hide: this.severity.value},
    { def: 'status', label: 'Status', hide: this.status.value},
    { def: 'description', label: 'Description', hide: this.description.value},
    { def: 'comment', label: 'Comments', hide: this.comment.value},
    { def: 'actions', label: 'Actions', hide: this.actions.value}
  ]
  

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>cd.hide).map(cd=>cd.def);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    let o1:Observable<boolean> = this.name.valueChanges;
    let o2:Observable<boolean> = this.username.valueChanges;
    let o3:Observable<boolean> = this.email.valueChanges;
    let o4:Observable<boolean> = this.location.valueChanges;
    let o5:Observable<boolean> = this.hireDate.valueChanges;
    let o6:Observable<boolean> = this.type.valueChanges;
    let o7:Observable<boolean> = this.severity.valueChanges;
    let o8:Observable<boolean> = this.status.valueChanges;
    let o9:Observable<boolean> = this.description.valueChanges;
    let o10:Observable<boolean> = this.comment.valueChanges;
    // let o10:Observable<boolean> = this.actions.valueChanges;
 
    merge(o1, o2, o3, o4, o5, o6, o7, o8, o9, o10).subscribe(v => {
      this.columnDefinitions[0].hide = this.name.value;
      this.columnDefinitions[1].hide = this.username.value;  
      this.columnDefinitions[2].hide = this.email.value;
      this.columnDefinitions[3].hide = this.location.value;  
      this.columnDefinitions[4].hide = this.hireDate.value;
      this.columnDefinitions[5].hide = this.type.value;
      this.columnDefinitions[6].hide = this.severity.value;  
      this.columnDefinitions[7].hide = this.status.value;
      this.columnDefinitions[8].hide = this.description.value;  
      this.columnDefinitions[9].hide = this.comment.value;  
      // this.columnDefinitions[9].hide = this.actions.value;  
      // console.log(this.columnDefinitions);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  customtoggle() {
    this.customClicked = !this.customClicked;
  }

  filtertoggle() {
    this.filterClicked = !this.filterClicked;
  }

  color:any
  getAllInfo(){
    this.authService.getPeople()
    .subscribe(people => {
      this.people = people;
      this.dataSource.data = people as People[];
      // console.log(this.people);
    });
  }

  users;
  testFunc(){
    this.authService.getPeople2()
    .subscribe(users => this.users = users);
  }

  editSuccess() {
    this.toastr.success('Edited', 'Success');
  }

  editError(){
    this.toastr.error('Not Edited', 'Major Error');
  }

  // myFormComment: FormGroup = new FormGroup({
  //   "comment": new FormControl("")
  // });

  // populateForm(comment){
  //   this.myFormComment.patchValue(comment);
  //   console.log(comment)
  // }

  newComment:any;
  pearson:any;
  onFocusOutEvent(event: any, pearson, comment){
    // this.populateForm(comment);
    console.log(event.target.value);
    console.log(pearson);
    this.authService.updateComment(pearson._id, comment)
    .subscribe( pearson => {
        // console.log(comment)
        // this.editSuccess();
        // this.getAllInfo();
      }, err => {
        this.editError();
      }
    )
  }

  delete(pearson){
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
    .afterClosed().subscribe(res=>{
      if(res){
        this.authService.deletePearson(pearson._id)
          .subscribe(t => {
            this.getAllInfo();
            this.deleteSuccess();
          }, err => {
            this.deleteError();
          })
      }
    })
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.height = "530px";
    this.dialog.open(CreateComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.getAllInfo();
    })
  }

  title: string = "Pastebin Application";

  onEdit(pearson){
    this.authService.populateForm(pearson);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";
    dialogConfig.height = "530px";
    this.authService.getPearson(pearson._id)
    .subscribe(pearson => {
      this.pearson = pearson;
      dialogConfig.data = pearson;
      // console.log(pearson);
      if(this.pearson.status == 'Done'){
        console.log('cant open')
      } else {
        this.dialog.open(EditComponent, dialogConfig);
        this.dialog.afterAllClosed.subscribe(res => {
          this.getAllInfo();
        })
      }
    })
  }

}
