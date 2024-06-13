import {Component} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {environment} from "../../environments/environment";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AuthStateService} from "../core/auth/auth-state.service";
import {ResponsiveConfigurationService} from "../shared/responsive-configuration.service";

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
    RouterOutlet,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  protected readonly appName = environment.APP_NAME;

  protected mobileQuery: MediaQueryList;

  constructor(media: MediaMatcher, private authState: AuthStateService, protected responsiveConfigurationService: ResponsiveConfigurationService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  protected readonly environment = environment;

  logout() {
    this.authState.invalidate()
  }
}
