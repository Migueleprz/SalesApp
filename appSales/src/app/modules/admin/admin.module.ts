import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {MainComponent} from './main/main.component';
import {HomeComponent} from './home/home.component';
import {LayoutsModule} from "../../shared/layouts/layouts.module";
import {ClientComponent} from './client/client.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ClientService} from "@core/Services/data/client.service";
import {HttpAuthInterceptor} from "@core/interceptor/http-auth.interceptor";
import {ComponentsModule} from "@shared/components/components.module";
import {MaterialModule} from "@shared/material/material.module";
import {AlertService} from "@core/Services/utils/alert.service";
import {ProductComponent} from './product/product.component';
import {UserComponent} from './user/user.component';
import {HistorySalesComponent} from './history-sales/history-sales.component';
import {SaleComponent} from './sale/sale.component';
import {ProductService} from "@core/Services/data/product.service";
import {SaleDetailService} from "@core/Services/data/sale-detail.service";
import {RoleService} from "@core/Services/auth/role.service";
import {UserService} from "@core/Services/data/user.service";
import {SaleService} from "@core/Services/data/sale.service";
import {SaleDetailComponent} from './sale-detail/sale-detail.component';
import {PaymentService} from "@core/Services/data/payment.service";


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ClientComponent,
    ProductComponent,
    UserComponent,
    HistorySalesComponent,
    SaleComponent,
    SaleDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true
    },
    ClientService,
    ProductService,
    SaleService,
    SaleDetailService,
    RoleService,
    UserService,
    PaymentService,
    AlertService,
  ]
})
export class AdminModule {
}
