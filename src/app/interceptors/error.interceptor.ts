import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 404) {
        console.error('404 error', error.message);
        router.navigate(['/404']);
      } else if (error.status === 500) {
        console.error('500 error', error.message);
        alert('Errore interno DB');
      } else console.error('http error ' + error.status + ' :' + error.message);
      return throwError(() => {
        error;
      });
    })
  );
};
