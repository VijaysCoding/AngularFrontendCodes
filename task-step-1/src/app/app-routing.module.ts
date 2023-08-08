import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { TableComponent } from './components/table/table.component';

const routes: Routes = [
  // { path: '', component: TableComponent },
  { path: 'table', component: TableComponent },
  { path: 'dialog-form', component: DialogFormComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
