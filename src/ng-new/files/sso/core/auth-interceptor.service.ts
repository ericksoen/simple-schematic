import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { tap } from 'rxjs/internal/operators';

import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private _authService: AuthService, private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // TODO: Only add token to requests to certain URLs
    const accessToken = this._authService.getAccessToken();
    const headers = req.headers.set('Authorization', `Bearer ${accessToken}`);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
    // return next.handle(authReq).tap(() => { }, error => {
    //   const respError = error as HttpErrorResponse;

    //   if (respError && (respError.status === 401)) {
    //     this._router.navigate(['/unauthorized']);
    //   }
    // });
  }

}
