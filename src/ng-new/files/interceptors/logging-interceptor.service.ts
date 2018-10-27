import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';

@Injectable()
export class LoggingInterceptorService implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();
        return next.handle(req).do(() => { }, (err: any) => {
            console.error(err);
        });
    }
}