import { Component, OnInit } from '@angular/core';

<%= auth === 'SSO' ? `
import { AuthService } from './core/auth.service';
` : '' %>

@Component({
  selector: '<%= selector %>-app',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {


  constructor(
    <%= auth === 'SSO' ? `
    private _authService: AuthService,
    ` : '' %>
  ) { }

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

