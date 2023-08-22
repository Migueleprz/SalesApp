import {Component, ViewChild} from '@angular/core';
import {ProductService} from "@core/Services/data/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "@core/Services/utils/alert.service";
import {LabelProducts, LabelsClient, LabelsGneric} from "@core/common/labels";
import {MatTableDataSource} from "@angular/material/table";
import {MProduct} from "@core/data/models/Product";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  frg: FormGroup;
  newProduct: boolean = true;
  labelg = LabelsGneric;
  labelp = LabelProducts;
  showForm: boolean = false;
  title: string = "Listado de Productos";
  labelButton: string = "Agregar Producto";

  displayedColumns: string[] = ['code', 'name', 'stock', 'unit', 'whs', 'purch', 'id'];
  dataSource: MatTableDataSource<MProduct>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private serviceProduct: ProductService,
    private frb: FormBuilder,
    private alert: AlertService
  ) {
    this.configForm();
    this.read();
  }

  configForm(): void {
    this.frg = this.frb.group({
      id: 0,
      code: ['', Validators.required],
      name: ['', Validators.required],
      stock: ['', Validators.required],
      unit_price: ['', Validators.required],
      whs_price: ['', Validators.required],
      purch_price: ['', Validators.required],
    })
  }

  read(): void {
    this.serviceProduct.read().subscribe({
      next: (product) => {
        this.dataSource = new MatTableDataSource(product);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err.error)
      }
    })
  }

  save(): void {
    this.serviceProduct.create(this.frg.value).subscribe({
      next: () => {
        this.alert.message(this.frg.get('name')?.value, 'Datos Registrados', 'success').then(r => r);
        this.read();
        this.cancel();
        this.showForm = !this.showForm;
      }
    });
  }

  get(id: string): void {
    this.serviceProduct.get(id).subscribe({
      next: ({id, name, code, stock, whs_Price, unit_Price, purch_Price}) => {
        this.showForm = !this.showForm;
        this.newProduct = false;
        this.frg.patchValue({
          id: id,
          code: code,
          name: name,
          stock: stock,
          unit_price: unit_Price,
          whs_price: whs_Price,
          purch_price: purch_Price,
        })
      }
    });
  }

  update(): void {
    this.serviceProduct.update(this.frg.value).subscribe({
      next: () => {
        this.alert.message(this.frg.get('name')?.value, 'Datos Actualizados', 'success').then(r => r);
        this.read();
        this.cancel();
        this.showForm = !this.showForm;
      }
    });
  }

  async delete(id: string): Promise<void> {
    const confirm = await this.alert.confirm('¿Desea Eliminar Producto?', 'question');
    if (confirm) {
      this.serviceProduct.delete(id).subscribe({
        next: () => {
          this.read();
        }
      });
    }
  }

  cancel(): void {
    this.newProduct = true;
    this.frg.reset();
  }

  handleTitle(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.labelButton = "Listado de Productos";
      this.title = "Agregar Producto";
    } else {
      this.labelButton = "Agregar Producto";
      this.title = "Listado de CProducto";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
