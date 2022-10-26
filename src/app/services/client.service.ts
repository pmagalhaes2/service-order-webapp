import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Client } from "../models/Client";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(): Observable<Client[]> {
    const url = this.baseUrl + "/clients";
    return this.http.get<Client[]>(url);
  }

  create(client: Client): Observable<Client> {
    const url = this.baseUrl + "/clients";
    return this.http.post<Client>(url, client);
  }

  update(client: Client): Observable<Client> {
    const url = this.baseUrl + "/clients/" + client.id;
    return this.http.put<Client>(url, client);
  }

  findById(id: any): Observable<Client> {
    const url = this.baseUrl + "/clients/" + id;
    return this.http.get<Client>(url);
  }

  delete(id: any): Observable<void> {
    const url = this.baseUrl + "/clients/" + id;
    return this.http.delete<void>(url);
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
