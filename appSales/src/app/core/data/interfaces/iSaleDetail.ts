import {ICrud} from "@core/data/interfaces/iCrud";
import {Observable} from "rxjs";
import {MSaleDetail} from "@core/data/models/SaleDetail";

export interface ISaleDetail extends ICrud {
  get(id: string): Observable<MSaleDetail>;
  deleteItem(id:string, productId:string, amount:string):Observable<any>;
}
