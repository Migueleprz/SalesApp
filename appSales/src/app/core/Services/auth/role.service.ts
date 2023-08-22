import {Injectable} from '@angular/core';
import {StorageLocalService} from "@core/Services/auth/storage-local.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private storageLocal: StorageLocalService, private router: Router) {
  }

  role(): boolean {
    let rol: string | null = localStorage.getItem('rol');
    let rol_id = Number(this.storageLocal.getItemLocalStorage(rol));
    if (rol_id === 1) {
      this.router.navigate(['admin']).then(r => r);
      return false;
    } else{
      this.router.navigate(['seller']).then(r => r);
      return false;
    }
  }
}
