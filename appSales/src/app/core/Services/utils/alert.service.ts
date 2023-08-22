import {Injectable} from '@angular/core';
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {
  }

  public message = (msg: string, title: string, icon: any) => new Promise(() => {
    swal.fire({
      icon: icon,
      title: title,
      html: `<span class="text-capitalize h2">${msg}</span>`,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      showClass: {
        popup: 'animate__animated animate__bounceIn'
      },
      hideClass: {
        popup: 'animate__animated animate__bounceOut'
      }
    })
  });

public confirm(msg: string, icon: any): Promise<any> {
    return new Promise(resolve => {
      swal.fire({
        icon: icon,
        text: msg,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#c1121fff',
        cancelButtonColor: '#003049ff',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        buttonsStyling: true,
        customClass: {
          confirmButton: 'btn',
          cancelButton: 'btn',
        },
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        hideClass: {
          popup: 'animate__animated animate__bounceOut'
        }
      }).then((result) => {
        resolve(result.isConfirmed);
      })
    });
  }
}
