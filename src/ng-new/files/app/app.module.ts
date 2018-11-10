import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RootComponent } from './root.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: AppComponent
    }
];

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        RouterModule.forRoot(appRoutes),
    ],
    exports: [],
    declarations: [
        AppComponent,
        RootComponent,
    ],
    providers: [],
    bootstrap: [RootComponent],
})
export class AppModule { }
