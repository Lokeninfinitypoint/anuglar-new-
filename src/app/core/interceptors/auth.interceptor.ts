import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const storage = inject(StorageService);
  const router = inject(Router);

  // Skip auth for Appwrite endpoints
  if (req.url.includes(environment.appwriteUrl)) {
    return next(req);
  }

  // Skip auth for auth exchange endpoint
  if (req.url.includes('/auth/exchange')) {
    return next(req);
  }

  // For Windmill API calls, add JWT
  if (req.url.includes(environment.windmillApiUrl)) {
    const jwt = authService.getWindmillToken();
    if (jwt) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
          'X-Tenant-ID': environment.tenantId
        }
      });
    }
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && req.url.includes(environment.windmillApiUrl)) {
        // Try to refresh JWT
        return authService.refreshSession().pipe(
          switchMap(() => {
            // Retry original request with new JWT
            const newJwt = authService.getWindmillToken();
            if (newJwt) {
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newJwt}`,
                  'X-Tenant-ID': environment.tenantId
                }
              });
              return next(retryReq);
            }
            return throwError(() => error);
          }),
          catchError(() => {
            authService.logout();
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
