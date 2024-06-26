import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AuthStateService} from "../../auth/auth-state.service";
import {catchError, Observable, of, switchMap} from "rxjs";
import {Pokemon, User} from "./poketracker-api";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PoketrackerApiService {
  private readonly _pokemonPath: string = '/pokemon';
  private readonly _userPath: string = '/user';
  private readonly _baseUrl: string = environment.POKETRACKER_API_URL;
  private refreshCallback: () => Observable<HttpErrorResponse | User>;

  constructor(private httpClient: HttpClient, private authState: AuthStateService) {
  }

  public registerRefreshCallback(callback: () => Observable<HttpErrorResponse | User>) {
    this.refreshCallback = callback;
  }

  public getAllPokemon(): Observable<Pokemon[] | HttpErrorResponse> {
    return this.callApiAuthenticated(() => this.callGet<Pokemon[]>(this._baseUrl + this._pokemonPath));
  }

  public createPokemon(pokemon: Pokemon): Observable<Pokemon | HttpErrorResponse> {
    return this.callApiAuthenticated(() => this.callPost<Pokemon>(this._baseUrl + this._pokemonPath, pokemon));
  }

  public updatePokemon(pokemon: Pokemon): Observable<Pokemon | HttpErrorResponse> {
    return this.callApiAuthenticated(() => this.callPut<Pokemon>(this._baseUrl + this._pokemonPath, pokemon));
  }

  public deletePokemon(pokemon: Pokemon): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.callApiAuthenticated(() => this.callDelete<HttpResponse<any>>(this._baseUrl + this._pokemonPath + '/' + pokemon.dex));
  }

  public getUser(): Observable<User | HttpErrorResponse> {
    return this.callApiAuthenticated(() => this.callGet<User>(this._baseUrl + this._userPath));
  }

  public createUser(user: User) {
    return this.callApiAuthenticated(() => this.callPost<User>(this._baseUrl + this._userPath, user))
  }

  public updateUser(user: User) {
    return this.callApiAuthenticated(() => this.callPut<User>(this._baseUrl + this._userPath, user))
  }

  public deleteAllPokemon() {
    return this.callApiAuthenticated(() => this.callDelete<HttpResponse<any>>(this._baseUrl + this._pokemonPath))
  }

  public deleteUser() {
    return this.callApiAuthenticated(() => this.callDelete<HttpResponse<any>>(this._baseUrl + this._userPath))
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
          return this.refreshCallback().pipe(
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
