export interface Veiculo{
    veiculoId: string,
    placa: string,
    modelo: string,
    startTime?:string,
    endTime?: string,
    duration: string,
    costFlag: number,
    precoInicial: number,
    precoAdicional: number,
    precoFinal: number,
    active: boolean,
  }