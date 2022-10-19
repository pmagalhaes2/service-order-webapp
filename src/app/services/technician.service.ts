import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Technician } from "../models/Technician";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class TechnicianService {
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Technician[]> {
    const url = this.baseUrl + "/technicians";
    return this.http.get<Technician[]>(url);
  }

  findById(id: any): Observable<Technician> {
    const url = this.baseUrl + "/technicians/" + id;
    return this.http.get<Technician>(url)
  }

  create(technician: Technician): Observable<Technician> {
    const url = this.baseUrl + "/technicians";
    return this.http.post<Technician>(url, technician);
  }

  update(technician: Technician): Observable<Technician> {
    const url = this.baseUrl + "/technicians/" + technician.id;
    return this.http.put<Technician>(url, technician)
  }

  delete(id: any): Observable<void> {
    const url = this.baseUrl + "/technicians/" + id;
    return this.http.delete<void>(url)
  }

  returnMessage(msg: String): void {
    this.snack.open(`${msg}`, "x", {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 4000,
      panelClass: ["customized-snackbar"],
    });
  }
}
