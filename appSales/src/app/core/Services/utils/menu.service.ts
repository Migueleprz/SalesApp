import { Injectable } from '@angular/core';
import {StorageLocalService} from "@core/Services/auth/storage-local.service";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private storageLocal:StorageLocalService) { }


}
