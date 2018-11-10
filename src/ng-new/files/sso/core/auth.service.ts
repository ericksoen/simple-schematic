import { Injectable } from '@angular/core';
import { UserManager, User, Log, WebStorageStateStore } from 'oidc-client';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User;

  constructor() {
    Log.logger = console;
    const config = {
      authority: environment.stsAuthority,
      client_id: environment.clientId,
      redirect_uri: `${environment.clientRoot}assets/oidc-login-redirect`,
      scope: `openid projects-api profile`,
      response_type: 'id_token token',
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      automaticSilentRenew: true,
      silent_redirect_uri: `${environment.clientRoot}assets/silent-redirect`
    };
    this._userManager = new UserManager(config);
    this._userManager.getUser().then(user => {
      if (user && !user.expired) {
        this._user = user;
      }
    });

    this._userManager.events.addUserLoaded(args => {
      this._userManager.getUser().then(user => {
        this._user = user;
      });
    });
  }

  public login(): Promise<any> {
    return this._userManager.signinRedirect();
  }

  public logout(): Promise<any> {
    return this._userManager.signoutRedirect();
  }

  public isLoggedIn(): boolean {
    return this._user && this._user.access_token && !this._user.expired;
  }

  public getAccessToken(): string {
    return this._user ? this._user.access_token : '';
  }

  public signoutRedirectCallback(): Promise<any> {
    return this._userManager.signoutRedirectCallback();
  }
}
