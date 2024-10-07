import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../Models/Veiculos';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

 private apiUrl = `${environment.ApiUrl}`

  constructor(private http: HttpClient) { }

  GetVeiculos() : Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/List`);
}

  CheckVeiculos(veiculoId: string) : Observable<string> {
  const id = veiculoId;
  console.log(veiculoId)
  console.log(`${this.apiUrl}/Checkout/${id}`, {})
  return this.http.put<string>(`${this.apiUrl}/Checkout/${id}`, {});
   
}

CadastrarVaga(cadastro: { modelo: string; placa: string }): Observable<string> {
  console.log("oi 2")
  return this.http.post<string>(`${this.apiUrl}/Create`, {cadastro});
}

DeleteVeiculos(veiculoId: string) : Observable<string> {
  const id = veiculoId;
  console.log(veiculoId)
  console.log(`${this.apiUrl}/DeletebyId/${id}`, {})
  return this.http.delete<string>(`${this.apiUrl}/DeletebyId/${id}`, {});
   
}
  
}

