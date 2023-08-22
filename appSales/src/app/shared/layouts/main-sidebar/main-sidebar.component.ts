import { Component } from '@angular/core';
import {menuApp} from "@core/common/menu";

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss']
})
export class MainSidebarComponent {
  appName:string = "SalesApp";
  menu = menuApp();
}
