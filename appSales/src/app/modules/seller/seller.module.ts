import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import {LayoutsModule} from "../../shared/layouts/layouts.module";


@NgModule({
  declarations: [
    HomeComponent,
    MainComponent
  ],
    imports: [
        CommonModule,
        SellerRoutingModule,
        LayoutsModule
    ]
})
export class SellerModule { }
