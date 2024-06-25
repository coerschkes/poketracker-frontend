import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {PokemonSelectorValidatorService} from "./pokemon-selector-validator.service";
import {PokemonSelectorInputFilterService} from "./pokemon-selector-input-filter.service";
import {AsyncPipe} from "@angular/common";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ResponsiveConfigurationService} from "../responsive-configuration.service";
import {PokemonSelectorMode} from "./pokemon-selector-mode";

@Component({
  selector: 'app-pokemon-selector',
  standalone: true,
  imports: [
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    ReactiveFormsModule
  ],
  templateUrl: './pokemon-selector.component.html',
  styleUrl: './pokemon-selector.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class PokemonSelectorComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<string> = new EventEmitter();
  @Input() mode: PokemonSelectorMode = PokemonSelectorMode.ALL;
  @Input() initialValue: string = '';
  protected pokemonNameControl: FormControl<string | null>;
  protected filteredOptions: Observable<string[]>;

  constructor(private _validatorsService: PokemonSelectorValidatorService,
              private _pokemonInputFilterService: PokemonSelectorInputFilterService,
              protected responsive: ResponsiveConfigurationService) {
    this.pokemonNameControl = new FormControl(this.initialValue, {
      updateOn: 'change',
      asyncValidators: [this._validatorsService.validatePokemonInput(this.mode)],
    });
  }

  ngOnInit(): void {
    switch (this.mode) {
      case PokemonSelectorMode.PERSONALIZED:
        this.filteredOptions = this._pokemonInputFilterService.registerPokemonInputFilterWithPokemonList(this.pokemonNameControl.valueChanges);
        break;
      case PokemonSelectorMode.ALL:
      default:
        this.filteredOptions = this._pokemonInputFilterService.registerPokemonInputFilter(this.pokemonNameControl.valueChanges);
        break;
    }
  }

  emitSelection() {
    if (this.pokemonNameControl.value !== undefined && !this.pokemonNameControl.hasError('invalidPokemon')) {
      this.onSelect.emit(this.pokemonNameControl.value!.trim().toLowerCase());
    }
  }

  reset() {
    this.pokemonNameControl.setValue('');
  }

  set value(value: string) {
    this.pokemonNameControl.setValue(value);
  }
}
