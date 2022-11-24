import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ServiceOrder } from "src/app/models/ServiceOrder";
import { ClientService } from "src/app/services/client.service";
import { ServiceOrderService } from "src/app/services/service-order.service";
import { TechnicianService } from "src/app/services/technician.service";

@Component({
  selector: "app-service-order-read",
  templateUrl: "./service-order-read.component.html",
  styleUrls: ["./service-order-read.component.css"],
})
export class ServiceOrderReadComponent implements AfterViewInit {
  serviceOrder: ServiceOrder[] = [];

  displayedColumns: string[] = [
    "technician",
    "client",
    "openingDate",
    "endingDate",
    "priority",
    "status",
    "actions",
  ];
  dataSource = new MatTableDataSource<ServiceOrder>(this.serviceOrder);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ServiceOrderService,
    private router: Router,
    private technicianService: TechnicianService,
    private clientService: ClientService
  ) {}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((response) => {
      this.serviceOrder = response;
      this.getTechnicianName();
      this.getClientName();
      this.dataSource = new MatTableDataSource<ServiceOrder>(this.serviceOrder);
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToCreate(): void {
    this.router.navigate(["service-order/create"]);
  }

  getTechnicianName(): void {
    this.serviceOrder.forEach((el) =>
      this.technicianService.findById(el.technician).subscribe((response) => {
        el.technician = response.name;
      })
    );
  }

  getClientName(): void {
    this.serviceOrder.forEach((el) =>
      this.clientService.findById(el.client).subscribe((response) => {
        el.client = response.name;
      })
    );
  }

  priority(priority: String): any {
    switch (priority) {
      case "LOW":
        return "low";
      case "MEDIUM":
        return "medium";
      case "HIGH":
        return "high";
      default:
        null;
    }
  }

  setPriority(priority: String): any {
    switch (priority) {
      case "LOW":
        return "BAIXA";
      case "MEDIUM":
        return "MÉDIA";
      case "HIGH":
        return "ALTA";
      default:
        null;
    }
  }

  setStatus(status: String): any {
    switch (status) {
      case "OPENED":
        return "ABERTO";
      case "IN_PROGRESS":
        return "EM ANDAMENTO";
      case "FINISHED":
        return "FINALIZADO";
      default:
        null;
    }
  }
}
