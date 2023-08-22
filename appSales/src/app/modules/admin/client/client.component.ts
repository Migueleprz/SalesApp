import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LabelsClient, LabelsGneric} from "@core/common/labels";
import {ClientService} from "@core/Services/data/client.service";
import {MatTableDataSource} from "@angular/material/table";
import {MClient} from "@core/data/models/Client";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AlertService} from "@core/Services/utils/alert.service";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  frg: FormGroup;
  label = LabelsClient;
  labelg = LabelsGneric;
  newClient: boolean = true;
  showForm: boolean = false;
  title: string = "Listado de Clientes";
  labelButton: string = "Agregar Cliente";

  displayedColumns: string[] = ['dni', 'names', 'phone', 'dir', 'id'];
  dataSource: MatTableDataSource<MClient>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private frb: FormBuilder,
    private serviceClient: ClientService,
    private alert: AlertService
  ) {
    this.configForm();
    this.read();
  }

  configForm(): void {
    this.frg = this.frb.group({
      id: 0,
      names: ['', Validators.required],
      lastNames: ['', Validators.required],
      dni: ['', Validators.required],
      dir: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  read(): void {
    this.serviceClient.read().subscribe({
      next: (client) => {
        console.log(client)
        this.dataSource = new MatTableDataSource(client);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err.error)
      }
    })
  }

  save(): void {
    //console.log(this.frg.value); return;
    this.serviceClient.create(this.frg.value).subscribe({
      next: () => {
        let cliente = this.frg.get('names')?.value + ' ' + this.frg.get('lastNames')?.value
        this.alert.message(cliente, 'Datos Actualizados', 'success').then(r => r);
        this.read();
        this.cancel();
        this.showForm = !this.showForm;
      }
    });
  }

  get(id: string): void {
    this.serviceClient.get(id).subscribe({
      next: ({id,dni,dir,lastNames,names,phone}) => {
        this.showForm = !this.showForm;
        this.newClient = false;
        this.frg.patchValue({
          id: id,
          names: names,
          lastNames: lastNames,
          dni: dni,
          dir: dir,
          phone: phone,
        })
      }
    });
  }

  update(): void {
    this.serviceClient.update(this.frg.value).subscribe({
      next: (resp) => {
        let cliente = this.frg.get('names')?.value + ' ' + this.frg.get('lastNames')?.value
        this.alert.message(cliente, 'Datos Actualizados', 'success').then(r => r);
        this.read();
        this.cancel();
        this.showForm = !this.showForm;
      }
    });
  }

  async delete(id: string) {
    const confirm = await this.alert.confirm('¿Desea Eliminar el Cliente?', 'question');
    if (confirm) {
      this.serviceClient.delete(id).subscribe({
        next: (resp) => {
          this.read();
        }
      });
    }
  }

  cancel(): void {
    this.newClient = true;
    this.frg.reset();
  }

  handleTitle(): void {
    this.showForm = !this.showForm;
    if (this.showForm) {
      this.labelButton = "Listado de Clientes";
      this.title = "Agregar Cliente";
    } else {
      this.labelButton = "Agregar Cliente";
      this.title = "Listado de Clientes";
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
