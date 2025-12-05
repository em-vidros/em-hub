export type Period = "7d" | "30d" | "90d";

export interface KpiValue {
  label: string;
  value: number;
  unit?: string;
  trendPercentage?: number;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export interface ClienteResumo {
  id: string;
  nome: string;
  faturamentoMensal: number;
  margemPercentual: number;
}

export interface ProdutoResumo {
  id: string;
  nome: string;
  faturamentoMensal: number;
  margemPercentual: number;
}

export interface LinhaProducaoResumo {
  id: string;
  nome: string;
  oeePercentual: number;
  retrabalhoPercentual: number;
  status: "ok" | "alerta" | "critico";
}

export interface SkuEstoqueResumo {
  id: string;
  codigo: string;
  descricao: string;
  categoria: string;
  nivelAtual: number;
  minimo: number;
  maximo: number;
}


