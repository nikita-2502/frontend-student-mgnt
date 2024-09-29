import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, exhaustMap, map, take, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Task } from '../modals/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  GetAllTasks(){
    return this.authService.userD
    .pipe(
      take(1),
      exhaustMap(user => {
        // console.log('token: ', user?.token);
        return this.http.get<{[key: string]: Task}>('https://angularhttpclient-7a9d6-default-rtdb.firebaseio.com/tasks.json?auth='+user?.token
          //  {params: new HttpParams().set('auth', user?.token)}
        )}),
      map((response) => {
        // console.log('response: ', response);
        //TRANSFORM DATA
        let tasks: any = [];
        for(let key in response){
          if (response.hasOwnProperty(key)) {
            tasks.push({...response[key], id: key});
          }
          
        } 
        return tasks;
      }), 
      catchError((err) => {
            // write the logic to log error.
            return throwError(() => err);
      })
    )
  }
}
