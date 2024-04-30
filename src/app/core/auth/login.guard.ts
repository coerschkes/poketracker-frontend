// noinspection JSIgnoredPromiseFromCall

import {AuthStateService} from "./auth-state.service";
import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";


export class LoginGuard {

  static canActivate: CanActivateFn = () => {
    if (inject(AuthStateService).isLoggedIn()) {
      return true
    }
    inject(Router).navigate(['/auth'])
    return true
  };

}
