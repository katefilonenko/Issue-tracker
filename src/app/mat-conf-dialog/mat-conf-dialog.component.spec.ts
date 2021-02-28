import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfDialogComponent } from './mat-conf-dialog.component';

describe('MatConfDialogComponent', () => {
  let component: MatConfDialogComponent;
  let fixture: ComponentFixture<MatConfDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatConfDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
