import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const appHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);

  let req = request;
  if (!req.url.includes("auth/login"))
  {
    req = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + auth.accessToken)
    });
  }
  return next(req);
};
