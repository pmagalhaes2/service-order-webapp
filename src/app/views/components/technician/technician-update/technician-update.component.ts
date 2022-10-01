import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Technician } from "src/app/models/Technician";
import { TechnicianService } from "src/app/services/technician.service";

@Component({
  selector: "app-technician-update",
  templateUrl: "./technician-update.component.html",
  styleUrls: ["./technician-update.component.css"],
})
export class TechnicianUpdateComponent implements OnInit {
  technician_id = "";

  technician: Technician = {
    id: "",
    name: "",
    cpf: "",
    phoneNumber: "",
  };

  name = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(11)]);
  phoneNumber = new FormControl("", [Validators.minLength(11)]);

  constructor(
    private router: Router,
    private service: TechnicianService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.technician_id = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.technician_id).subscribe((response) => {
      this.technician = response;
    });
  }

  update(): void {
    this.service.update(this.technician).subscribe((response) => {
      this.router.navigate(["/technicians"]);
      this.service.returnMessage("Técnico atualizado com sucesso!")
    },
      (err) => {
        this.service.returnMessage(`ERRO: ${err.error.message}`)
      }
    )
  }

  cancel(): void {
    this.router.navigate(["/technicians"]);
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
