import { Injectable } from '@angular/core';
import {environment} from "@env/environment.development";
import {HttpClient} from "@angular/common/http";
import {IUser} from "@core/data/interfaces/iUser";
import {Observable} from "rxjs";
import {MUser} from "@core/data/models/User";
@Injectable({
  providedIn: 'root'
})
export class UserService implements IUser{

  private readonly url: string = `${environment.urlApi}/User`;

  constructor(private http: HttpClient) {
  }

  create(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${id}`);
  }

  get(id: string): Observable<MUser> {
    return this.http.get<MUser>(`${this.url}/${id}`);
  }

  read(): Observable<MUser[]> {
    return this.http.get<MUser[]>(this.url);
  }

  update(data: FormData): Observable<boolean> {
    return this.http.post<boolean>(this.url, data);
  }
}
