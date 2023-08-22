import {Injectable} from '@angular/core';
import {environment} from "@env/environment.development";
import {HttpClient} from "@angular/common/http";
import {ISale} from "@core/data/interfaces/iSale";
import {Observable} from "rxjs";
import {MSale} from "@core/data/models/Sale";

@Injectable({
  providedIn: 'root'
})
export class SaleService implements ISale {

  private readonly url: string = `${environment.urlApi}/Sales`;

  constructor(private http: HttpClient) {
  }

  getToday(): Observable<MSale[]> {
    return this.http.get<MSale[]>(`${this.url}/today`);
    }

  create(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }

  get(id: string): Observable<MSale> {
    return this.http.get<MSale>(`${this.url}/${id}`);
  }

  read(): Observable<MSale[]> {
    return this.http.get<MSale[]>(`${this.url}`);
  }

  update(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }
  save(data: FormData): Observable<MSale> {
    return this.http.post<MSale>(this.url, data);
  }
}
