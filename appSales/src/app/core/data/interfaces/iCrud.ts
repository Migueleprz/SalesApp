import {Observable} from "rxjs";


export interface ICrud {
  read(): Observable<any[]>;

  create(data: FormData): Observable<boolean>;

  update(data: FormData): Observable<boolean>

  delete(id: string): Observable<boolean>
}
