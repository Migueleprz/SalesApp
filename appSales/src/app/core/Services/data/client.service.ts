import {Injectable} from '@angular/core';
import {environment} from "@env/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MClient} from "@core/data/models/Client";
import {IClient} from "@core/data/interfaces/iClient";

@Injectable({
  providedIn: 'root'
})
export class ClientService implements IClient{
 private readonly url: string = `${environment.urlApi}/Client`;

  constructor(private http: HttpClient) {
  }

  getByDni(dni: string): Observable<MClient> {
    return this.http.get<MClient>(`${this.url}/by/${dni}`);
    }

  read(): Observable<MClient[]> {
    return this.http.get<MClient[]>(this.url);
  }
  create(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }
  get(id:string): Observable<MClient> {
    return this.http.get<MClient>(`${this.url}/${id}`);
  }
  update(data: FormData): Observable<boolean> {
    return this.http.put<boolean>(this.url, data);
  }
  delete(id:string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }

}
