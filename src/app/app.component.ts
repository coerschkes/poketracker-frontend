import {Component, HostListener, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {environment} from "../environments/environment";
import {AuthStateService} from "./core/auth/auth-state.service";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {AuthComponent} from "./core/auth/component/auth.component";
import {ResponsiveConfigurationService} from "./shared/responsive-configuration.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  private readonly _authState: AuthStateService;
  readonly title = environment.APP_NAME;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this._responsiveConfigurationService.update();
  }

  ngOnInit(): void {
    this._responsiveConfigurationService.update();
  }

  constructor(authState: AuthStateService, private _responsiveConfigurationService: ResponsiveConfigurationService) {
    this._authState = authState;
  }

  isLoggedIn(): boolean {
    return this._authState.isLoggedIn()
  }
}
