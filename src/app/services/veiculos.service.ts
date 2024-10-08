import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Veiculo } from '../Models/Veiculos';

@Injectable({
  providedIn: 'root'
})
export class VeiculosService {

 private apiUrl = `${environment.ApiUrl}`

 httpOptions = {
  headers: new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
})};


  constructor(private http: HttpClient) { }

  GetVeiculos() : Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${this.apiUrl}/List`);
}

  CheckVeiculos(veiculoId: string) : Observable<string> {
  const id = veiculoId;
  console.log(veiculoId)
  console.log(`${this.apiUrl}/Checkout/${id}`, {})
  this.http.patch<string>(`${this.apiUrl}/Checkout/${id}`, null, this.httpOptions).subscribe((data) => {
    console.log("request ok", data);
  });
  return this.http.patch<string>(`${this.apiUrl}/Checkout/${id}`, null, this.httpOptions);
   
}


CadastrarVaga(cadastro: { modelo: string; placa: string }): Observable<any[]> {
  console.log(cadastro)
  console.log(`${this.apiUrl}/Create`, cadastro)
  // this.http.post<string[]>(`${this.apiUrl}/Create`, cadastro,  this.httpOptions ).subscribe((data) => {
  //   console.log("request ok", data);
  // });
  return this.http.post<string[]>(`${this.apiUrl}/Create`, cadastro,  this.httpOptions );
}

DeleteVeiculos(veiculoId: string) : Observable<string> {
  const id = veiculoId;
  console.log(veiculoId)
  console.log(`${this.apiUrl}/DeletebyId/${id}`)
  this.http.delete<string>(`${this.apiUrl}/DeletebyId/${id}`).subscribe((data) => {
    console.log("request ok", data);
  });
  return this.http.delete<string>(`${this.apiUrl}/DeletebyId/${id}`);
   
}
  
}

