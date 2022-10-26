import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Client } from "src/app/models/Client";
import { ClientService } from "src/app/services/client.service";

@Component({
  selector: "app-client-delete",
  templateUrl: "./client-delete.component.html",
  styleUrls: ["./client-delete.component.css"],
})
export class ClientDeleteComponent implements OnInit {
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

  delete(): void {
    this.service.delete(this.client_id).subscribe(
      (response) => {
        this.router.navigate(["/clients"]);
        this.service.returnMessage("Cliente deletado com sucesso!");
      },
      (err) => {
        this.service.returnMessage(`ERRO: ${err.error.message}`);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/clients"]);
  }
}
