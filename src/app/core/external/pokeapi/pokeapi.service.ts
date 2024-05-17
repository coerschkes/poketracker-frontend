import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PokeapiUrlProvider} from "./url/pokeapi-url-provider";
import {map, switchMap} from "rxjs";
import {PokeapiResponseFactory} from "./url/pokeapi-pokemon";

@Injectable({providedIn: "root"})
export class PokeapiService {
  private readonly lookupTablePath: string = "assets/pokemon-lookup-table-ger.csv";

  constructor(private httpClient: HttpClient) {
  }

  public getPokemon(pokemonName: string) {
    return this.lookupDexNr(pokemonName)
      .pipe(
        switchMap((kv: string[]) => {
          return this.httpClient.get(`${PokeapiUrlProvider.pokemonEndpoint()}${Number(kv[0])}`).pipe(
            map(value => {
                return PokeapiResponseFactory.fromObject(value, kv[1])
              }
            )
          )
        }),
      );
  }

  private lookupDexNr(pokemonName: string) {
    return this.httpClient
      .get(this.lookupTablePath, {responseType: "text"})
      .pipe(
        map(value => {
          const lines = value.split("\n");
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const columns = line.split(",");
            if (columns[1].toLowerCase() === pokemonName) {
              return columns;
            }
          }
          throw new Error(`Pokemon ${pokemonName} not found in lookup table`);
        })
      );
  }
}
