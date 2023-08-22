import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@env/environment.development";
import {AuthAuser} from "@core/data/models/authAuser";
import {StorageLocalService} from "@core/Services/auth/storage-local.service";
import {Router} from "@angular/router";
import {RoleService} from "@core/Services/auth/role.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly url: string = `${environment.urlApi}/Auth/login`;

  constructor(
    private http: HttpClient,
    private storageLocal: StorageLocalService,
    private router: Router,
    private role: RoleService
  ) {
  }

  login(data: FormData) {
    this.http.post<AuthAuser>(this.url, data).subscribe({
      next: (n) => {
        this.storageLocal.setDataUsetLocalStorage(n);
        this.role.role();
      }
    });
  }
}
