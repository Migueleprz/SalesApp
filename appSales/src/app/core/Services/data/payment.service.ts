import {Injectable} from '@angular/core';
import {environment} from "@env/environment.development";
import {HttpClient} from "@angular/common/http";
import {IPayment} from "@core/data/interfaces/iPayment";
import {Observable} from "rxjs";
import {MPayment} from "@core/data/models/Payment";
import {MPaymentSaleClient} from "@core/data/models/PaymentSaleClient";
import {MSaleDetail} from "@core/data/models/SaleDetail";

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements IPayment {
  private readonly url: string = `${environment.urlApi}/Payment`;

  constructor(private http: HttpClient) {
  }

  create(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }

  get(id: string): Observable<MPayment> {
    return this.http.get<MPayment>(`${this.url}/${id}`);
  }

  getAll(): Observable<MPaymentSaleClient[]> {
    return this.http.get<MPaymentSaleClient[]>(this.url);
  }

  read(): Observable<MPayment[]> {
    return this.http.get<MPayment[]>(this.url);
  }

  update(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }
}
