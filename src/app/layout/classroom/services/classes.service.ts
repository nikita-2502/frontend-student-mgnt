import { Injectable } from '@angular/core';
import { Classes } from '../modals/classes';
import { HttpClient } from '@angular/common/http';
import { catchError, map, take, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from 'src/app/shared/modals/api_res';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor(private http: HttpClient) {}

  createClass(data: Classes) {
    // console.log('data: ', data);
    return this.http
      .post(`${environment.apiEndPoint}${environment.classApi.addClass}`, data)
      .pipe(
        map((res: any) => {
          console.log('res: ', res);
          if (res.status === 200 && res.data && res.data.length > 0) {
            let classes = {};
            classes = res.data[0];
            return classes;
          } else {
            return null;
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  updateDetails(data: Classes) {
    return this.http
      .put(
        `${environment.apiEndPoint}${environment.classApi.updateClassData}`,
        data
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
  getClassDetails(id: string) {
    return this.http
      .get(
        `${environment.apiEndPoint}${environment.classApi.getClassData}${id}`
      )
      .pipe(
        map((response) => {
          // console.log('res of getClassDetails:', response);
          if (response) {
            let classDetails = {};
            classDetails = { ...response, id: id };
            return classDetails;
          }
          return null;
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  deleteClass(id: string) {
    return this.http
      .delete(
        `${environment.apiEndPoint}${environment.classApi.deleteClassById}?classId=${id}`
      )
      .pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }

  getAllDetails(filterData: any, pageIndex: number, pageSize: number, columnSorted: string | undefined, direction: string | undefined) {
    return this.http
      .get<ApiResponse>(
        `${environment.apiEndPoint}${environment.classApi.getAllClasss}?filterData=${filterData}&pageIndex=${pageIndex}&pageSize=${pageSize}&columnSorted=${columnSorted}&direction=${direction}`
      )
      .pipe(
        take(1),
        map((response) => {
          return response;
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
