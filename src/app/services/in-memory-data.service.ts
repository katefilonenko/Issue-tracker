import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb() {
    const people = [
      {
        id: 1, 
        name: 'Ekaterina', 
        username:'Kate', 
        email:'e@e.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/28/2020',
        description: 'Major issue open', 
        severity: 'Major',
        status:'Not started',
        comment: 'Need to be finished fast' 
      },
      {
        id: 2, 
        name: 'Yuri', 
        username:'ObiWanKenobi',
        email:'y@y.com', 
        password: '1234567890',
        location:'Home', 
        hireDate: '12/01/2020',
        description: 'Major issue resolved', 
        severity: 'Major',
        status:'In progress',
        comment: ''  
      },
      {
        id: 3, 
        name: 'Anrew', 
        username:'Rikkert', 
        email:'a@a.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/20/2020', 
        description: 'Critical issue resolved', 
        severity: 'Critical',
        status:'Done',
        comment: ''        
      },
      {
        id: 4, 
        name: 'Evgeny', 
        username:'sdfdkbm', 
        email:'ev@e.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/28/2020',
        description: 'Major issue open', 
        severity: 'Major',
        status:'Not started',
        comment: 'Comment' 
      },
      {
        id: 5, 
        name: 'Yuri', 
        username:'arlkegj',
        email:'yr@y.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/17/2020',
        description: 'Trivial issue Done', 
        severity: 'Trivial',
        status:'Done',
        comment: ''  
      },
      {
        id: 6, 
        name: 'Pavel', 
        username:'sktfrjg', 
        email:'p@p.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/28/2020', 
        description: 'Critical issue resolved', 
        severity: 'Critical',
        status:'Done',
        comment: ''        
      },
      {
        id: 7, 
        name: 'Elena', 
        username:'Lenalena', 
        email:'l@lle.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/04/2020',
        description: 'Major issue open', 
        severity: 'Major',
        status:'Not started',
        comment: 'Comment' 
      },
      {
        id: 8, 
        name: 'Natalia', 
        username:'natauser',
        email:'n@n.com', 
        password: '1234567890',
        location:'Home', 
        hireDate: '11/23/2020',
        description: 'Major issue resolved', 
        severity: 'Major',
        status:'In progress',
        comment: ''  
      },
      {
        id: 9, 
        name: 'Nikita', 
        username:'nikita', 
        email:'n@n.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/21/2020', 
        description: 'Critical issue resolved', 
        severity: 'Critical',
        status:'Done',
        comment: 'strjiyehw4'        
      },
      {
        id: 10, 
        name: 'Viktoria', 
        username:'vivivivi', 
        email:'vvv@v.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/12/2020',
        description: 'Major issue open', 
        severity: 'Major',
        status:'Not started',
        comment: 'Need to be finished fast' 
      },
      {
        id: 11, 
        name: 'Alex', 
        username:'lexlex',
        email:'l@l.com', 
        password: '1234567890',
        location:'Home', 
        hireDate: '12/19/2020',
        description: 'Major issue resolved', 
        severity: 'Major',
        status:'In progress',
        comment: ''  
      },
      {
        id: 12, 
        name: 'Andrey', 
        username:'andandand', 
        email:'a@a.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '11/13/2020', 
        description: 'Critical issue resolved', 
        severity: 'Critical',
        status:'Done',
        comment: ''        
      } 
    ];

    const people2 = [
      {
        id: 1, 
        name: 'Ekaterina', 
        username:'Kate', 
        email:'e@e.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/28/2020',
        description: 'Major issue open', 
        severity: 'Major',
        status:'Not started',
        comment: 'Need to be finished fast' 
      },
      {
        id: 2, 
        name: 'Yuri', 
        username:'ObiWanKenobi',
        email:'y@y.com', 
        password: '1234567890',
        location:'Home', 
        hireDate: '12/01/2020',
        description: 'Major issue resolved', 
        severity: 'Major',
        status:'In progress',
        comment: ''  
      },
      {
        id: 3, 
        name: 'Anrew', 
        username:'Rikkert', 
        email:'a@a.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/20/2020', 
        description: 'Critical issue resolved', 
        severity: 'Critical',
        status:'Done',
        comment: ''        
      },
      {
        id: 4, 
        name: 'Evgeny', 
        username:'sdfdkbm', 
        email:'ev@e.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/28/2020',
        description: 'Major issue open', 
        severity: 'Major',
        status:'Not started',
        comment: 'Comment' 
      },
      {
        id: 5, 
        name: 'Yuri', 
        username:'arlkegj',
        email:'yr@y.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/17/2020',
        description: 'Trivial issue Done', 
        severity: 'Trivial',
        status:'Done',
        comment: ''  
      },
      {
        id: 6, 
        name: 'Pavel', 
        username:'sktfrjg', 
        email:'p@p.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/28/2020', 
        description: 'Critical issue resolved', 
        severity: 'Critical',
        status:'Done',
        comment: ''        
      },
      {
        id: 7, 
        name: 'Elena', 
        username:'Lenalena', 
        email:'l@lle.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/04/2020',
        description: 'Major issue open', 
        severity: 'Major',
        status:'Not started',
        comment: 'Comment' 
      },
      {
        id: 8, 
        name: 'Natalia', 
        username:'natauser',
        email:'n@n.com', 
        password: '1234567890',
        location:'Home', 
        hireDate: '11/23/2020',
        description: 'Major issue resolved', 
        severity: 'Major',
        status:'In progress',
        comment: ''  
      },
      {
        id: 9, 
        name: 'Nikita', 
        username:'nikita', 
        email:'n@n.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/21/2020', 
        description: 'Critical issue resolved', 
        severity: 'Critical',
        status:'Done',
        comment: 'strjiyehw4'        
      },
      {
        id: 10, 
        name: 'Viktoria', 
        username:'vivivivi', 
        email:'vvv@v.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '12/12/2020',
        description: 'Major issue open', 
        severity: 'Major',
        status:'Not started',
        comment: 'Need to be finished fast' 
      },
      {
        id: 11, 
        name: 'Alex', 
        username:'lexlex',
        email:'l@l.com', 
        password: '1234567890',
        location:'Home', 
        hireDate: '12/19/2020',
        description: 'Major issue resolved', 
        severity: 'Major',
        status:'In progress',
        comment: ''  
      },
      {
        id: 12, 
        name: 'Andrey', 
        username:'andandand', 
        email:'a@a.com', 
        password: '1234567890',
        location:'Office', 
        hireDate: '11/13/2020', 
        description: 'Critical issue resolved', 
        severity: 'Critical',
        status:'Done',
        comment: ''        
      }
    ];
    return {people, people2};
  }

  
}
