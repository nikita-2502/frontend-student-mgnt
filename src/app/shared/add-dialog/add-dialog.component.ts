import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/layout/student/modals/student';
import { StudentService } from 'src/app/layout/student/services/student.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  addStudent!: FormGroup;
  isEditMode: boolean = false;
  currentStudent!: Student;
  maxDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private studentService: StudentService,
    private snackbar: MatSnackBar
  ) {
    this.addStudent = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      sport: ['', [Validators.required]],
      gender: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // console.log('id: ', this.data);
    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.studentService.getStudentDetails(this.data.id).subscribe({
        next: (res: any) => {
          // console.log('details: ', res);
          if (res) {
            this.currentStudent = JSON.parse(JSON.stringify(res.data[0]));
            this.addStudent.patchValue(this.currentStudent);
            this.addStudent.controls['dob'].patchValue(
              new Date(this.currentStudent.dob)
            );
          }
        },
        error: (errMsg) => {
          this.snackbar.open(errMsg, '', { duration: 5000 });
          // console.log('error: ', err);
        },
      });
    }
  }

  formSubmit() {
    this.addStudent.value.dob = new Date(this.addStudent.value.dob).getTime();
    if (!this.isEditMode) {
      this.studentService.createStudent(this.addStudent.value).subscribe({
        next: (res) => {
          if (res) {
            this.dialogRef.close(res);
          } else {
            this.snackbar.open('Error while adding student data...', '', {
              duration: 5000,
            });
            this.dialogRef.close();
          }
        },
        error: (errMsg) => {
          this.snackbar.open(errMsg, '', { duration: 5000 });
          // console.log('error: ', errMsg);
        },
      });
    } else {
      const payLoad = this.addStudent.value;
      payLoad.studentId = this.data.id;
      this.studentService.updateStudent(payLoad).subscribe({
        next: (res) => {
          // console.log('res from addDialog: ',res);
          if (res) {
            this.dialogRef.close(res);
          } else {
            this.snackbar.open('Error while updating student data...', '', {
              duration: 5000,
            });
            this.dialogRef.close();
          }
        },
        error: (errMsg) => {
          this.snackbar.open(errMsg, '', { duration: 5000 });
          // console.log('error: ', errMsg);
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  getErrorMessage(conrtol: string) {
    let errMsg = '';

    if (conrtol === 'name') {
      if (this.addStudent.get('name')?.hasError('required')) {
        errMsg = 'You must enter a value';
      }
    } else if (conrtol === 'email') {
      if (this.addStudent.get('email')?.hasError('required')) {
        errMsg = 'You must enter a value';
      } else {
        errMsg = this.addStudent.get('email')?.hasError('email')
          ? 'Not a valid email'
          : '';
      }
    } else if (conrtol === 'dob') {
      if (this.addStudent.get('dob')?.hasError('required')) {
        errMsg = 'You must select a date';
      }
    } else if (conrtol === 'sport') {
      if (this.addStudent.get('sport')?.hasError('required')) {
        errMsg = 'You must select a value';
      }
    }

    return errMsg;
  }
}
