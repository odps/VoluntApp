import { HttpHeaders } from '@angular/common/http';

let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

const token = localStorage.getItem('token');
if (token) {
  headers = headers.set('Authorization', `Bearer ${token}`);
}

export const environment = {
  production: false,
  apiUrl: 'http://35.170.203.230/api',
  baseUrl: 'http://35.170.203.230',
  headers: headers,
};
