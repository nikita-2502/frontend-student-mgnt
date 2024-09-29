import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  exhaustMap,
  map,
  Observable,
  take,
  throwError,
} from 'rxjs';
import { ApiResponse } from 'src/app/shared/modals/api_res';
import { Student } from '../modals/student';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createStudent(data: Student) {
    // console.log('data: ', data);
    return this.http
      .post(
        `${environment.apiEndPoint}${environment.studentApi.addStudent}`,
        data
      )
      .pipe(
        map((res: any) => {
          // console.log('res from service: ', res);
          if (res && res.status === 200) {
            let student = {};
            student = { ...data, studentId: res.data[0].studentId };
            return student;
          } else {
            return null;
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  deleteOneStudent(id: string) {
    return this.http
      .delete(
        `${environment.apiEndPoint}${environment.studentApi.deleteStudentById}?studentId=${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getStudentDetails(studentId: string) {
    return this.http
      .get(
        `${environment.apiEndPoint}${environment.studentApi.getStudentData}${studentId}`
      )
      .pipe(
        map((response) => {
          if (response) {
            let student = {};
            student = { ...response, studentId: studentId };
            return student;
          }
          return null;
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  updateStudent(data: Student) {
    // console.log('payLoad: ', data);
    return this.http
      .put(
        `${environment.apiEndPoint}${environment.studentApi.updateStudentData}`,
        data
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getAllStudent(filterData: any, columnSorted: string | undefined, direction: string | undefined, pageIndex: number, pageSize: number) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndPoint}${environment.studentApi.getAllStudents}?filterData=${filterData}&columnSorted=${columnSorted}&direction=${direction}&pageIndex=${pageIndex}&pageSize=${pageSize}`
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          console.log('err', JSON.stringify(err));
          return throwError(() => err);
        })
      );
  }

  getStudent(studentId: Array<number>, classId: number|null = null) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndPoint}${environment.studentApi.getStudent}?studentId=${studentId}&classId=${classId}`
      )
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err) => {
          console.log('err', JSON.stringify(err));
          return throwError(() => err);
        })
      );
  }
}
