import { HttpHeaders } from '@angular/common/http';

let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

const token = localStorage.getItem('token');
if (token) {
  headers = headers.set('Authorization', `Bearer ${token}`);
}

export const environment = {
  production: false,
  apiUrl: 'http://localhost/VoluntApp/app/Server/public/api',
  baseUrl: 'http://localhost/VoluntApp/app/Server/public',
  headers: headers,
};
