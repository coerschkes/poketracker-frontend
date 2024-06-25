import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AuthStateService} from "../../auth/auth-state.service";
import {catchError, Observable, of, switchMap} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {Pokemon} from "./poketracker-api";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PoketrackerApiService {

  private readonly _baseUrl: string = environment.POKETRACKER_API_URL;

  constructor(private httpClient: HttpClient, private authState: AuthStateService, private authService: AuthService) {
  }

  public getAllPokemon(): Observable<Pokemon[] | HttpErrorResponse> {
    return this.callApiAuthenticated(() => this.callGet<Pokemon[]>(this._baseUrl));
  }

  public createPokemon(pokemon: Pokemon): Observable<Pokemon | HttpErrorResponse> {
    return this.callApiAuthenticated(() => this.callPost<Pokemon>(this._baseUrl, pokemon));
  }

  public updatePokemon(pokemon: Pokemon): Observable<Pokemon | HttpErrorResponse> {
    return this.callApiAuthenticated(() => this.callPut<Pokemon>(this._baseUrl, pokemon));
  }

  public deletePokemon(pokemon: Pokemon): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.callApiAuthenticated(() => this.callDelete<HttpResponse<any>>(this._baseUrl + '/' + pokemon.dex));
  }

  private callGet<T>(url: string) {
    return this.httpClient.get<T>(url, this.buildOptions())
  }

  private callPost<T>(url: string, body: any) {
    return this.httpClient.post<T>(url, body, this.buildOptions())
  }

  private callPut<T>(url: string, body: any) {
    return this.httpClient.put<T>(url, body, this.buildOptions())
  }

  private callDelete<T>(url: string) {
    return this.httpClient.delete<T>(url, this.buildOptions())
  }

  private callApiAuthenticated<T>(apiCallProvider: () => Observable<T>): Observable<T | HttpErrorResponse> {
    return apiCallProvider().pipe(
      catchError(() => {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              return apiCallProvider()
                .pipe(
                  catchError((err: HttpErrorResponse) => {
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

  private buildOptions() {
    return {
      headers: {
        Authorization: 'Bearer ' + this.authState.userInfo()?.idToken,
      }
    }
  }
}
