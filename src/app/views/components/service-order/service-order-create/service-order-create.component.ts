import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Client } from "src/app/models/Client";
import { ServiceOrder } from "src/app/models/ServiceOrder";
import { Technician } from "src/app/models/Technician";
import { ClientService } from "src/app/services/client.service";
import { ServiceOrderService } from "src/app/services/service-order.service";
import { TechnicianService } from "src/app/services/technician.service";

@Component({
  selector: "app-service-order-create",
  templateUrl: "./service-order-create.component.html",
  styleUrls: ["./service-order-create.component.css"],
})
export class ServiceOrderCreateComponent implements OnInit {
  serviceOrder: ServiceOrder = {
    priority: "",
    notes: "",
    status: "",
    technician: "",
    client: "",
  };

  technicians: Technician[] = [];

  clients: Client[] = [];

  constructor(
    private router: Router,
    private service: ServiceOrderService,
    private technicianService: TechnicianService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.getTechnicians();
    this.getClients();
  }

  cancel(): void {
    this.router.navigate(["/service-order"]);
  }

  create(): void {
    this.service.create(this.serviceOrder).subscribe(
      (response) => {
        this.service.returnMessage("Ordem de serviço criada com sucesso!");
        this.router.navigate(["/service-order"]);
      },
      (err) => {
        console.log(`ERRO: ${err.error.message}`);
        this.service.returnMessage(`ERRO: ${err.error.message}`);
      }
    );
  }

  getTechnicians(): void {
    this.technicianService.findAll().subscribe((response) => {
      this.technicians = response;
    });
  }

  getClients(): void {
    this.clientService.findAll().subscribe((response) => {
      this.clients = response;
    });
  }
}
