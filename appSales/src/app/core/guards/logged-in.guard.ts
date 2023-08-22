import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {StorageLocalService} from "@core/Services/auth/storage-local.service";


export const loggedInGuard: CanActivateFn = (route, state) => {
  const storageService: StorageLocalService = inject(StorageLocalService);
  const router: Router = inject(Router);

  let logged: string | null = localStorage.getItem('logged');
  if (logged !== null) {
   return true;
  }else{
    router.navigate(['']).then(r => r);
    return false;
  }



};
