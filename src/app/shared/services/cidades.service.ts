import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CidadesService {
  private readonly url = 'https://servicodados.ibge.gov.br';

  constructor(private http: HttpClient) {}

  getAllCidades(): Observable<any> {
    return this.http.get(`${this.url}/api/v1/localidades/distritos`);
  }
}
