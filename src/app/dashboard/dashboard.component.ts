import {Component, OnInit} from '@angular/core';
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
    PokemonTypeComponent
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
export class DashboardComponent implements OnInit {
  private _poketrackerApi: any;
  protected _dataSource: Pokemon[];
  columnsToDisplay = ['dex', 'name', 'types', 'shiny', 'normal', 'universal', 'regional'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Pokemon | null;

  constructor(_poketrackerApi: PoketrackerApiService) {
    this._poketrackerApi = _poketrackerApi;
    this._dataSource = [];
  }

  ngOnInit(): void {
    this._poketrackerApi.getAllPokemon().subscribe({
      next: (value: Pokemon[]) => {
        this._dataSource = value;
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }
}
