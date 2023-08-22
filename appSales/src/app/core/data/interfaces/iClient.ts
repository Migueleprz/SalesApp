import {ICrud} from "@core/data/interfaces/iCrud";
import {Observable} from "rxjs";
import {MClient} from "@core/data/models/Client";

export interface IClient extends ICrud {
  get(id: string): Observable<MClient>

  getByDni(dni: string): Observable<MClient>
}
