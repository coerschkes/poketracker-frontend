import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {environment} from "../../environments/environment";
import {MatCardAvatar, MatCardHeader, MatCardImage, MatCardSubtitle, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'toolbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatCardAvatar,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  protected readonly environment = environment;
}
