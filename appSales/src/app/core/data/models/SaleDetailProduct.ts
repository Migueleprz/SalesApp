import {MSaleDetail} from "@core/data/models/SaleDetail";

export interface MSaleDetailProduct extends MSaleDetail {
  product: string;
}
