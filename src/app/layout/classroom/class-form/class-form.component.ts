import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Classes } from '../modals/classes';
import { StudentService } from '../../student/services/student.service';
import { ClassesService } from '../services/classes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.scss'],
})
export class ClassFormComponent implements OnInit {
  addClassDetail!: FormGroup;
  isEditMode: boolean = false;
  currentClass!: Classes;
  studentsName: any = [];
  classes: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  studentId: Array<number> = [];

  constructor(
    public dialogRef: MatDialogRef<ClassFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private studentService: StudentService,
    private classService: ClassesService
  ) {
    this.addClassDetail = this.fb.group({
      class_name: ['', [Validators.required]],
      division: ['', [Validators.required]],
      classTeacher: ['', [Validators.required]],
      noOfStd: ['', [Validators.required]],
      students: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id) {
      this.isEditMode = true;
      this.classService.getClassDetails(this.data.id).subscribe({
        next: (res: any) => {
          if (res) {
            this.studentService
              .getStudent(res.data[0].students, this.data.id)
              .subscribe((res) => {
                if (res) {
                  this.studentsName = res.data;
                }
              });
            if (res.data) {
              this.currentClass = JSON.parse(JSON.stringify(res.data[0]));
              this.addClassDetail.patchValue(this.currentClass);
            }
          }
        },
        error: (err) => {
          this.snackbar.open(err, '', { duration: 5000 });
        },
      });
    } else {
      this.studentService.getStudent(this.studentId).subscribe((res) => {
        // console.log('res: ', res);
        this.studentsName = res.data;
      });
    }
  }

  formSubmit() {
    if (!this.isEditMode) {
      this.classService.createClass(this.addClassDetail.value).subscribe({
        next: (res) => {
          if (res) {
            this.dialogRef.close(res);
          } else {
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.snackbar.open(err, '', { duration: 5000 });
        },
      });
    } else {
      const payLoad = this.addClassDetail.value;
      payLoad.classId = this.data.id;
      this.classService.updateDetails(payLoad).subscribe({
        next: (res) => {
          if (res) {
            this.dialogRef.close(res);
          } else {
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.snackbar.open(err, '', { duration: 5000 });
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  getErrorMessage(conrtol: string) {
    let errMsg = '';

    if (conrtol === 'classNo') {
      if (this.addClassDetail.get('classNo')?.hasError('required')) {
        errMsg = 'You must enter a value';
      }
    } else if (conrtol === 'division') {
      if (this.addClassDetail.get('division')?.hasError('required')) {
        errMsg = 'You must select a value';
      }
    } else if (conrtol === 'classTeacher') {
      if (this.addClassDetail.get('classTeacher')?.hasError('required')) {
        errMsg = 'You must enter a value';
      }
    } else if (conrtol === 'noOfStd') {
      if (this.addClassDetail.get('noOfStd')?.hasError('required')) {
        errMsg = 'You must enter a value';
      }
    } else if (conrtol === 'students') {
      if (this.addClassDetail.get('students')?.hasError('required')) {
        errMsg = 'You must select a value';
      }
    }

    return errMsg;
  }
}
