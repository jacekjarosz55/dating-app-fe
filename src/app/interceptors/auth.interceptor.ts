import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("[AuthInterceptor] processing new request");
  const tokenValue = inject(AuthService).tokenValue();

  if(tokenValue == null) {
    return next(req);
  }

  return next(req.clone({
    setHeaders: {"Authorization": `Bearer ${tokenValue}`}
  }));
};
