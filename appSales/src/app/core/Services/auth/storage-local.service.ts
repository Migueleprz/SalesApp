import {Injectable} from '@angular/core';
import {ICrypto} from "../../data/interfaces/iCrypto";
import {AuthAuser} from "../../data/models/authAuser";
import {IStorageLocal} from "../../data/interfaces/iStorageLocal";
import {RipService} from "@core/Services/auth/rip.service";

@Injectable({
  providedIn: 'root'
})
export class StorageLocalService implements IStorageLocal {
  constructor(private rip: RipService) {
  }

  setDataUsetLocalStorage(userAUth: AuthAuser): void {
    localStorage.setItem('logged', this.rip.riper('true'));
    localStorage.setItem('id', this.rip.riper(`${userAUth.id}`));
    localStorage.setItem('token', this.rip.riper(userAUth.token.toString()));
    localStorage.setItem('userName', this.rip.riper(userAUth.names.toString()));
    localStorage.setItem('userLastName', this.rip.riper(userAUth.lastnames));
    localStorage.setItem('email', this.rip.riper(userAUth.email));
    localStorage.setItem('rol', this.rip.riper(userAUth.role_id.toString()));
  }

  setItemLocalStorage(data: any, item: string): any {
    return localStorage.setItem(item, this.rip.riper(data));
  }

  getItemLocalStorage(data: any): any {
    return this.rip.unriper(data);
  }

}
