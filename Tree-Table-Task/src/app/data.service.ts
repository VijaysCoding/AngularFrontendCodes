import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from  '@angular/common/http';

export interface Tree{
  mainbranch: string;
  count?: number;
  createdOn?: string;
  createdBy?: string;
  currency?: string;
  childOfMainBranch?: Tree[];
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataUrl = 'http://localhost:8086/ust/v1/getree';

  constructor(private http: HttpClient) { }

  GetData(): Observable<any>{
    return this.http.get<any>(this.dataUrl);
  }
  
}
