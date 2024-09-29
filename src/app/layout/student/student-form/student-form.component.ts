import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../modals/student';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
  providers: [DatePipe],
})
export class StudentFormComponent implements OnInit {
  addStudent!: FormGroup;
  studentId!: string;
  isEditMode: boolean = false;
  currentStudent!: Student;
  maxDate = new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.addStudent = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      sport: ['', Validators.required],
      gender: ['', [Validators.required]],
      subscribe: [''],
    });
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((data) => {
      if (data && data['id']) {
        this.isEditMode = true;
        this.studentId = data['id'];
        this.studentService.getStudentDetails(this.studentId).subscribe({
          next: (res: any) => {
            console.log('details: ', res);
            this.currentStudent = JSON.parse(JSON.stringify(res));
            this.addStudent.patchValue(this.currentStudent);
            this.addStudent.controls['dob'].patchValue(
              new Date(this.currentStudent.dob)
            );
          },
          error: (err) => {
            console.log('error: ', err);
          },
        });
      } else {
        this.isEditMode = false;
      }
    });
  }

  formSubmit() {
    this.addStudent.value.dob = new Date(this.addStudent.value.dob).getTime();
    if (!this.isEditMode) {
      this.studentService.createStudent(this.addStudent.value).subscribe({
        next: (res) => {
          // console.log(res);
          this.router.navigate(['/student/list']);
        },
        error: (errMsg) => {
          console.log('error: ', errMsg);
        },
      });
    } else {
      const payLoad = this.addStudent.value;
      payLoad.studentId = this.studentId;
      this.studentService.updateStudent(payLoad).subscribe({
        next: (res) => {
          if (res) {
            this.router.navigate(['/student/list']);
          }
        },
        error: (errMsg) => {
          console.log('error: ', errMsg);
        },
      });
    }
  }

  onCancel() {
    this.router.navigate(['/student/list']);
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
