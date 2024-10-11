import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Veiculo } from 'src/app/Models/Veiculos';
import { VeiculosService } from 'src/app/services/veiculos.service';
import { TabelaPreco } from 'src/app/Models/tabela-model';
import { PrecosService } from 'src/app/services/precos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  veiculos: Veiculo[] = [];
  veiculosGeral: Veiculo[] = [];
  tabelaPrecos: TabelaPreco[] = [];
  tabelaPrecosGeral: TabelaPreco[] = [];
  mostrarForm = false;
  vaga = { modelo: '', placa: ''};
  preco = { inicioVigencia: '', fimVigencia: '', precoVigenciaInicial: 0.00, precoVigenciaAdicional: 0.00};
  isLoading = false;

  
  constructor( private veiculosSevice: VeiculosService, private tabelaPrecosService: PrecosService)
  {

  }

  ngOnInit(): void {
    this.getVeiculosApi();
    this.getPrecosApi();
  }

 getVeiculosApi(): void {
  this.veiculosSevice.GetVeiculos().subscribe(
    (data) =>{ if(Array.isArray(data)){}
    console.log(data)
      this.veiculosGeral = data
      this.veiculos = data;
      data.map((item) => {
                item.startTime = new Date(item.startTime!).toLocaleTimeString('pt-BR');
                if(item.endTime != null){
                item.endTime = new Date(item.endTime!).toLocaleTimeString('pt-BR');}
              });
    },(error) => {
      console.error('Erro ao buscar dados da api', error)
    }
    );
  }

  getPrecosApi(): void {
    this.tabelaPrecosService.GetPrecos().subscribe(
      (data) =>{ if(Array.isArray(data)){}
      console.log(data)
        this.tabelaPrecosGeral = data
        this.tabelaPrecos = data;
        data.map((item) => {
                  item.inicioVigencia = new Date(item.inicioVigencia!).toLocaleDateString('pt-BR');
                  if(item.fimVigencia != null){
                  item.fimVigencia = new Date(item.fimVigencia!).toLocaleDateString('pt-BR');}
                });
      },(error) => {
        console.error('Erro ao buscar dados da api', error)
      }
      );
    }

  checkVeiculo(veiculoId: string) {
   this.veiculosSevice.CheckVeiculos(veiculoId).pipe(finalize(() => {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); 
  }))
  .subscribe(
    (resultado) => {
      console.log('Operação concluída', resultado);
    },
    (erro) => {
      console.error('Erro ao realizar operação', erro);
      this.isLoading = false;  
    });
   console.log(veiculoId)
   this.getVeiculosApi();
 }

 cadastrarVaga() {
  this.veiculosSevice.CadastrarVaga(this.vaga).subscribe(
    (resposta) => {
      console.log('Vaga cadastrada com sucesso:', resposta);
    },
    (erro) => {
      console.error('Erro ao cadastrar vaga:', erro);
    }
  );
  this.reloadPage();
  this.getVeiculosApi();
}

cadastrarPreco() {
  this.tabelaPrecosService.CadastrarPreco(this.preco).subscribe(
    (resposta) => {
      console.log('Preco cadastrada com sucesso:', resposta);
    },
    (erro) => {
      console.error('Erro ao cadastrar preco:', erro);
    }
  );
  this.reloadPage();
  this.getPrecosApi();
}

deleteVeiculo(veiculoId: string) {
  this.veiculosSevice.DeleteVeiculos(veiculoId).pipe(finalize(() => {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); 
  }))
  .subscribe(
    (resultado) => {
      console.log('Operação concluída', resultado);
    },
    (erro) => {
      console.error('Erro ao realizar operação', erro);
      this.isLoading = false;  
    });
  console.log(veiculoId)
  this.getPrecosApi();
}

deletePreco(id: number) {
  this.tabelaPrecosService.DeletePrecos(id).pipe(finalize(() => {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000); 
  }))
  .subscribe(
    (resultado) => {
      console.log('Operação concluída', resultado);
    },
    (erro) => {
      console.error('Erro ao realizar operação', erro);
      this.isLoading = false;  
    });
  console.log(id)
  this.getPrecosApi();
}

  formatDecimal(value: number):
  string {return value.toFixed(2);

  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    console.log(target)
    console.log(value)


    this.veiculos = this.veiculosGeral.filter(veiculo => {
      return veiculo.placa.toLowerCase().includes(value);
    })
  }

  reloadPage() {
    window.location.reload();
  }
}
