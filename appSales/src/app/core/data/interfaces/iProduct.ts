import {ICrud} from "@core/data/interfaces/iCrud";
import {Observable} from "rxjs";
import {MProduct} from "@core/data/models/Product";

export interface IProduct extends ICrud {
  get(id: string): Observable<MProduct>;

  getByCode(code: string): Observable<MProduct>;
}
