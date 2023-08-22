import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageLocalService} from "@core/Services/auth/storage-local.service";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  private rst: HttpRequest<any>;

  constructor(private storageLocal: StorageLocalService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const $token: string | null = localStorage.getItem('token');
    if ($token) {
      const _token: string = this.storageLocal.getItemLocalStorage($token);
      this.rst = request.clone({
        setHeaders: {
          Accept: 'application/json',
          ContentType: ['application/json', 'application/x-www-form-urlencoded'],
          Authorization: `Bearer ${_token}`
        }
      });
      return next.handle(this.rst);
    } else {
      return next.handle(request);
    }

  }
}
