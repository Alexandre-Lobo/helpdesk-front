import { API_CONFIG } from './../config/api.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chamado } from '../model/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  constructor(private http: HttpClient) { }

  findaAll(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(`${API_CONFIG.baseUrl}/chamados`);
  }
}
