import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private getUrl = 'http://localhost:8088/api/v1/getall'
  private deleteUrl="http://localhost:8088/api/v1/delete";
  

  constructor(private http: HttpClient) { }

  getData(): Observable<Table[]> {
    return this.http.get<Table[]>(this.getUrl);
  }
  
  deleteAccount(id:number):Observable<Table[]>{
    return this.http.delete<Table[]>(`${this.deleteUrl}/${id}`);
  }
}
