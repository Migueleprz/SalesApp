import {Observable} from "rxjs";
import {MSale} from "@core/data/models/Sale";
import {ICrud} from "@core/data/interfaces/iCrud";

export interface ISale extends ICrud {
  get(id: string): Observable<MSale>;

  getToday(): Observable<MSale[]>;
  save(data: FormData): Observable<MSale>;
}
