import {Component, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {SidenavComponent} from "../sidenav/sidenav.component";
import {PoketrackerApiService} from "../core/external/poketracker/poketracker-api.service";
import {Pokemon} from "../core/external/poketracker/poketracker-api";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TitleCasePipe, UpperCasePipe} from "@angular/common";
import {PokemonTypeComponent} from "../shared/pokemon-type/pokemon-type.component";
import {MatChipRemove, MatChipRow} from "@angular/material/chips";
import {ResponsiveConfigurationService} from "../shared/responsive-configuration.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SidenavComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    UpperCasePipe,
    TitleCasePipe,
    PokemonTypeComponent,
    MatChipRow,
    MatChipRemove
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
//todo: add a search bar to filter the pokemon
//todo: add buttons for deleting, editing and adding pokemon
//todo: add statistics? (total pokemon, total shiny, total normal, total universal, total regional), piechart?
//      -> maybe in another tab?
//todo: pagination?
//todo: add snackbar notification if error occurs
//todo: session timed out notification?
// todo: stats on another tab? -> especially for mobile
export class DashboardComponent implements OnInit {
  private _poketrackerApi: any;
  protected _dataSourceSignal: WritableSignal<Pokemon[]>;
  columnsToDisplay: string[];
  columnsToDisplayWithExpand: string[];
  expandedElement: Pokemon | null;

  constructor(_poketrackerApi: PoketrackerApiService, protected _responsiveConfigurationService: ResponsiveConfigurationService) {
    this._poketrackerApi = _poketrackerApi;
    this._dataSourceSignal = signal([]);
    effect(() => this.changeDisplayedColumns());
  }

  ngOnInit(): void {
    this.loadPokemonTable()
    this.changeDisplayedColumns()
  }

  changeDisplayedColumns() {
    if (this._responsiveConfigurationService.isMobile()) {
      this.columnsToDisplay = ['dex', 'name', 'types'];
    } else {
      this.columnsToDisplay = ['dex', 'name', 'types', 'shiny', 'normal', 'universal', 'regional'];
    }
    this.columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  }

  loadPokemonTable() {
    this._poketrackerApi.getAllPokemon().subscribe({
      next: (value: Pokemon[]) => {
        value.sort((a, b) => a.dex - b.dex);
        this._dataSourceSignal.update(() => value);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

  deletePokemon(pokemon: Pokemon) {
    this._poketrackerApi.deletePokemon(pokemon).subscribe({
      next: () => {
        this.loadPokemonTable()
      },
    });
    console.log("pokemon deleted, " + pokemon.dex)
  }
}
