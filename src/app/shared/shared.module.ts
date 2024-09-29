import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteDaialogComponent } from './delete-daialog/delete-daialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const material = [
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSortModule,
  MatSnackBarModule,
  MatDialogModule,
];

@NgModule({
  declarations: [DeleteDaialogComponent, AddDialogComponent, SnackbarComponent],
  imports: [CommonModule, ReactiveFormsModule, material],
})
export class SharedModule {}
