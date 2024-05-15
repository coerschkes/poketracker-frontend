import { Component } from '@angular/core';
import {ToolbarComponent} from "../toolbar/toolbar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ToolbarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
