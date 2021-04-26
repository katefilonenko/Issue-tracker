import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { People } from '../interfaces/people';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const dummyPeople: People[] = [
    {
      id: 1, name: "updatedName", username: 'string', email: 'string', password: 'string',
      location: 'string', hireDate: '2021-02-24', description: 'string', type: 'string',
      severity: 'string', status: 'string', comment: 'string'
    },
    {
      id: 2, name: "updatedName", username: 'string', email: 'string', password: 'string',
      location: 'string', hireDate: '2021-02-24', description: 'string', type: 'string',
      severity: 'string', status: 'string', comment: 'string'
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET HTTP request and return all data', () => {
    service.getPeople().subscribe(res => {
      expect(res).toEqual(dummyPeople);
    });
    const req = httpMock.expectOne('http://localhost:8080/api');
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(dummyPeople);
    httpMock.verify();
  });

  it('should make a DELETE HTTP request with id appended to end of url', () => {
    service.deletePearson(1).subscribe(res => {
      expect(res).toBe(1);
    });
    const req = httpMock.expectOne('http://localhost:8080/api/1', 'delete to api');
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(1);
    httpMock.verify();
  });

  it('should make a PUT HTTP request with id appended to end of url and resource as body', () => {
    const updateObj = {
      id: 1, name: "updatedName", username: 'string', email: 'string', password: 'string',
      location: 'string', hireDate: '2021-02-24', description: 'string', type: 'string',
      severity: 'string', status: 'string', comment: 'string'
    };
    service.updatePearson(1, updateObj).subscribe(res => {
      expect(updateObj.name).toBe('updatedName');
    });
    const req = httpMock.expectOne('http://localhost:8080/api/1', 'put to api');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updateObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(updateObj);
    httpMock.verify();
  });

  it('create should make a POST HTTP request with resource as body', () => {
    const createObj = {
      id: 3, name: "updatedName", username: 'string', email: 'string', password: 'string',
      location: 'string', hireDate: '2021-02-24', description: 'string', type: 'string',
      severity: 'string', status: 'string', comment: 'string'
    };
    service.addPearson(createObj).subscribe(res => {
      expect(createObj.id).toBe(3);
      expect(createObj.name).toBe("updatedName");
      expect(createObj.username).toBe("string");
      expect(createObj.email).toBe("string");
      expect(createObj.password).toBe("string");
      expect(createObj.location).toBe("string");
      expect(createObj.hireDate).toBe("2021-02-24");
      expect(createObj.description).toBe("string");
      expect(createObj.type).toBe("string");
      expect(createObj.severity).toBe("string");
      expect(createObj.status).toBe("string");
      expect(createObj.comment).toBe("string");
    });
    const req = httpMock.expectOne('http://localhost:8080/api', 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(createObj);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(createObj);
    httpMock.verify();
  });

});
