import { Component, OnInit } from '@angular/core';
import { People } from '../interfaces/people';
import { PeopleService } from '../services/people.service';
import { Chart } from 'angular-highcharts';
import { LoaderService } from '../loader/loader.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {

  people2: any;

  constructor(
    private peopleService: PeopleService,
    public loaderService: LoaderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getInfoForSecondArr();
  }

  lengthOfSecondArr: number = 0;
  getInfoForSecondArr(){
    this.authService.getPeople()
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

  u1:any=0;u2:any=0;u3:any=0;u4:any=0;u5:any=0;u6:any=0;u7:any=0;u8:any=0;u9:any=0;u10:any=0;u11:any=0;u12:any=0;u13:any=0;u14:any=0;u15:any=0;
  u16:any=0;u17:any=0;u18:any=0;u19:any=0;u20:any=0;u21:any=0;u22:any=0;u23:any=0;u24:any=0;u25:any=0;u26:any=0;u27:any=0;u28:any=0;u29:any=0;u30:any=0;u31:any=0;
  a1:any=0;a2:any=0;a3:any=0;a4:any=0;a5:any=0;a6:any=0;a7:any=0;a8:any=0;a9:any=0;a10:any=0;a11:any=0;a12:any=0;a13:any=0;a14:any=0;a15:any=0;
  a16:any=0;a17:any=0;a18:any=0;a19:any=0;a20:any=0;a21:any=0;a22:any=0;a23:any=0;a24:any=0;a25:any=0;a26:any=0;a27:any=0;a28:any=0;a29:any=0;a30:any=0;a31:any=0;

  usersLastMonth(){
    const today = new Date();
    const month = today.getMonth() + 1;
    let lastMonth = 0;
    if (month == 1){
      lastMonth = 12;
    }else lastMonth = month - 1;
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


}
