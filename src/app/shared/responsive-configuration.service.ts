import {Injectable, Signal, signal, WritableSignal} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ResponsiveConfigurationService {
  private _isMobile: WritableSignal<boolean> = signal(false);
  private _isDarkMode: WritableSignal<boolean> = signal(false);

  updateIsMobile() {
    this._isMobile.update(() => window.innerWidth <= 600)
  }

  toggleDarkMode() {
    this._isDarkMode.update((isDarkMode) => !isDarkMode)
  }

  get isMobile(): Signal<boolean> {
    return this._isMobile
  }

  get isDarkMode(): Signal<boolean> {
    return this._isDarkMode
  }
}
