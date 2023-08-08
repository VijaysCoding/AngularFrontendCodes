import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AssetsData } from '../AssetsData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private httpClient: HttpClient) { }

  private createUrl = "http://localhost:8088/api/v1/create"
  private getallUrl = "http://localhost:8088/api/v1/getall"
  private deleteUrl = "http://localhost:8088/api/v1/delete"
  private updateUrl = "http://localhost:8088/api/v1/update"
  private findByIdUrl = "http://localhost:8088/api/v1/get"

  getAllData(): Observable<AssetsData[]> {
    return this.httpClient.get<AssetsData[]>(this.getallUrl);
  }

  getDataById(id: number): Observable<any> {
    return this.httpClient.get<AssetsData>(this.findByIdUrl + `/${id}`);
  }

  deleteData(id: number) {
    return this.httpClient.delete(this.deleteUrl + `/${id}`);
  }

  updateData(id: number, assets: AssetsData) {
    return this.httpClient.put(`${this.updateUrl}/${id}`, assets);
  }

  createData(assets: AssetsData) {
    return this.httpClient.post(this.createUrl, assets);//(this.URL+`/add`, assets);
  }

}
