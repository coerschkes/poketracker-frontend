import {Injectable, signal, WritableSignal} from "@angular/core";
import {IdentityResponse} from "../core/external/firebase/firebase-api.service";

@Injectable({providedIn: 'root'})
export class AccountStateService {
  identity: WritableSignal<IdentityResponse | undefined> = signal(undefined)
  errorMessage = signal('');
  selectedAvatar: WritableSignal<string> = signal('');
}
