import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {PokeapiPokemon} from "../core/external/pokeapi/url/pokeapi-pokemon";

@Injectable({providedIn: "any"})
export class CreateStateService {
  private readonly _pokemon: WritableSignal<PokeapiPokemon | undefined> = signal(undefined);
  private readonly _loading: WritableSignal<boolean> = signal(false);
  private readonly _isShiny: WritableSignal<boolean> = signal(false);
  private readonly _isRegional: WritableSignal<boolean> = signal(false);
  private readonly _editions: WritableSignal<string[]> = signal([]);

  get pokemon(): Signal<PokeapiPokemon | undefined> {
    return this._pokemon;
  }

  set pokemon(pokemon: PokeapiPokemon | undefined) {
    console.log("pokemon updated to", pokemon)
    this._pokemon.update(() => pokemon)
  }

  get loading(): Signal<boolean> {
    return this._loading;
  }

  set loading(isLoading: boolean) {
    this._loading.update(() => isLoading)
  }

  get hasPokemon(): Signal<boolean> {
    return signal(this._pokemon() !== undefined)
  }

  get isShiny(): Signal<boolean> {
    return this._isShiny;
  }

  toggleShiny() {
    this._isShiny.update(isShiny => !isShiny);
  }

  get isRegional(): Signal<boolean> {
    return this._isRegional;
  }

  toggleRegional() {
    this._isRegional.update(isRegional => !isRegional);
  }

  get editions(): Signal<string[]> {
    return this._editions;
  }

  addEdition(edition: string) {
    this._editions.update(editions => [...editions, edition]);
  }

  removeEdition(edition: string) {
    this._editions.update(editions => editions.filter(e => e !== edition));
  }
}
