import {CanActivateFn, Router} from '@angular/router';
import {StorageLocalService} from "@core/Services/auth/storage-local.service";
import {inject} from "@angular/core";
import {RoleService} from "@core/Services/auth/role.service";

export const loggedOutGuard: CanActivateFn = (route, state) => {
  const storageService: StorageLocalService = inject(StorageLocalService);
  const router: Router = inject(Router);
  const rol: RoleService = inject(RoleService);
  let logged: string | null = localStorage.getItem('logged');
  if(logged !== null){
   return rol.role();
  }else{
    return true;
  }


};
