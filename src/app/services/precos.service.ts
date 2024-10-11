import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs'
import { TabelaPreco } from '../Models/tabela-model';


@Injectable({
  providedIn: 'root'
})
export class PrecosService {

  private apiUrl2 = `${environment.ApiUrl2}`

  constructor(private http: HttpClient) { }

  GetPrecos() : Observable<TabelaPreco[]> {
    return this.http.get<TabelaPreco[]>(`${this.apiUrl2}/List`);
}

DeletePrecos(id: any) : Observable<any> {
  console.log(id)
  console.log(`${this.apiUrl2}/DeletebyId/${id}`)
  this.http.delete<any>(`${this.apiUrl2}/DeletebyId/${id}`).subscribe((data) => {
    console.log("request ok", data);
  });
  return this.http.delete<string>(`${this.apiUrl2}/DeletebyId/${id}`);
}

CadastrarPreco(cadastro: { inicioVigencia: string; fimVigencia: string; precoVigenciaInicial: number; precoVigenciaAdicional: number;}): Observable<any[]> {
  console.log(cadastro)
  console.log(`${this.apiUrl2}/Create`, cadastro)
  return this.http.post<any[]>(`${this.apiUrl2}/Create`, cadastro);
}
}
