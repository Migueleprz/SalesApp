import {Injectable} from '@angular/core';
import {environment} from "@env/environment.development";
import {HttpClient} from "@angular/common/http";
import {ISaleDetail} from "@core/data/interfaces/iSaleDetail";
import {Observable} from "rxjs";
import {MSaleDetail} from "@core/data/models/SaleDetail";
import {MSaleDetailProduct} from "@core/data/models/SaleDetailProduct";
@Injectable({
  providedIn: 'root'
})
export class SaleDetailService implements ISaleDetail {

  private readonly url: string = `${environment.urlApi}/SaleDetail`;

  constructor(private http: HttpClient) {
  }

  create(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }

  get(id: string): Observable<MSaleDetail> {
    return this.http.get<MSaleDetail>(`${this.url}/${id}`);
  }

  read(): Observable<MSaleDetail[]> {
    return this.http.get<MSaleDetail[]>(this.url);
  }

  update(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }

  deleteItem(id: string, productId: string, amount: string): Observable<any> {
    return this.http.delete<boolean>(`${this.url}/${id}/${productId}/${amount}`);
  }

  readBySaleId(id: string): Observable<MSaleDetailProduct[]> {
    return this.http.get<MSaleDetailProduct[]>(`${this.url}/bySale/${id}`);
  }
}
