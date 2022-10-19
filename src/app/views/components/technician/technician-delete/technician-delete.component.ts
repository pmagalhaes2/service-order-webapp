import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Technician } from 'src/app/models/Technician';
import { TechnicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-technician-delete',
  templateUrl: './technician-delete.component.html',
  styleUrls: ['./technician-delete.component.css']
})
export class TechnicianDeleteComponent implements OnInit {
  technician_id = "";

  technician: Technician = {
    id: "",
    name: "",
    cpf: "",
    phoneNumber: "",
  };


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

  delete(): void {
    this.service.delete(this.technician_id).subscribe((response) => {
      this.router.navigate(["/technicians"]);
      this.service.returnMessage("Técnico deletado com sucesso!")
    },
      (err) => {
        this.service.returnMessage(`ERRO: ${err.error.message}`)
      }
    )
  }

  cancel(): void {
    this.router.navigate(["/technicians"]);
  }


}
