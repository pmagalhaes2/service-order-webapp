import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Technician } from "src/app/models/Technician";
import { TechnicianService } from "src/app/services/technician.service";

@Component({
  selector: "app-technician-create",
  templateUrl: "./technician-create.component.html",
  styleUrls: ["./technician-create.component.css"],
})
export class TechnicianCreateComponent implements OnInit {
  technician: Technician = {
    id: "",
    name: "",
    cpf: "",
    phoneNumber: "",
  };

  name = new FormControl('', [Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  phoneNumber = new FormControl('', [Validators.minLength(11)])


  constructor(private router: Router, private service: TechnicianService) { }

  ngOnInit(): void { }

  cancel(): void {
    this.router.navigate(["/technicians"]);
  }

  create(): void {
    this.service.create(this.technician).subscribe(
      (response) => {
        this.router.navigate(["/technicians"]);
        this.service.returnMessage("Técnico criado com sucesso!");
      },
      (err) => {
        this.service.returnMessage(`ERRO: ${err.error.message}`)
      }
    );
  }

  errorInvalidName() {
    if (this.name.invalid) {
      return 'O nome deve conter no mínimo 5 caracteres!'
    }
    return false;
  }

  errorInvalidCPF() {
    if (this.cpf.invalid) {
      return 'O cpf deve conter no mínimo 11 caracteres!'
    }
    return false;
  }

  errorInvalidPhoneNumber() {
    if (this.phoneNumber.invalid) {
      return 'O telefone deve conter no mínimo 11 caracteres!'
    }
    return false;
  }
}
