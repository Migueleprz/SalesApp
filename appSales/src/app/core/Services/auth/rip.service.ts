import {Injectable} from '@angular/core';
import * as crypto from "crypto-js";
import {ICrypto} from "../../data/interfaces/iCrypto";

@Injectable({
  providedIn: 'root'
})
export class RipService implements ICrypto {
  readonly code: string = "";
  public riper(key: string): string {
    return crypto.AES.encrypt(key, this.code).toString();
  }
  public unriper(key: string): string {
    return crypto.AES.decrypt(key, this.code).toString(crypto.enc.Utf8);
  }


}
