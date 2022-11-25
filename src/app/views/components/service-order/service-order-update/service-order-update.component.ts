import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "src/app/models/Client";
import { ServiceOrder } from "src/app/models/ServiceOrder";
import { Technician } from "src/app/models/Technician";
import { ClientService } from "src/app/services/client.service";
import { ServiceOrderService } from "src/app/services/service-order.service";
import { TechnicianService } from "src/app/services/technician.service";


@Component({
  selector: 'app-service-order-update',
  templateUrl: './service-order-update.component.html',
  styleUrls: ['./service-order-update.component.css']
})
export class ServiceOrderUpdateComponent implements OnInit {
  serviceOrder_id = '';
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
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serviceOrder_id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
    this.getTechnicians();
    this.getClients();
  }

  findById(): void {
    this.service.findById(this.serviceOrder_id).subscribe((response) => {
      this.serviceOrder = response;
    });
  }

  cancel(): void {
    this.router.navigate(["/service-order"]);
  }

  update(): void {
    this.service.update(this.serviceOrder).subscribe(
      (response) => {
        this.service.returnMessage("Ordem de serviço atualizada com sucesso!");
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
