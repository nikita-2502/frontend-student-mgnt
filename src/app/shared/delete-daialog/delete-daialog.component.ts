import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-daialog',
  templateUrl: './delete-daialog.component.html',
  styleUrls: ['./delete-daialog.component.scss']
})
export class DeleteDaialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDaialogComponent>) { }

  ngOnInit(): void {
  }

  closedDialog(val: boolean){
    this.dialogRef.close(val);
  }

}
