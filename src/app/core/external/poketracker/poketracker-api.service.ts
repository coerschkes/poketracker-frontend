import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
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
    return this.callApiAuthenticated(this.callGet<Pokemon[]>(this._baseUrl));
  }

  public createPokemon(pokemon: Pokemon): Observable<Pokemon | HttpErrorResponse> {
    return this.callApiAuthenticated(this.callPost<Pokemon>(this._baseUrl, pokemon));
  }

  public deletePokemon(pokemon: Pokemon): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.callApiAuthenticated(this.callDelete<HttpResponse<any>>(this._baseUrl + '/' + pokemon.dex));
  }

  private callGet<T>(url: string) {
    return this.httpClient.get<T>(url, {
      headers: {Authorization: 'Bearer ' + this.authState.userInfo()?.idToken}
    })
  }

  private callPost<T>(url: string, body: any) {
    return this.httpClient.post<T>(url, body, {
      headers: {Authorization: 'Bearer ' + this.authState.userInfo()?.idToken}
    })
  }

  private callDelete<T>(url: string) {
    return this.httpClient.delete<T>(url, {
      headers: {Authorization: 'Bearer ' + this.authState.userInfo()?.idToken}
    })
  }

  private callApiAuthenticated<T>(obs: Observable<T>): Observable<T | HttpErrorResponse> {
    return obs
      .pipe(
        catchError((err: HttpErrorResponse) => {
            console.log(err)
            return this.authService.refreshToken().pipe(
              switchMap(() => {
                return obs
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
}
