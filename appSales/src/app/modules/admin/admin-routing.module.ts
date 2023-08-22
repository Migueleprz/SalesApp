import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {HomeComponent} from "./home/home.component";
import {ClientComponent} from "@modules/admin/client/client.component";
import {ProductComponent} from "@modules/admin/product/product.component";
import {UserComponent} from "@modules/admin/user/user.component";
import {HistorySalesComponent} from "@modules/admin/history-sales/history-sales.component";
import {SaleComponent} from "@modules/admin/sale/sale.component";
import {SaleDetailComponent} from "@modules/admin/sale-detail/sale-detail.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data:{title:'Panel principal', icon:'fa-solid fa-chart-simple'}
      },
      {
        path: 'clients',
        component: ClientComponent,
        data:{title:'Administrar Clientes', icon:'fa-solid fa-users'}
      },
      {
        path: 'products',
        component: ProductComponent,
        data:{title:'Administrar Productos', icon:'fa-solid fa-box'}
      },
      {
        path: 'users',
        component: UserComponent,
        data:{title:'Administrar Usuarios', icon:'fa-solid fa-user-circle'}
      },
      {
        path: 'sale',
        component: SaleComponent,
        data:{title:'Venta de Productos', icon:'fa-solid fa-cash-register'}
      },
      {
        path: 'sale/:id/:code/:client',
        component: SaleDetailComponent,
        data:{title:'Detalle de venta', icon:'fa-solid fa-cash-register'}
      },
      {
        path: 'sales',
        component: HistorySalesComponent,
        data:{title:'Historial de Ventas', icon:'fa-solid fa-wallet'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
