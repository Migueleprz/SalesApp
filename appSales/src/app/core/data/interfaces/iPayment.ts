import {ICrud} from "@core/data/interfaces/iCrud";
import {Observable} from "rxjs";
import {MPayment} from "@core/data/models/Payment";
import {MPaymentSaleClient} from "@core/data/models/PaymentSaleClient";

export interface IPayment extends ICrud {
  get(id: string): Observable<MPayment>;
  getAll(): Observable<MPaymentSaleClient[]>;
}
