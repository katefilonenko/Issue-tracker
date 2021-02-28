import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfDialogComponent } from '../mat-conf-dialog/mat-conf-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg) {
    return this.dialog.open(MatConfDialogComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data: {
        message: msg
      }
    });
  }

}
