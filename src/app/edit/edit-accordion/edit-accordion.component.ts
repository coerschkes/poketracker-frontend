import {Component, Input, WritableSignal} from '@angular/core';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {Pokemon} from "../../core/external/poketracker/poketracker-api";
import {ResponsiveConfigurationService} from "../../shared/responsive-configuration.service";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatChipRemove, MatChipRow} from "@angular/material/chips";
import {EditStateService} from "../edit-state.service";
import {EditionSelectorComponent} from "../../shared/edition-selector/edition-selector.component";

@Component({
  selector: 'app-edit-accordion',
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatCheckbox,
    MatChipRemove,
    MatChipRow,
    EditionSelectorComponent
  ],
  templateUrl: './edit-accordion.component.html',
  styleUrl: './edit-accordion.component.scss'
})
export class EditAccordionComponent {
  @Input() pokemon!: WritableSignal<Pokemon | undefined>;

  constructor(protected _responsive: ResponsiveConfigurationService, protected _stateService: EditStateService) {
  }
}
