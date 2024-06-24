import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class ResponsiveConfigurationService {
  private _isMobile: WritableSignal<boolean> = signal(false);
  private _isDarkMode: WritableSignal<boolean> = signal(false);

  constructor(private _router: Router) {
  }

  updateIsMobile() {
    this._isMobile.update(() => window.innerWidth <= 600)
  }

  toggleDarkMode() {
    this._isDarkMode.update((isDarkMode) => !isDarkMode)
  }

  currentRoute() {
    return this._router.url.slice(1, this._router.url.length)
  }

  get isMobile(): Signal<boolean> {
    return this._isMobile
  }

  get isDarkMode(): Signal<boolean> {
    return this._isDarkMode
  }
}
