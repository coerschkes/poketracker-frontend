import {Injectable, Signal, signal, WritableSignal} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ResponsiveConfigurationService {
  private _isMobile: WritableSignal<boolean> = signal(false);

  update() {
    this._isMobile.update(() => window.innerWidth <= 600)
  }

  get isMobile(): Signal<boolean> {
    return this._isMobile
  }
}
