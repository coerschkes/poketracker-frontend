import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {PokeapiUrlProvider} from "./url/pokeapi-url-provider";
import {map, switchMap} from "rxjs";
import {PokeapiResponseFactory} from "./url/pokeapi-pokemon";
import {LookupTableService} from "../../../shared/lookup-table.service";

@Injectable({providedIn: "root"})
export class PokeapiService {
  private readonly lookupTablePath: string = "assets/pokemon-lookup-table-ger.csv";

  constructor(private httpClient: HttpClient, private lookupService: LookupTableService) {
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
    return this.lookupService.translateTypeToGerman(this.lookupTablePath, pokemonName)
  }
}
