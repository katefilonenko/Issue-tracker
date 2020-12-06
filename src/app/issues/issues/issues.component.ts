import { Component, Input, OnInit,  ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { People } from '../../interfaces/people';
import { PeopleService} from '../../services/people.service';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { FormGroup, FormControl } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CreateComponent } from '../create/create/create.component';
// import { CommentsComponent } from '../comments/comments.component';
import { Chart } from 'angular-highcharts';
import { EditComponent } from '../edit/edit.component';



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
  people: People[];
  people2: People[];
  displayedColumns: string[] = [
    'name', 
    'username', 
    'email', 
    'location', 
    'hireDate', 
    'severity', 
    'status', 
    'description', 
    'comments', 
    'actions'
  ];
  dataSource = new MatTableDataSource<People> (this.people);

  constructor(
    private peopleService: PeopleService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllInfo();
    this.getInfoForSecondArr();
  }

  deleteSuccess() {
    this.toastr.success('Deleted', 'Success');
  }

  deleteError(){
    this.toastr.error('Not deleted', 'Major Error');
  }

  form:FormGroup = new FormGroup({
    name: new FormControl(false),
    username: new FormControl(false),
    email: new FormControl(false),
    location: new FormControl(false),
    hireDate: new FormControl(false),
    severity: new FormControl(false),
    status: new FormControl(false),
    description: new FormControl(false),
    comment: new FormControl(false),
    actions: new FormControl(false),
  });

  name = this.form.get('name');
  username = this.form.get('username');
  email = this.form.get('email');
  location = this.form.get('location');
  hireDate = this.form.get('hireDate');
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
    { def: 'severity', label: 'Severity', hide: this.severity.value},
    { def: 'status', label: 'Status', hide: this.status.value},
    { def: 'description', label: 'Description', hide: this.description.value},
    { def: 'comment', label: 'Comments', hide: this.comment.value},
    { def: 'actions', label: 'Actions', hide: this.actions.value}
  ]

  getDisplayedColumns():string[] {
    return this.columnDefinitions.filter(cd=>!cd.hide).map(cd=>cd.def);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    let o1:Observable<boolean> = this.name.valueChanges;
    let o2:Observable<boolean> = this.username.valueChanges;
    let o3:Observable<boolean> = this.email.valueChanges;
    let o4:Observable<boolean> = this.location.valueChanges;
    let o5:Observable<boolean> = this.hireDate.valueChanges;
    let o6:Observable<boolean> = this.severity.valueChanges;
    let o7:Observable<boolean> = this.status.valueChanges;
    let o8:Observable<boolean> = this.description.valueChanges;
    let o9:Observable<boolean> = this.comment.valueChanges;
    let o10:Observable<boolean> = this.actions.valueChanges;
 
    merge(o1, o2, o3, o4, o5, o6, o7, o8, o9, o10).subscribe(v => {
      this.columnDefinitions[0].hide = this.name.value;
      this.columnDefinitions[1].hide = this.username.value;  
      this.columnDefinitions[2].hide = this.email.value;
      this.columnDefinitions[3].hide = this.location.value;  
      this.columnDefinitions[4].hide = this.hireDate.value;
      this.columnDefinitions[5].hide = this.severity.value;  
      this.columnDefinitions[6].hide = this.status.value;
      this.columnDefinitions[7].hide = this.description.value;  
      this.columnDefinitions[8].hide = this.comment.value;  
      this.columnDefinitions[9].hide = this.actions.value;  
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

  statisticstoggle(){
    this.statisticsClicked = !this.statisticsClicked;
    if(this.statisticsClicked){
      this.statistics();
    }
    // if(!this.statisticsClicked){
    //   this.result1 = 0;
    //   this.result2 = 0;
    //   this.result3 = 0;
    // }
  }

  color:any
  getAllInfo(){
    this.peopleService.getPeople()
    .subscribe(people => {
      this.people = people;
      this.dataSource.data = people as People[];
      // console.log(this.people);
    });
  }

  lengthOfSecondArr: number = 0;
  getInfoForSecondArr(){
    this.peopleService.getPeople()
    .subscribe(people => {
      this.people2 = people;
      // console.log(this.people2);
      this.lengthOfSecondArr = this.people2.length;
      console.log(this.lengthOfSecondArr);
      // this.newArrForStat();
      this.statistics();
      this.usersLastMonth();
      // this.chartFunk();
      // this.chart1Funk();
    });
  }

  // anotherPeopleArray: Array<any> = [];
  // newArrForStat(){
  //   this.anotherPeopleArray = [];
  //   Array.prototype.push.apply(this.anotherPeopleArray, this.people);
  //   console.log(this.anotherPeopleArray)
  // }

  arrnotstarted: Array<any> = [];
  arrinprogress: Array<any> = [];
  arrdone: Array<any> = [];
  notstarted: number;
  inprogress: number;
  done: number;
  nots: any;
  inp: any;
  don: any;
  result1: number = 0;
  result2: number = 0;
  result3: number = 0;
  statistics(){
    this.people2.forEach(element => {
      this.notstarted = 0;
      this.inprogress = 0;
      this.done = 0;
      // console.log(element.status)
      var choice = element.status;
      if (choice == 'Not started') {
        this.notstarted++;
        this.nots = this.notstarted++;
        // console.log(this.nots)
        const a = this.arrnotstarted.push(this.nots)
        this.result1 = this.arrnotstarted.reduce((sum, current) => {
          return sum + current;
        }, 0);
        // console.log(result1);
      }
      if (choice == 'In progress') {
        this.inprogress++;
        this.inp = this.inprogress++;
        // console.log(this.inp);
        const b = this.arrinprogress.push(this.inp)
        this.result2 = this.arrinprogress.reduce((sum, current) => {
          return sum + current;
        }, 0);
        // console.log(result2);
      }
      if (choice == 'Done') {
        this.done++;
        this.don = this.done++;
        // console.log(this.don);
        const c = this.arrdone.push(this.don)
        this.result3 = this.arrdone.reduce((sum, current) => {
          return sum + current;
        }, 0);
        // console.log(result3);
      }
    });
    console.log(this.result1);
    console.log(this.result2);
    console.log(this.result3);
    this.chartFunk();
    // this.chart1Funk();
  }

  // ConvertStringToNumber(input: string) {
  //   var numeric = Number(input);
  //   return numeric;
  // }
  // count: number = 0;
  // countUsers: number = 0;
  // arrOfNum: Array<number> = [];
  // arrToFindQuantity: Array<number> = [];
  // quantity: number = 0;
  // countOfUsers(){
  //   const today = new Date();
  //   const month = today.getMonth() + 1;
  //   const lastMonth = month - 1;
  //   this.people2.forEach(element => {
  //     const choice = element.hireDate;
  //     const a = choice.substr(0, 2);
  //     var b = this.ConvertStringToNumber(a);
  //     var total = this.arrOfNum.push(b);
  //   })
  //   this.arrOfNum.forEach((element, index) => {
  //     this.count = 0;
  //     if (element == lastMonth)
  //     {
  //       this.count++;
  //       const c  = this.count++;
  //       var total = this.arrToFindQuantity.push(c);
  //     }
  //   })
  //   this.quantity = this.arrToFindQuantity.length;
  // }

  u1:any=0;u2:any=0;u3:any=0;u4:any=0;u5:any=0;u6:any=0;u7:any=0;u8:any=0;u9:any=0;u10:any=0;u11:any=0;u12:any=0;u13:any=0;u14:any=0;u15:any=0;
  u16:any=0;u17:any=0;u18:any=0;u19:any=0;u20:any=0;u21:any=0;u22:any=0;u23:any=0;u24:any=0;u25:any=0;u26:any=0;u27:any=0;u28:any=0;u29:any=0;u30:any=0;u31:any=0;
  a1:any=0;a2:any=0;a3:any=0;a4:any=0;a5:any=0;a6:any=0;a7:any=0;a8:any=0;a9:any=0;a10:any=0;a11:any=0;a12:any=0;a13:any=0;a14:any=0;a15:any=0;
  a16:any=0;a17:any=0;a18:any=0;a19:any=0;a20:any=0;a21:any=0;a22:any=0;a23:any=0;a24:any=0;a25:any=0;a26:any=0;a27:any=0;a28:any=0;a29:any=0;a30:any=0;a31:any=0;

  usersLastMonth(){
    const today = new Date();
    const month = today.getMonth() + 1;
    const lastMonth = month - 1;//число 11
    this.people2.forEach(element => {
      const choice = element.hireDate;
      var b = new Date(choice);
      var month = b.getMonth()+1;
      var day = b.getDate();
      if (day == 1 && month == lastMonth) { this.a1++; this.u1 = this.a1; }
      if (day == 2 && month == lastMonth) { this.a2++; this.u2 = this.a2; }
      if (day == 3 && month == lastMonth) { this.a3++; this.u3 = this.a3; }
      if (day == 4 && month == lastMonth) { this.a4++; this.u4 = this.a4; }
      if (day == 5 && month == lastMonth) { this.a5++; this.u5 = this.a5; }
      if (day == 6 && month == lastMonth) { this.a6++; this.u1 = this.a6; }
      if (day == 7 && month == lastMonth) { this.a7++; this.u7 = this.a7; }
      if (day == 8 && month == lastMonth) { this.a8++; this.u8 = this.a8; }
      if (day == 9 && month == lastMonth) { this.a9++; this.u9 = this.a9; }
      if (day == 10 && month == lastMonth) { this.a10++; this.u10 = this.a10; }
      if (day == 11 && month == lastMonth) { this.a11++; this.u11 = this.a11; }
      if (day == 12 && month == lastMonth) { this.a12++; this.u12 = this.a12; }
      if (day == 13 && month == lastMonth) { this.a13++; this.u13 = this.a13; }
      if (day == 14 && month == lastMonth) { this.a14++; this.u14 = this.a14; }
      if (day == 15 && month == lastMonth) { this.a15++; this.u15 = this.a15; }
      if (day == 16 && month == lastMonth) { this.a16++; this.u16 = this.a16; }
      if (day == 17 && month == lastMonth) { this.a17++; this.u17 = this.a17; }
      if (day == 18 && month == lastMonth) { this.a18++; this.u18 = this.a18; }
      if (day == 19 && month == lastMonth) { this.a19++; this.u19 = this.a19; }
      if (day == 20 && month == lastMonth) { this.a20++; this.u20 = this.a20; }
      if (day == 21 && month == lastMonth) { this.a21++; this.u21 = this.a21; }
      if (day == 22 && month == lastMonth) { this.a22++; this.u22 = this.a22; }
      if (day == 23 && month == lastMonth) { this.a23++; this.u23 = this.a23; }
      if (day == 24 && month == lastMonth) { this.a24++; this.u24 = this.a24; }
      if (day == 25 && month == lastMonth) { this.a25++; this.u25 = this.a25; }
      if (day == 26 && month == lastMonth) { this.a26++; this.u26 = this.a26; }
      if (day == 27 && month == lastMonth) { this.a27++; this.u27 = this.a27; }
      if (day == 28 && month == lastMonth) { this.a28++; this.u28 = this.a28; }
      if (day == 29 && month == lastMonth) { this.a29++; this.u29 = this.a29; }
      if (day == 30 && month == lastMonth) { this.a30++; this.u30 = this.a30; }
      if (day == 31 && month == lastMonth) { this.a31++; this.u31 = this.a31; }
      this.chart1Funk();
    })
  }

  // days: Array<number> = []; 
  // neww:any;
  // month:any;
  // year:any;
  // daysInMonth (month, year) {
  //   this.days.length = 0;
  //   var today = new Date();
  //   month = today.getMonth();
  //   year = today.getFullYear();
  //   const now1 = new Date(year, month, 0).getDate();
  //   for (let i = 1; i <= now1; i++) {
  //     this.days.push(i);
  //   }
  //   console.log(this.days)
  // }

  @Input() pearson: People;

  // commentFunk(pearson){
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = "30%";
  //   dialogConfig.height = "40%";
  //   this.peopleService.getPearson(pearson.id)
  //   .subscribe(pearson => {
  //     this.pearson = pearson;
  //     this.dialog.open(CommentsComponent, dialogConfig);
  //     dialogConfig.data = pearson;
  //     console.log(dialogConfig.data);
  //     this.dialog.afterAllClosed.subscribe( res => {
  //       console.log('The dialog was closed');
  //       this.getAllInfo();
  //     })
  //   })
  // }

  onFocusOutEvent(event: any){
    console.log(event.target.value);
    this.peopleService.updatePearson(this.pearson)
    .subscribe(()=>this.getAllInfo())
  }

  delete(pearson){
    this.peopleService.deletePearson(pearson.id)
    .subscribe(t => {
      this.getAllInfo();
      // this.newArrForStat();
      this.deleteSuccess();
    },err =>{
      this.deleteError();
    })
  }

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.height = "60%";
    this.dialog.open(CreateComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(res => {
      this.getAllInfo();
      console.log(this.people2.length);
      if(this.people2.length > this.lengthOfSecondArr){
        console.log('erjb')
        this.statistics();
        this.usersLastMonth();
      }
      this.getInfoForSecondArr();
    })
  }
  
  onEdit(pearson){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "60%";
    this.peopleService.getPearson(pearson.id)
    .subscribe(pearson => {
      this.pearson = pearson;
      this.dialog.open(EditComponent, dialogConfig);
      dialogConfig.data = pearson;
      // console.log(dialogConfig.data);
      this.dialog.afterAllClosed.subscribe( res => {
        console.log(pearson);
        console.log('The dialog was closed');
        this.getAllInfo();
      })
    })
  }

  chart;
  chartFunk(){
    this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Quantity of requests'
      },
      xAxis: {
        categories: ['Issues'],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Quantity'
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          type: 'column',
          name: 'Not started',
          data: [{
            y: this.result1,
          }],
          color: '#C782A3'
        }, {
          type: 'column',
          name: 'In progress',
          data: [{
            y: this.result2,
          }],
          color:'#73A5DC'
        }, {
          type: 'column',
          name: 'Done',
          data: [{
            y: this.result3,
          }],
          color: '#82C7A1'
        }
      ]
  
    });
    // this.result1 = 0;
    // this.result2 = 0;
    // this.result3 = 0;
  }
  
  chart1;
  chart1Funk(){
    this.chart1 = new Chart({
      chart: {
        type: 'area'
      },
      title: {
        text: 'Quantity of users in the last month'
      },
      xAxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
        '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
        tickmarkPlacement: 'on',
        // title: {
        //     enabled: false
        // }
      },
      yAxis: {
        title: {
          text: 'Quantity'
        },
        // labels: {
        //     formatter: function () {
        //         return this.value / 1000;
        //     }
        // }
      },
      tooltip: {
        split: true,
        // valueSuffix: ' millions'
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: [{
        type: 'area',
        name: 'Users',
        data: [this.u1, this.u2, this.u3, this.u4, this.u5, this.u6, this.u7, this.u8, this.u9, this.u10, this.u11, this.u12,this.u13, this.u14, this.u15, this.u16,
        this.u17, this.u18, this.u19, this.u20, this.u21, this.u22, this.u23, this.u24, this.u25, this.u26, this.u27, this.u28, this.u29, this.u30, this.u31],
        color: '#EDDBE6'
      }]
    })
  }

  // add point to chart serie
  // add() {
  //   this.chart.addPoint(Math.floor(Math.random() * 10));
  // }

}
