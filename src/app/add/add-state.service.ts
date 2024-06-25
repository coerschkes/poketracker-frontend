import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {PokeapiPokemon} from "../core/external/pokeapi/url/pokeapi-pokemon";
import {Observable} from "rxjs";

export interface AddState {
  pokemonNames: string[];
  editions: string[];
  isNormal: boolean;
  isShiny: boolean;
  isRegional: boolean;
  isUniversal: boolean;
  loading: boolean;
}

@Injectable({providedIn: "root"})
export class AddStateService {
  private readonly _state: WritableSignal<AddState>;
  private _loadedPokemon: Observable<PokeapiPokemon> | undefined = undefined;

  constructor() {
    this._state = signal(this.buildInitialState());
  }

  reset() {
    this._state.update(() => this.buildInitialState());
    this._loadedPokemon = undefined;
  }

  toggleNormal() {
    this._state.update((value) => {
      value.isNormal = !value.isNormal;
      return value;
    });
  }

  toggleShiny() {
    this._state.update((value) => {
      value.isShiny = !value.isShiny;
      return value;
    });
  }

  toggleRegional() {
    this._state.update((value) => {
      value.isRegional = !value.isRegional;
      return value;
    });
  }

  toggleUniversal() {
    this._state.update((value) => {
      value.isUniversal = !value.isUniversal;
      return value;
    });
  }

  addEdition(edition: string) {
    this._state.update((value) => {
      if (!value.editions.includes(edition)) {
        value.editions.push(edition);
      }
      return value;
    });
  }

  removeEdition(edition: string) {
    this._state.update((value) => {
      value.editions = value.editions.filter(e => e !== edition);
      return value;
    });
  }

  set pokemonNames(pokemonNames: string[]) {
    this._state.update((value) => {
      value.pokemonNames = pokemonNames;
      return value;
    });
  }

  set loading(loading: boolean) {
    this._state.update((value) => {
      value.loading = loading;
      return value;
    });
  }

  set loadedPokemon(pokeapiPokemon: Observable<PokeapiPokemon> | undefined) {
    this._loadedPokemon = pokeapiPokemon;
  }

  get state(): Signal<AddState> {
    return this._state.asReadonly();
  }

  get loadedPokemon(): Observable<PokeapiPokemon> | undefined {
    return this._loadedPokemon;
  }

  private buildInitialState(): AddState {
    return {
      pokemonNames: [],
      editions: [],
      isNormal: true,
      isShiny: false,
      isRegional: false,
      isUniversal: false,
      loading: false,
    };
  }
}
