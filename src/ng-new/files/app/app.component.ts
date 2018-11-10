import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

<%= auth === 'SSO' ? `
import { UserProfile } from './core/user-profile';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
` : '' %>

@Component({
  selector: 'app-login',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {


  constructor(
    public dialog: MatDialog,
    <%= auth === 'SSO' ? `
    private _authService: AuthService,
    private _router: Router    
    ` : '' %>
  ) {

  <%= auth === 'SSO' ?
    `if (window.location.href.indexOf('?postLogout=true') > 0) {
      this._authService.signoutRedirectCallback().then(() => {
        const url: string = this._router.url.substring(
          0,
          this._router.url.indexOf('?')
        );
        this._router.navigateByUrl(url);
      });
    }` : '' %>    
   }

ngOnInit() { }

<%= auth === 'SSO' ? `
  public login() {
    this._authService.login();
  }

  public logout() {
    this._authService.logout();
  }

  public isLoggedIn() {
    return this._authService.isLoggedIn();
  }
  ` : '' %>
}

