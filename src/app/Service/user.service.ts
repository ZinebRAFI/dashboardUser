import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import User from '../Model/User';
import Token from '../Model/ActivityLogEntry';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl ='http://localhost:8081/users';

  constructor(private http: HttpClient) {
   }

   private jwtToken = 'Our-jwt-token';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.jwtToken}`
    });
  }
  createuser(userData : any) : Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/create`, userData , { headers: this.getHeaders() });
  }

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/findall` , { headers: this.getHeaders() });
  }
  //searchuser(username: string): Observable<User[]> {
    //const url = `${this.apiUrl}/search?username=${username}`; 
    //return this.http.get<User[]>(url , { headers: this.getHeaders() });
  //}
    searchUsers(query: string): Observable<any[]> {
      const url = `${this.apiUrl}/users/search?query=${query}`; 
      return this.http.get<User[]>(url , { headers: this.getHeaders() });
    }
    

  getuser(id : string) : Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/get/${id}` , { headers: this.getHeaders() });

  }
  updateuser(id: number, users: User): Observable<void> {
    const url = `${this.apiUrl}/user/${id}`;

    return this.http.put<void>(url, users , { headers: this.getHeaders() });
  }
 
  deleteuser(id: String): Observable<void> {
      const url = `${this.apiUrl}/user/${id}`; 
      
      return this.http.delete<void>(url , { headers: this.getHeaders() });
  }

}
