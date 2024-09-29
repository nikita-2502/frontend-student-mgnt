import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
  
    try {
      return this.authService.userB.pipe(
        take(1),
        exhaustMap((user) => {
          if (!user) {
            return next.handle(req);
          }
          const headers = new HttpHeaders({
            token: user && user._token ? user._token : '',
            user_id: user && user.id ? user.id.toString() : '',
            'Content-Type': 'application/json',
          });

          const modifiedReq = req.clone({ headers });
          return next.handle(modifiedReq);
        })
      );
    } catch (error:any) {
      console.log('error:', error);
      return error;
    }
    
  }
}
