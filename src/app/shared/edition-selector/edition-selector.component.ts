import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe} from "@angular/common";
import {MatSelect} from "@angular/material/select";
import {ResponsiveConfigurationService} from "../responsive-configuration.service";
import {MatInput} from "@angular/material/input";
import {map, Observable, of, startWith} from "rxjs";

interface Edition {
  name: string;
  generation: number;
}

@Component({
  selector: 'app-edition-selector',
  standalone: true,
  imports: [
    MatFormField,
    MatChipGrid,
    MatChipRow,
    MatChipInput,
    MatIcon,
    MatLabel,
    MatChipRemove,
    MatAutocomplete,
    MatOption,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    AsyncPipe,
    MatSelect,
    FormsModule,
    MatInput
  ],
  templateUrl: './edition-selector.component.html',
  styleUrl: './edition-selector.component.scss',
})
export class EditionSelectorComponent implements OnInit {
  @Output() onChange: EventEmitter<string> = new EventEmitter();
  protected editionControl: FormControl<string | null>;
  protected filteredEditions: Observable<string[]> = of();

  constructor(protected responsive: ResponsiveConfigurationService) {
    this.editionControl = new FormControl('', {
      updateOn: 'change',
    });
  }

  ngOnInit(): void {
    this.filteredEditions = this.editionControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value !== null) {
          return this._filter(value || '')
        } else {
          return []
        }
      }),
    );
  }

  emitSelection() {
    if (this.editionControl.value !== undefined) {
      this.onChange.emit(this.editionControl.value!);
      this.editionControl.setValue('');
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.editions.map(ed => ed.name).filter(edition => edition.toLowerCase().startsWith(filterValue));
  }

  editions: Edition[] = [
    {name: 'Rot', generation: 1},
    {name: 'Blau', generation: 1},
    {name: 'Gelb', generation: 1},
    {name: 'Gold', generation: 2},
    {name: 'Silber', generation: 2},
    {name: 'Kristall', generation: 2},
    {name: 'Saphir', generation: 3},
    {name: 'Rubin', generation: 3},
    {name: 'Smaragd', generation: 3},
    {name: 'Feuerrot', generation: 3},
    {name: 'Blattgrün', generation: 3},
    {name: 'Diamant', generation: 4},
    {name: 'Perl', generation: 4},
    {name: 'Platin', generation: 4},
    {name: 'Heart Gold', generation: 4},
    {name: 'Soul Silver', generation: 4},
    {name: 'Schwarz', generation: 5},
    {name: 'Weiß', generation: 5},
    {name: 'Schwarz 2', generation: 5},
    {name: 'Weiß 2', generation: 5},
    {name: 'X', generation: 6},
    {name: 'Y', generation: 6},
    {name: 'Omega Rubin', generation: 6},
    {name: 'Alpha Saphir', generation: 6},
    {name: 'Sonne', generation: 6},
    {name: 'Mond', generation: 7},
    {name: 'Ultra Sonne', generation: 7},
    {name: 'Ultra Mond', generation: 7},
    {name: "Let's Go, Pikachu!", generation: 7},
    {name: "Let's Go, Evoli!", generation: 7},
    {name: 'Schwert', generation: 8},
    {name: 'Schild', generation: 8},
    {name: 'Strahlender Diamant', generation: 8},
    {name: 'Leuchtende Perle', generation: 8},
    {name: 'Legenden: Arceus', generation: 8},
    {name: 'Karmesin', generation: 9},
    {name: 'Purpur', generation: 9},
  ];
}
