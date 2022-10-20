import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "src/app/models/Client";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-client-update",
  templateUrl: "./client-update.component.html",
  styleUrls: ["./client-update.component.css"],
})
export class ClientUpdateComponent implements OnInit {
  client_id = "";

  client: Client = {
    id: "",
    name: "",
    cpf: "",
    phoneNumber: "",
  };

  constructor(
    private service: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.client_id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.client_id).subscribe((response) => {
      this.client = response;
    });
  }

  update(): void {
    this.service.update(this.client).subscribe((response) => {
      this.router.navigate(["/clients"]);
      this.service.returnMessage("Cliente atualizado com sucesso!");
    });
  }

  cancel(): void {
    this.router.navigate(["/clients"]);
  }
}
