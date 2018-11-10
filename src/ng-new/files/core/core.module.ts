import { NgModule } from '@angular/core';

import { LoggingInterceptorService } from './logging-interceptor.service';
<%= auth === 'SSO' ?
    `import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from './auth.service';
` : '' %>
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
    ],
    exports: [
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
    ],
    declarations: [],
    providers: [
        <%= auth === 'SSO' ?
            `AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },` : '' %>
            {
                provide: HTTP_INTERCEPTORS,
                useClass: LoggingInterceptorService,
                multi: true
            }
    ],
})
export class CoreModule { }
