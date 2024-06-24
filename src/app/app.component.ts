import {Component, effect, HostBinding, HostListener, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {environment} from "../environments/environment";
import {AuthStateService} from "./core/auth/auth-state.service";
import {ToolbarComponent} from "./toolbar/toolbar.component";
import {AuthComponent} from "./core/auth/component/auth.component";
import {ResponsiveConfigurationService} from "./shared/responsive-configuration.service";
import {LocalStorageService} from "./shared/localStorage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  readonly title = environment.APP_NAME;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this._responsiveConfigurationService.updateIsMobile();
  }

  @HostBinding('class')
  currentTheme: 'light-theme' | 'dark-theme' = 'light-theme';

  constructor(private _authState: AuthStateService,
              private _responsiveConfigurationService: ResponsiveConfigurationService,
              private _localStorage: LocalStorageService) {
    effect(() => {
      if (this._responsiveConfigurationService.isDarkMode()) {
        this.currentTheme = 'dark-theme';
      } else {
        this.currentTheme = 'light-theme'
      }
    });
  }

  ngOnInit(): void {
    this._responsiveConfigurationService.updateIsMobile();
    let userPreferences = this._localStorage.retrieveUserPreferences();
    if (userPreferences === undefined) {
      this._localStorage.storeUserPreferences({theme: 'light-theme'});
    } else {
      if (userPreferences.theme === 'dark-theme') {
        this._responsiveConfigurationService.toggleDarkMode()
      }
    }
  }

  isLoggedIn(): boolean {
    return this._authState.isLoggedIn()
  }

}
