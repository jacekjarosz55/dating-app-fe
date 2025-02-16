import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs';




export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenValue = authService.tokenValue();

  if(tokenValue == null) {
    return next(req);
  }

  return next(req.clone({
    setHeaders: {"Authorization": `Bearer ${tokenValue}`}
  })).pipe(catchError((err, caught) => {
      if (err.status == 401) {
        authService.logout();
      }
      throw err;
  }));
};
