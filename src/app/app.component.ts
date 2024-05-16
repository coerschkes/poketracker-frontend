import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {environment} from "../environments/environment";
import {AuthStateService} from "./core/auth/auth-state.service";
import {SidenavComponent} from "./sidenav/sidenav.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly _authState: AuthStateService;
  readonly title = environment.APP_NAME;

  constructor(authState: AuthStateService) {
    this._authState = authState;
  }

  isLoggedIn(): boolean {
    return this._authState.isLoggedIn()
  }
}
