import {ICrud} from "@core/data/interfaces/iCrud";
import {Observable} from "rxjs";
import {MRole} from "@core/data/models/Role";

export interface IRole extends ICrud {
  get(id: string): Observable<MRole>;
}
