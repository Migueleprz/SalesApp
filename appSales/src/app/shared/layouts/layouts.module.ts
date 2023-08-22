import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { ContentHeaderComponent } from './content-header/content-header.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    MainHeaderComponent,
    MainSidebarComponent,
    MainFooterComponent,
    ContentHeaderComponent
  ],
  exports: [
    MainHeaderComponent,
    MainSidebarComponent,
    MainFooterComponent,
    ContentHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutsModule { }
