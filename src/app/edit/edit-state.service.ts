import {Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {Pokemon} from "../core/external/poketracker/poketracker-api";

@Injectable({providedIn: "root"})
export class EditStateService {
  private readonly _selectedPokemon: WritableSignal<Pokemon | undefined> = signal(undefined);
  private readonly _isLoading: WritableSignal<boolean> = signal(false);

  removeEdition(edition: string) {
    this.updatePokemon(value => {
      return {...value, editions: value.editions.filter(e => e !== edition)};
    })
  }

  toggleShiny() {
    this.updatePokemon(value => {
      return {...value, shiny: !value.shiny}
    })
  }

  toggleNormal() {
    this.updatePokemon(value => {
      return {...value, normal: !value.normal}
    })
  }

  toggleUniversal() {
    this.updatePokemon(value => {
      return {...value, universal: !value.universal}
    })
  }

  toggleRegional() {
    this.updatePokemon(value => {
      return {...value, regional: !value.regional}
    })
  }

  addEdition(edition: string) {
    this.updatePokemon(value => {
      if (value.editions.includes(edition)) {
        return value
      } else {
        return {...value, editions: [...value.editions, edition]};
      }
    })
  }

  updatePokemon(fn: (pokemon: Pokemon) => Pokemon) {
    this.selectedPokemon.update(value => {
      if (value === undefined) {
        return undefined
      }
      return fn(value);
    });
  }

  set loading(value: boolean) {
    this._isLoading.update(() => value);
  }

  get loading(): Signal<boolean> {
    return this._isLoading;
  }

  get selectedPokemon(): WritableSignal<Pokemon | undefined> {
    return this._selectedPokemon;
  }

  get hasSelectedPokemon(): boolean {
    return this.selectedPokemon() !== undefined;
  }
}
