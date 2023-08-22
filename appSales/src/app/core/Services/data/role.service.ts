import {Injectable} from '@angular/core';
import {IRole} from "@core/data/interfaces/iRole";
import {Observable} from "rxjs";
import {MRole} from "@core/data/models/Role";
import {environment} from "@env/environment.development";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class RoleService implements IRole {
  private readonly url: string = `${environment.urlApi}/Role`;

  constructor(private http: HttpClient) {
  }

  create(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }

  get(id: string): Observable<MRole> {
    return this.http.get<MRole>(`${this.url}/${id}`);
  }

  read(): Observable<MRole[]> {
    return this.http.get<MRole[]>(this.url);
  }

  update(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }
}
