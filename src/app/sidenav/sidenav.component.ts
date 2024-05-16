import {Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavContent,
    MatToolbar,
    MatIconButton,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListItem,
    RouterLink,
    MatIcon,
    RouterOutlet
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  protected readonly appName = environment.APP_NAME;

  protected mobileQuery: MediaQueryList;

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  protected readonly environment = environment;
}
