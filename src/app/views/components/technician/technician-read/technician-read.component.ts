import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Technician } from "src/app/models/Technician";
import { TechnicianService } from "src/app/services/technician.service";

@Component({
  selector: "app-technician-read",
  templateUrl: "./technician-read.component.html",
  styleUrls: ["./technician-read.component.css"],
})
export class TechnicianReadComponent implements AfterViewInit {
  technicians: Technician[] = [];

  displayedColumns: string[] = ["id", "name", "cpf", "phoneNumber"];
  dataSource = new MatTableDataSource<Technician>(this.technicians);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: TechnicianService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((response) => {
      this.technicians = response;
      console.log(this.technicians);
    });
  }
}
