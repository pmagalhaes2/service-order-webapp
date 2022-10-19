import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnicianCreateComponent } from './views/components/technician/technician-create/technician-create.component';
import { HomeComponent } from './views/components/home/home.component';
import { TechnicianReadComponent } from './views/components/technician/technician-read/technician-read.component';
import { TechnicianUpdateComponent } from './views/components/technician/technician-update/technician-update.component';
import { TechnicianDeleteComponent } from './views/components/technician/technician-delete/technician-delete.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "technicians",
    component: TechnicianReadComponent
  },
  {
    path: "technicians/create",
    component: TechnicianCreateComponent
  },
  {
    path: "technicians/update/:id",
    component: TechnicianUpdateComponent
  },
  {
    path: "technicians/delete/:id",
    component: TechnicianDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
