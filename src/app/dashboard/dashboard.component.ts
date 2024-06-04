import {Component, OnInit, signal, WritableSignal} from '@angular/core';
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
//todo: pagination?
//todo: add snackbar notification if error occurs
//todo: session timed out notification?
//todo: sort by dex nr
//todo: check space between type and row boundaries
export class DashboardComponent implements OnInit {
  private _poketrackerApi: any;
  protected _dataSourceSignal: WritableSignal<Pokemon[]>;
  protected _dataSource: Pokemon[];
  columnsToDisplay = ['dex', 'name', 'types', 'shiny', 'normal', 'universal', 'regional'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Pokemon | null;

  constructor(_poketrackerApi: PoketrackerApiService) {
    this._poketrackerApi = _poketrackerApi;
    this._dataSourceSignal = signal([]);
    this._dataSource = [];
  }

  ngOnInit(): void {
   this.loadPokemonTable()
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
