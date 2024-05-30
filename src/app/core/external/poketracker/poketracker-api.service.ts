import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthStateService} from "../../auth/auth-state.service";
import {catchError, Observable, of, switchMap} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {Pokemon} from "./poketracker-api";

@Injectable({
  providedIn: 'root'
})
export class PoketrackerApiService {
  private readonly _baseUrl: string = 'http://localhost:1323/api/pokemon';

  constructor(private httpClient: HttpClient, private authState: AuthStateService, private authService: AuthService) {
  }

  public getAllPokemon(): Observable<Pokemon[] | HttpErrorResponse> {
    return this.callGetApiAuthenticated<Pokemon[]>(this._baseUrl)
      .pipe(
        catchError((err: HttpErrorResponse) => {
            console.log(err)
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                return this.callGetApiAuthenticated<Pokemon[]>(this._baseUrl)
                  .pipe(
                    catchError((err: HttpErrorResponse) => {
                        console.log(err)
                        if (err.status === 401) {
                          this.authState.invalidate()
                        }
                        return of(err)
                      }
                    )
                  )
              })
            )
          }
        )
      )
  }

  public callGetApiAuthenticated<T>(url: string) {
    return this.httpClient.get<T>(url, {
      headers: {Authorization: 'Bearer ' + this.authState.userInfo()?.idToken}
    })
  }
}
