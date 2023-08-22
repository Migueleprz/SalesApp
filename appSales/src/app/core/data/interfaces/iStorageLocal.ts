import {AuthAuser} from "../models/authAuser";

export interface IStorageLocal {
  setDataUsetLocalStorage(userAUth: AuthAuser): void;
  setItemLocalStorage(data: any, item: string): any;
  getItemLocalStorage(data: any): any
}
