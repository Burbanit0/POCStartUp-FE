import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class WorkteamService {

  constructor(private http: HttpClient) { }

  getTeams(user_id:any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/users/${user_id}/groupuser`)
  }

  addUser(user_id:any, data:any) {
    return this.http.patch(`${baseUrl}/users/${user_id}/groupuser/users`, data)
  }


}
