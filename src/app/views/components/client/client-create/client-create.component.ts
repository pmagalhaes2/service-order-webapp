import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Client } from "src/app/models/Client";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-client-create",
  templateUrl: "./client-create.component.html",
  styleUrls: ["./client-create.component.css"],
})
export class ClientCreateComponent implements OnInit {
  client: Client = {
    id: "",
    name: "",
    cpf: "",
    phoneNumber: "",
  };

  constructor(private router: Router, private service: ClientService) { }

  ngOnInit(): void { }

  create(): void {
    this.service.create(this.client).subscribe((response) => {
      this.router.navigate(["/clients"]);
      this.service.returnMessage("Cliente criado com sucesso!");
    },
      (err) => {
        this.service.returnMessage(`ERRO: ${err.error.message}`)
      });
  }

  cancel(): void {
    this.router.navigate(["/clients"]);
  }
}
