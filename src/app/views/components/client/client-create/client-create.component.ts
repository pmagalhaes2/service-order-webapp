import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
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

  name = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  phoneNumber = new FormControl("", [Validators.minLength(11)]);

  constructor(private router: Router, private service: ClientService) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.client).subscribe(
      (response) => {
        this.router.navigate(["/clients"]);
        this.service.returnMessage("Cliente criado com sucesso!");
      },
      (err) => {
        this.service.returnMessage(`ERRO: ${err.error.message}`);
      }
    );
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
