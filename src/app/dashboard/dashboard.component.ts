import {Component, effect, OnInit, signal, WritableSignal} from '@angular/core';
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {PoketrackerApiService} from "../core/external/poketracker/poketracker-api.service";
import {Pokemon} from "../core/external/poketracker/poketracker-api";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {TitleCasePipe, UpperCasePipe} from "@angular/common";
import {PokemonTypeComponent} from "../shared/pokemon-type/pokemon-type.component";
import {MatChipRemove, MatChipRow} from "@angular/material/chips";
import {ResponsiveConfigurationService} from "../shared/responsive-configuration.service";
import {ConfirmDialog} from "../shared/confirm-dialog/confirm-dialog.component";
import {DialogService} from "../shared/dialog.service";
import {SnackbarService} from "../shared/snackbar/snackbar.service";
import {EditStateService} from "../edit/edit-state.service";
import {Router, RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";
import {Animations} from "../shared/animations";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    UpperCasePipe,
    TitleCasePipe,
    PokemonTypeComponent,
    MatChipRow,
    MatChipRemove,
    RouterLink,
    MatDivider
  ],
  animations: Animations.detailExpand,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
//todo: add a search bar to filter the pokemon
//todo: add statistics? (total pokemon, total shiny, total normal, total universal, total regional), piechart?
//      -> maybe in another tab?
//todo: pagination?
//todo: session timed out notification?
// todo: stats on another tab? -> especially for mobile
export class DashboardComponent implements OnInit {
  protected _dataSourceSignal: WritableSignal<Pokemon[]>;
  columnsToDisplay: string[];
  columnsToDisplayWithExpand: string[];
  expandedElement: Pokemon | null;

  constructor(private _poketrackerApi: PoketrackerApiService,
              private dialogService: DialogService,
              protected _responsiveConfigurationService: ResponsiveConfigurationService,
              private _snackbarService: SnackbarService,
              private _editStateService: EditStateService,
              private _router: Router) {
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
      next: (value: Pokemon[] | HttpErrorResponse) => {
        if (value instanceof HttpErrorResponse) {
          console.log(value);
          return;
        }
        value.sort((a, b) => a.dex - b.dex);
        this._dataSourceSignal.update(() => value);
      },
      error: (e: HttpErrorResponse) => {
        console.log(e);
      }
    });
  }

  onDeletePokemon(pokemon: Pokemon) {
    this.dialogService.openDialog<ConfirmDialog>(this.createConfirmDialog(pokemon))
  }

  onEditPokemon(pokemon: Pokemon) {
    this._editStateService.selectedPokemon.update(() => pokemon);
    this._router.navigate(['/edit']);
  }

  mapFormToIcon(form: string): string {
    switch (form) {
      case 'shiny':
        return 'grade';
      case 'normal':
        return 'favorite';
      case 'universal':
        return 'public';
      case 'regional':
        return 'pets';
      default:
        return '';
    }
  }

  private createConfirmDialog(pokemon: Pokemon): ConfirmDialog {
    return new ConfirmDialog(
      'Delete Pokemon',
      'Are you sure you want to delete pokemon: ' + pokemon.name + '?',
      (confirmation: boolean) => {
        if (confirmation) {
          this.deletePokemon(pokemon)
        }
      }
    );
  }

  private deletePokemon(pokemon: Pokemon) {
    this._poketrackerApi.deletePokemon(pokemon).subscribe({
      next: () => {
        this.loadPokemonTable()
      },
    });
    this._snackbarService.message = "Pokemon '" + pokemon.dex + "' deleted";
    this._snackbarService.colorClass = "snackbar-success"
    this._snackbarService.show();
  }
}
