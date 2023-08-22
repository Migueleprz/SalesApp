import {ICrud} from "@core/data/interfaces/iCrud";
import {Observable} from "rxjs";
import {MUser} from "@core/data/models/User";

export interface IUser extends ICrud {
  get(id: string): Observable<MUser>;
}
