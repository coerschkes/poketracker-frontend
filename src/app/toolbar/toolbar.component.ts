import {Component, effect, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatListItem, MatNavList} from "@angular/material/list";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {environment} from "../../environments/environment";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AuthStateService} from "../core/auth/auth-state.service";
import {ResponsiveConfigurationService} from "../shared/responsive-configuration.service";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-toolbar',
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
    MatMenuItem,
    MatSlideToggle,
    NgStyle,
    MatFabButton,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
// todo: rename to toolbar
export class ToolbarComponent {
  protected readonly appName = environment.APP_NAME;
  protected readonly environment = environment;

  @ViewChild("container", {read: ElementRef}) private container: ElementRef;

  constructor(private authState: AuthStateService,
              protected responsive: ResponsiveConfigurationService,
              private renderer: Renderer2) {
    effect(() => {
      this.updateMenuStyling()
    });
  }

  get theme(): string {
    return this.responsive.isDarkMode() ? 'dark-themed' : 'light-themed';
  }

  logout() {
    this.authState.invalidate()
  }

  updateMenuStyling() {
    if (this.container.nativeElement.querySelector('#menu-styling') != null) {
      this.renderer.removeChild(this.container.nativeElement, this.container.nativeElement.querySelector('#menu-styling'));
    }
    let style = this.renderer.createElement('style');
    style.id = 'menu-styling';
    let text = this.renderer.createText(this.getMenuStyling());
    this.renderer.appendChild(style, text);
    this.renderer.appendChild(this.container.nativeElement, style);
  }

  getMenuStyling(): string {
    return '.mat-mdc-menu-panel{--mat-menu-container-color: transparent; --mat-menu-container-shape: 20px;} ' +
      (this.responsive.isDarkMode() ?
        '.mat-mdc-menu-content{border-radius: 20px;background-color: #283041;}' :
        '.mat-mdc-menu-content{border-radius: 20px;background-color: white;}');
  }
}
