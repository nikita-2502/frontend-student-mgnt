import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../shared/modals/user';
import { SignUpResponse } from './models/signup';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userB = new BehaviorSubject<User | null>(null);
  userD = this.userB.asObservable();
  private timerExpire: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };

    return this.http
      .post<SignUpResponse>(
        `${environment.apiEndPoint}${environment.authApi.register}`,
        data
      )
      .pipe(
        catchError(this.handleError)
        // tap((res) => this.createUser(res))
      );
  }

  login(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };

    return this.http
      .post<SignUpResponse>(
        `${environment.apiEndPoint}${environment.authApi.login}`,
        data
      )
      .pipe(
        catchError(this.handleError),
        tap((res) => this.createUser(res))
      );
  }

  logout() {
    this.userB.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');

    if (this.timerExpire) {
      clearTimeout(this.timerExpire);
    }

    this.timerExpire = null;
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user) {
      return;
    }

    const logged = new User(user.email, user.id, user._token);

    if (logged._token) {
      this.userB.next(logged);

      const timer = new Date(user._expiresIn).getTime() - new Date().getTime();
      // this.autoLogout(timer);
    }
  }

  // autoLogout(expireTime: number) {
  //   this.timerExpire = setTimeout(() => {
  //     this.logout();
  //   }, expireTime);
  // }

  private createUser(res: any) {
    if (res && res.status === 200) {
      const email = res.data[0].email;
      const localId = res.data[0].userId;
      const user = new User(email, localId, res.token);
      this.userB.next(user);

      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  private handleError(err: any) {
    let errMessage = 'An unknown error is occured.';

    if (!err.error || !err.error.error) {
      return throwError(() => errMessage);
    }

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'This email is already exsits.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errMessage = 'This operation is not allowed.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errMessage = 'The email ID or Password is not correct.';
        break;
    }

    return throwError(() => errMessage);
  }
}
