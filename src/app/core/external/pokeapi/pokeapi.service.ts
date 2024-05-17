import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PokeapiUrlProvider} from "./url/pokeapi-url-provider";
import {map} from "rxjs";
import {PokeapiResponseFactory} from "./url/pokeapi-pokemon";

@Injectable({providedIn: "root"})
export class PokeapiService {

  constructor(private httpClient: HttpClient) {
  }

  //todo: lookup dex nr from german name
  public getPokemon(pokemonName: string) {
    return this.httpClient
      .get(`${PokeapiUrlProvider.pokemonEndpoint()}${pokemonName}`)
      .pipe(
        map(value => PokeapiResponseFactory.fromObject(value))
      );
  }
}
