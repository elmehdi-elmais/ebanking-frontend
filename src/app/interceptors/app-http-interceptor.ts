import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const appHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const  router: Router = inject(Router);
  let req = request;
  if (!req.url.includes("auth/login"))
  {
    req = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + auth.accessToken)
    });
  }
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        auth.logout();
        router.navigateByUrl('/login');
      }
      return throwError(() => error);
    })
  );
};
