import {Component} from '@angular/core';
import {SaleDetailService} from "@core/Services/data/sale-detail.service";
import {ProductService} from "@core/Services/data/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PriceType} from "@core/common/priceType";
import {ActivatedRoute} from "@angular/router";
import {MSaleDetailProduct} from "@core/data/models/SaleDetailProduct";
import {MProduct} from "@core/data/models/Product";
import {AlertService} from "@core/Services/utils/alert.service";

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent {
  selectPrice: string;
  priceType = PriceType;
  frmg: FormGroup;
  frmgPay: FormGroup;
  code: string;
  unit_Price: number;
  whs_Price: number;
  sale_id: any;
  baseprice: number;
  amaunt: number;
  value: number;
  ventaDetalle: MSaleDetailProduct[] = [];
  total: number = 0;
  cash: number = 0;
  discount: number = 0;
  price_pay: number = 0;
  turned: number = 0;


  constructor(
    private _saleD: SaleDetailService,
    private _serviceProduct: ProductService,
    private frb: FormBuilder,
    private route: ActivatedRoute,
    private _alert: AlertService
  ) {
    this.sale_id = route.snapshot.paramMap.get('id');
    this.configForm();
    //this.configFormPay();
    this.read()
  }

  configForm(): void {
    this.frmg = this.frb.group({
      id: 0,
      Sale_id: this.sale_id,
      Product_id: 0,
      Base_price: 0,
      Amount: 0,
      Value: 0
    })
  }

  configFormPay(): void {
    this.frmgPay = this.frb.group({
      Sale_id: this.sale_id,
      Date_pay: ['', Validators.required],
      Sale_value: [this.value, Validators.required],
      Cash: [this.cash, Validators.required],
      Discount: [this.discount, Validators.required],
      Price_pay: [this.price_pay, Validators.required],
      Turned: [this.turned, Validators.required],
    })
  }

  getProduct(code: string): void {
    this._serviceProduct.getByCode(code).subscribe({
      next: (product) => {
        this.operations(product);
      }
    })
  }

  read(): void {
    this._saleD.readBySaleId(this.sale_id).subscribe({
      next: (n) => {
        this.ventaDetalle = n;
        this.calcTotal();
      }
    });
  }

  private operations(product: MProduct): void {
    this.unit_Price = product.unit_Price;
    this.whs_Price = product.whs_Price;
    if (this.selectPrice === 'unit_Price') {
      this.baseprice = this.unit_Price;
      this.value = this.amaunt * this.baseprice;
    } else {
      this.baseprice = this.whs_Price;
      this.value = this.amaunt * this.baseprice;
    }
    this.frmg.patchValue({
      Product_id: product.id,
      Base_price: this.baseprice,
      Amount: this.amaunt,
      Value: this.value
    });
    this.addProduct();
  }

  private addProduct(): void {
    this._saleD.create(this.frmg.value).subscribe({
      next: () => {
        this.read();
      }
    })
  }

  async deleteProdu(id: string, product: string, product_id: string, amount: string) {
    let confirm = await this._alert.confirm(`¿Desea eliminar ${product} de la lista?`, "question")
    if (confirm) {
      this._saleD.deleteItem(id, product_id, amount).subscribe({
        next: () => {
          this.read();
        }
      })
    }
  }

  private calcTotal(): void {
    this.total = 0;
    this.ventaDetalle.forEach((item) => {
      this.total += Number(item.value);
    })
  }

   calcPricePay(): void {
    const disc: number = this.discount / 100;
    this.price_pay = this.total - (this.total * disc);
    this.turned = this.total - this.price_pay;
     this.frmgPay = this.frb.group({
       Sale_id: this.sale_id,
       Date_pay: '',
       Sale_value: this.total,
       Cash: this.cash,
       Discount: this.discount,
       Price_pay: this.price_pay,
       Turned: this.turned,
     })
  }
  pay():void{
    console.log(this.frmgPay.value)
  }
}
