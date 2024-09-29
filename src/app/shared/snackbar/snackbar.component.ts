import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  @Input() errorMsg: string = '';

  constructor(private snackbar: MatSnackBar) {}

  ngOnInit(): void {
    this.snackbar.open(this.errorMsg, '', { duration: 5000 });
  }
}
