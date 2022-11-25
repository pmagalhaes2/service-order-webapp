import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServiceOrder } from "src/app/models/ServiceOrder";
import { ClientService } from "src/app/services/client.service";
import { ServiceOrderService } from "src/app/services/service-order.service";
import { TechnicianService } from "src/app/services/technician.service";

@Component({
  selector: "app-service-order-view",
  templateUrl: "./service-order-view.component.html",
  styleUrls: ["./service-order-view.component.css"],
})
export class ServiceOrderViewComponent implements OnInit {
  serviceOrder: ServiceOrder = {
    priority: "",
    notes: "",
    status: "",
    technician: "",
    client: "",
  };

  technician = "";

  constructor(
    private route: ActivatedRoute,
    private service: ServiceOrderService,
    private router: Router,
    private technicianService: TechnicianService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.serviceOrder.id = this.route.snapshot.paramMap.get("id");
    this.findById();
  }

  findById(): void {
    this.service.findById(this.serviceOrder.id).subscribe((response) => {
      this.serviceOrder = response;
    });
  }

  return(): void {
    this.router.navigate(["/service-order"]);
  }

  setStatus(status: any): any {
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
