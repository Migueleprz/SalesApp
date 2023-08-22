import {Component, ViewChild} from '@angular/core';
import {SaleService} from "@core/Services/data/sale.service";
import {ClientService} from "@core/Services/data/client.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "@core/Services/utils/alert.service";
import {LabelProducts, LabelsGneric} from "@core/common/labels";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MSale} from "@core/data/models/Sale";
import {DatePipe} from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
  providers: [DatePipe]
})
export class SaleComponent {
  frg: FormGroup;
  newSale: boolean = true;
  labelg = LabelsGneric;
  showForm: boolean = false;
  title: string = "Listado de Ventas de Hoy";
  labelButton: string = "Nueva Venta";
  clientName: string;
  toDay: string | null = Date.now().toString();
  dni: string;

  displayedColumns: string[] = ['date', 'code', 'dni', 'client', 'value', 'id'];
  dataSource: MatTableDataSource<MSale>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _serviceSale: SaleService,
    private _serviceClient: ClientService,
    private _frb: FormBuilder,
    private _alert: AlertService,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.configForm();
    this.read();


  }

  configForm(): void {
    this.frg = this._frb.group({
      id: 0,
      code: ['', Validators.required],
      client_id: ['', Validators.required],
      date_sale: this.datePipe.transform(this.toDay, 'yyyy-MM-dd h:mm:ss'),
      value_sale: 0,
    })
  }

  getClient(): void {
    this._serviceClient.getByDni(this.dni).subscribe({
      next: (client) => {
        if (client == null) {
          this._alert.message('Registre el cliente antes de continuar con la venta', 'No Registrado', 'error');
          return;
        }
        this.frg.patchValue({client_id: client.id});
        this.clientName = client.names + ' ' + client.lastNames;
      }, error: () => {
      }
    });
  }

  read(): void {
    this._serviceSale.getToday().subscribe({
      next: (sales) => {
        console.log(sales)
        this.dataSource = new MatTableDataSource(sales);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  save(): void {
    console.log(this.frg.value)
    this._serviceSale.save(this.frg.value).subscribe({
      next: ({id, code, client_id}) => {
        this.router.navigate([`admin/sale/${id}/${code}/${client_id}`]);
      }
    })
  }

  get(id: string): void {
    this._serviceSale.get(id).subscribe({
      next: ({id, code, value_sale, client_id, date_Sale}) => {
        this.frg.patchValue({
          id: id,
          code: code,
          client_id: client_id,
          date_sale: date_Sale,
          value_sale: value_sale
        })
      }
    })
  }

  update(): void {
    this._serviceSale.update(this.frg.value).subscribe({
      next: () => {
        this.read();
      }
    })
  }

  async delete(id: string): Promise<void> {
    const confirm = await this._alert.confirm('¿Desea Eliminar la Venta?', 'question');
    if (confirm) {
      this._serviceSale.delete(id).subscribe({
        next: () => {
          this.read();
        }
      });
    }
  }

  linkSaleDetails(id: string, code: string, client_id: string) {
    this.router.navigate([`admin/sale/${id}/${code}/${client_id}`]);
  }

  cancel(): void {
    this.newSale = true;
    this.frg.reset();
  }

  handleTitle(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.labelButton = "Listado de Ventas de Hoy";
      this.title = "Nueva Venta";
    } else {
      this.labelButton = "Nueva Venta";
      this.title = "Listado de Ventas de Hoy";
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  protected readonly LabelProducts = LabelProducts;
}
