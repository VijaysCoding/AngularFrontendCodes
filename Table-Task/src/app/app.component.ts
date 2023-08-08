// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'angular-app';
// }

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  searchTerm:any;
  items: any;
  selectedItem: any;
  users: User[] | undefined;

  constructor(private http: HttpClient) {}
  ngOnInit(){
    this.fetchData();
  }

  fetchData() {
    this.http.get(`http://localhost:8088/api/v1/getall`).subscribe(data =>{
      this.items = data;
    });
  }

  search() {
   this.http.get(`http://localhost:8088/api/v1/getall?q=${this.searchTerm}`).subscribe(data =>{
    //this.http.get('http://localhost:8088/api/v1/getall?q=${this.searchTerm}').subscribe(data =>{
      this.items = data;
    });
  }

  edit(items:any){  //any illa
    this.selectedItem = items; //idhu item
  }

  cancel() {
    this.selectedItem = null;
  }

  save(){
    this.http.put(`http://localhost:8088/api/v1/update`, this.selectedItem).subscribe(() => {
      this.fetchData();
      this.selectedItem = null;
    });
  }

  deleteId(id:any){  //any illa
    this.http.delete(`http://localhost:8088/api/v1/delete`).subscribe(()=>{
      this.fetchData();
    });
  }
}