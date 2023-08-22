import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {loggedInGuard} from "@core/guards/logged-in.guard";
import {loggedOutGuard} from "@core/guards/logged-out.guard";
import {roleGuard} from "@core/guards/role.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [loggedOutGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [loggedInGuard, roleGuard]
  },
  {
    path: 'seller',
    loadChildren: () => import('./modules/seller/seller.module').then(m => m.SellerModule),
    canActivate: [loggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
