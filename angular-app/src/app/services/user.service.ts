import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private createUrl = "http://localhost:8088/api/v1/create"
  private getallUrl = "http://localhost:8088/api/v1/getall"
  private deleteUrl = "http://localhost:8088/api/v1/delete"
  private updateUrl = "http://localhost:8088/api/v1/update"
  private findByIdUrl = "http://localhost:8088/api/v1/get"

  constructor(private httpClient: HttpClient) {

  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.getallUrl}`);
  }

  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.createUrl}`, user);
  }

  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.findByIdUrl}/${id}`);
  }

  updateUser(id:number, user:User): Observable<Object>{
    return this.httpClient.put(`${this.updateUrl}/${id}`, user);
  }

  deleteUser(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.deleteUrl}/${id}`);
  }
} 
