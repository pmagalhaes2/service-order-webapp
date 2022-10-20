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

  name = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  phoneNumber = new FormControl("", [Validators.minLength(11)]);

  constructor(
    private service: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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

  errorInvalidName() {
    if (this.name.invalid) {
      return "O nome deve conter no mínimo 5 caracteres!";
    }
    return false;
  }

  errorInvalidCPF() {
    if (this.cpf.invalid) {
      return "O cpf deve conter no mínimo 11 caracteres!";
    }
    return false;
  }

  errorInvalidPhoneNumber() {
    if (this.phoneNumber.invalid) {
      return "O telefone deve conter no mínimo 11 caracteres!";
    }
    return false;
  }
}
