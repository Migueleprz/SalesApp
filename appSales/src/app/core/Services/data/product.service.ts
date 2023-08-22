import {Injectable} from '@angular/core';
import {environment} from "@env/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IProduct} from "@core/data/interfaces/iProduct";
import {MProduct} from "@core/data/models/Product";



@Injectable({
  providedIn: 'root'
})
export class ProductService implements IProduct {
  private readonly url: string = `${environment.urlApi}/Product`;

  constructor(private http: HttpClient) {
  }

  getByCode(code: string): Observable<MProduct> {
    return this.http.get<MProduct>(`${this.url}/by/${code}`);
    }

  read(): Observable<MProduct[]> {
    return this.http.get<MProduct[]>(this.url);
  }

  create(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }

  get(id: string): Observable<MProduct> {
    return this.http.get<MProduct>(`${this.url}/${id}`);
  }

  update(data: FormData): Observable<boolean> {
    return this.http.put<boolean>(this.url, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }
}
