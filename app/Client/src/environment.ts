import { HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

export const environment = {
    production: false,
    apiUrl: 'http://localhost/VoluntApp/app/Server/public/api',
    headers: headers,
  };
  