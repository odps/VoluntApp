import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  headers.append('Authorization', `Bearer ${token}`);
}

export const environment = {
    production: false,
    apiUrl: 'http://localhost/VoluntApp/app/Server/public/api',
    headers: headers,
  };
  