import { Component, OnInit } from "@angular/core";
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
    name: "Bárbara Ornelas",
    cpf: "954.973.070-00",
    phoneNumber: "(11) 90000-0000",
  };

  constructor(private router: Router, private service: TechnicianService) {}

  ngOnInit(): void {}

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
        err.error.message.match("já cadastrado")
          ? this.service.returnMessage(`ERRO: ${err.error.message}`)
          : console.log(err);
      }
    );
  }
}
