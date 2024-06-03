import {Injectable} from "@angular/core";
import {forkJoin, map, Observable, of} from "rxjs";
import {LookupTableService} from "../lookup-table.service";


@Injectable({providedIn: "any"})
export class PokemonTypeService {
  private readonly pokemonTypeLookupTablePath: string = "assets/pokemon-type-lookup-table-ger.csv";

  constructor(private _lookupTableService: LookupTableService) {
  }

  lookupTypes(types: string[], inputLanguage: string): Observable<string[]> {
    return forkJoin(
      types.map(type => this.lookupType(type, inputLanguage)
      )
    );
  }


  lookupType(type: string, inputLanguage: string) {
    type = type.toLowerCase()
    if (inputLanguage === "en") {
      return this._lookupTableService.translateTypeToGerman(this.pokemonTypeLookupTablePath, type)
        .pipe(
          map(value => value[0]),
        );
    } else if (inputLanguage === "de") {
      return of(type)
    } else {
      return of()
    }
  }
}
