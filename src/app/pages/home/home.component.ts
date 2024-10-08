import { Component, OnInit } from '@angular/core';
import { CadastroVaga } from 'src/app/Models/cadastro-model';
import { Veiculo } from 'src/app/Models/Veiculos';
import { VeiculosService } from 'src/app/services/veiculos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  veiculos: Veiculo[] = [];
  veiculosGeral: Veiculo[] = [];
  mostrarForm = false;
  vaga = { modelo: '', placa: ''};
  


  constructor( private veiculosSevice: VeiculosService)
  {

  }

  ngOnInit(): void {
    this.getVeiculosApi();
  }

 getVeiculosApi(): void {
  this.veiculosSevice.GetVeiculos().subscribe(
    (data) =>{ if(Array.isArray(data)){}
    console.log(data)
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

  checkVeiculo(veiculoId: string) {
   this.veiculosSevice.CheckVeiculos(veiculoId);
   console.log(veiculoId)
   this.reloadPage();
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
}

deleteVeiculo(veiculoId: string) {
  this.veiculosSevice.DeleteVeiculos(veiculoId);
  console.log(veiculoId)
  this.reloadPage();
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
