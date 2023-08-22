import {inject} from "@angular/core";
import {StorageLocalService} from "@core/Services/auth/storage-local.service";

const MenuAdmin = [
  {url:'', label:'Inicio', icon:'nav-icon fa-solid fa-home'},
  {url:'sale', label:'Vender', icon:'nav-icon fa-solid fa-cash-register'},
  {url:'sales', label:'Historial de Ventas', icon:'nav-icon fa-solid fa-wallet'},
  {url:'clients', label:'Clientes', icon:'nav-icon fa-solid fa-users'},
  {url:'products', label:'Productos', icon:'nav-icon fa-solid fa-box'},
  {url:'users', label:'Usuarios', icon:'nav-icon fa-solid fa-user-circle'},
  {url:'roles', label:'Roles', icon:'nav-icon fa-solid fa-wand-magic-sparkles'},
];
 const MenuSeller = [
  {url:'', label:'Inicio', icon:'nav-icon fa-solid fa-home'},
  {url:'sales', label:'Ventas', icon:'nav-icon fa-solid fa-money'},
];

export const menuApp = ()=>{
 const storageLocal:StorageLocalService = inject(StorageLocalService);
  let rol: string | null = localStorage.getItem('rol');
  if(rol){
    let role_id = Number(storageLocal.getItemLocalStorage(rol));
    if (role_id === 1){
      return MenuAdmin;
    }else {
      return MenuSeller
    }
  }else{
    return [];
  }
}
