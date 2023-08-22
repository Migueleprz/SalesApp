import {CanActivateFn, Router} from '@angular/router';
import {StorageLocalService} from "@core/Services/auth/storage-local.service";
import {inject} from "@angular/core";

export const roleGuard: CanActivateFn = (route, state) => {
  const storageService: StorageLocalService = inject(StorageLocalService);
  const router: Router = inject(Router);
  let rol: string | null = localStorage.getItem('rol');
  if(rol){
    let role_id = Number(storageService.getItemLocalStorage(rol));
    if(role_id === 2){
      router.navigate(['seller']).then(r => r);
      return false;
    }else{
     // router.navigate(['admin']).then(r => r);
      return true;
    }
  }
  return true;
};
