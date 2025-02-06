import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GroupResponse, GroupInfoResponse, Group } from '../interfaces/group';
import { environment } from '../../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<GroupResponse> {
    return this.http.get<GroupResponse>(`${environment.apiUrl}/groups`, {
      headers: environment.headers,
    });
  }

  getGroup(groupId: number): Observable<GroupInfoResponse> { // <-- Usa GroupInfoResponse
    return this.http.get<GroupInfoResponse>(
      `${environment.apiUrl}/groups/${groupId}`,
      { headers: environment.headers }
    );
  }

  postGroup(name: string, description: string, reputation_required: number) {
    const groupData = {
      name: name,
      description: description,
      reputation_required: reputation_required,
    };
    return this.http.post<any>(`${environment.apiUrl}/groups`, groupData, {
      headers: environment.headers,
    });
  }

  deleteGroup(groupId: number):Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/groups/${groupId}`,{headers:environment.headers});
    }

  joinGroup(groupId: number):Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/groups/${groupId}/join`, "", {headers: environment.headers});
  }

  leaveGroup(groupId: number):Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/groups/${groupId}/leave`, "", {headers: environment.headers});
  }
}
