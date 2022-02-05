import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Worktime } from '../models/worktime.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class WorktimeService {

  constructor(private http: HttpClient) { }

  getWorktime(user_id:any, project_id:any): Observable<Worktime[]> {
    return this.http.get<Worktime[]>(`${baseUrl}/users/${user_id}/projects/${project_id}/worktimes`);
  }

  postWorktime(user_id:any, project_id:any, data:any) {
    return this.http.post(`${baseUrl}/users/${user_id}/projects/${project_id}/worktimes`, data);
  }
}