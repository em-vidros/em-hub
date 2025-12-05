import { Period } from "./types";

export interface PerformanceData {
  period: Period;
  kpis: {
    throughput: { label: string; value: number; unit: string; trendPercentage: number };
    latencia: { label: string; value: number; unit: string; trendPercentage: number };
    uptime: { label: string; value: number; unit: string; trendPercentage: number };
    taxaErro: { label: string; value: number; unit: string; trendPercentage: number };
  };
  performancePorMes: Array<{ date: string; throughput: number; latencia: number }>;
  topProcessos: Array<{ id: string; nome: string; tempoMedio: number; volume: number }>;
  latenciaDistribuicao: number[];
  latenciaDistribuicaoAnterior: number[];
  taxaErroPorEndpoint: Array<{ endpoint: string; taxaErro: number; throughput: number }>;
}

export interface EficienciaData {
  period: Period;
  kpis: {
    oeeGeral: { label: string; value: number; unit: string; trendPercentage: number };
    produtividade: { label: string; value: number; unit: string; trendPercentage: number };
    utilizacao: { label: string; value: number; unit: string; trendPercentage: number };
    desperdicio: { label: string; value: number; unit: string; trendPercentage: number };
  };
  eficienciaPorLinha: Array<{ linha: string; oee: number; produtividade: number }>;
  eficienciaPorTurno: Array<{ turno: string; oee: number; volume: number }>;
}

export interface SegurancaData {
  period: Period;
  kpis: {
    acidentes: { label: string; value: number; trendPercentage: number };
    diasSemAcidente: { label: string; value: number; trendPercentage: number };
    treinamentos: { label: string; value: number; trendPercentage: number };
    conformidade: { label: string; value: number; unit: string; trendPercentage: number };
  };
  acidentesPorMes: Array<{ date: string; quantidade: number; severidade: string }>;
  areasRisco: Array<{ area: string; nivel: string; ultimaOcorrencia: string }>;
}

export interface CustosData {
  period: Period;
  kpis: {
    custoTotal: { label: string; value: number; unit: string; trendPercentage: number };
    custoPorM2: { label: string; value: number; unit: string; trendPercentage: number };
    margemBruta: { label: string; value: number; unit: string; trendPercentage: number };
    variacaoCusto: { label: string; value: number; unit: string; trendPercentage: number };
  };
  custosPorCategoria: Array<{ categoria: string; valor: number; percentual: number }>;
  custosPorMes: Array<{ date: string; valor: number; variacao: number }>;
}

export interface QualidadeData {
  period: Period;
  kpis: {
    taxaAprovacao: { label: string; value: number; unit: string; trendPercentage: number };
    retrabalho: { label: string; value: number; unit: string; trendPercentage: number };
    defeitos: { label: string; value: number; trendPercentage: number };
    satisfacao: { label: string; value: number; unit: string; trendPercentage: number };
  };
  qualidadePorProduto: Array<{ produto: string; taxaAprovacao: number; defeitos: number }>;
  defeitosPorTipo: Array<{ tipo: string; quantidade: number; percentual: number }>;
}

export function getPerformanceMockData(period: Period = "30d"): PerformanceData {
  return {
    period,
    kpis: {
      throughput: { label: "Throughput médio", value: 1284, unit: "req/min", trendPercentage: 5.9 },
      latencia: { label: "Latência P50", value: 112, unit: "ms", trendPercentage: -3.2 },
      uptime: { label: "Uptime", value: 99.982, unit: "%", trendPercentage: 0.01 },
      taxaErro: { label: "Taxa de erro", value: 0.23, unit: "%", trendPercentage: 12.0 },
    },
    performancePorMes: [
      { date: "2025-01-01", throughput: 1180, latencia: 125 },
      { date: "2025-02-01", throughput: 1220, latencia: 118 },
      { date: "2025-03-01", throughput: 1250, latencia: 115 },
      { date: "2025-04-01", throughput: 1284, latencia: 112 },
    ],
    topProcessos: [
      { id: "p1", nome: "Corte automático", tempoMedio: 45, volume: 12500 },
      { id: "p2", nome: "Têmpera", tempoMedio: 120, volume: 9800 },
      { id: "p3", nome: "Laminação", tempoMedio: 90, volume: 11200 },
    ],
    latenciaDistribuicao: [
      85, 92, 97, 101, 108, 112, 115, 118, 120, 123, 127, 130, 135, 140, 150, 160,
      95, 89, 102, 111, 119, 126, 132, 138, 145, 155, 167,
    ],
    latenciaDistribuicaoAnterior: [
      95, 102, 107, 111, 118, 122, 125, 128, 130, 133, 137, 140, 145, 150, 160, 170,
      105, 99, 112, 121, 129, 136, 142, 148, 155, 165, 177,
    ],
    taxaErroPorEndpoint: [
      { endpoint: "/api/pedidos", taxaErro: 0.18, throughput: 420 },
      { endpoint: "/api/clientes", taxaErro: 0.12, throughput: 310 },
      { endpoint: "/api/estoque", taxaErro: 0.35, throughput: 260 },
      { endpoint: "/api/relatorios", taxaErro: 0.48, throughput: 140 },
      { endpoint: "/api/autenticacao", taxaErro: 0.05, throughput: 154 },
    ],
  };
}

export function getEficienciaMockData(period: Period = "30d"): EficienciaData {
  return {
    period,
    kpis: {
      oeeGeral: { label: "OEE geral", value: 82.4, unit: "%", trendPercentage: 2.7 },
      produtividade: { label: "Produtividade média", value: 158, unit: "m²/h", trendPercentage: 4.1 },
      utilizacao: { label: "Utilização de capacidade", value: 87.3, unit: "%", trendPercentage: 1.5 },
      desperdicio: { label: "Taxa de desperdício", value: 2.1, unit: "%", trendPercentage: -0.3 },
    },
    eficienciaPorLinha: [
      { linha: "Forno Têmpera A", oee: 85, produtividade: 165 },
      { linha: "Forno Têmpera B", oee: 79, produtividade: 152 },
      { linha: "Laminação", oee: 83, produtividade: 160 },
      { linha: "Corte automático", oee: 76, produtividade: 145 },
    ],
    eficienciaPorTurno: [
      { turno: "1º turno", oee: 84, volume: 46000 },
      { turno: "2º turno", oee: 82, volume: 52000 },
      { turno: "3º turno", oee: 78, volume: 27000 },
    ],
  };
}

export function getSegurancaMockData(period: Period = "30d"): SegurancaData {
  return {
    period,
    kpis: {
      acidentes: { label: "Acidentes no período", value: 1, trendPercentage: -50 },
      diasSemAcidente: { label: "Dias sem acidente", value: 45, trendPercentage: 12.5 },
      treinamentos: { label: "Treinamentos realizados", value: 8, trendPercentage: 14.3 },
      conformidade: { label: "Conformidade EPI", value: 98.5, unit: "%", trendPercentage: 1.2 },
    },
    acidentesPorMes: [
      { date: "2025-01-01", quantidade: 2, severidade: "Leve" },
      { date: "2025-02-01", quantidade: 1, severidade: "Leve" },
      { date: "2025-03-01", quantidade: 0, severidade: "N/A" },
      { date: "2025-04-01", quantidade: 1, severidade: "Leve" },
    ],
    areasRisco: [
      { area: "Forno Têmpera", nivel: "Médio", ultimaOcorrencia: "2025-03-15" },
      { area: "Corte", nivel: "Baixo", ultimaOcorrencia: "2025-02-20" },
      { area: "Manuseio", nivel: "Baixo", ultimaOcorrencia: "2025-01-10" },
    ],
  };
}

export function getCustosMockData(period: Period = "30d"): CustosData {
  return {
    period,
    kpis: {
      custoTotal: { label: "Custo total", value: 3414000, unit: "R$", trendPercentage: 2.1 },
      custoPorM2: { label: "Custo por m²", value: 27.31, unit: "R$", trendPercentage: -1.2 },
      margemBruta: { label: "Margem bruta", value: 18.7, unit: "%", trendPercentage: 1.2 },
      variacaoCusto: { label: "Variação de custo", value: 2.1, unit: "%", trendPercentage: -0.5 },
    },
    custosPorCategoria: [
      { categoria: "Matéria-prima", valor: 2100000, percentual: 61.5 },
      { categoria: "Mão de obra", valor: 850000, percentual: 24.9 },
      { categoria: "Energia", valor: 280000, percentual: 8.2 },
      { categoria: "Manutenção", valor: 184000, percentual: 5.4 },
    ],
    custosPorMes: [
      { date: "2025-01-01", valor: 3340000, variacao: 0 },
      { date: "2025-02-01", valor: 3380000, variacao: 1.2 },
      { date: "2025-03-01", valor: 3400000, variacao: 0.6 },
      { date: "2025-04-01", valor: 3414000, variacao: 0.4 },
    ],
  };
}

export function getQualidadeMockData(period: Period = "30d"): QualidadeData {
  return {
    period,
    kpis: {
      taxaAprovacao: { label: "Taxa de aprovação", value: 97.6, unit: "%", trendPercentage: 0.8 },
      retrabalho: { label: "Taxa de retrabalho", value: 2.4, unit: "%", trendPercentage: -0.8 },
      defeitos: { label: "Defeitos no período", value: 312, trendPercentage: -12.5 },
      satisfacao: { label: "Satisfação do cliente", value: 4.6, unit: "/5", trendPercentage: 2.2 },
    },
    qualidadePorProduto: [
      { produto: "Templados", taxaAprovacao: 98.2, defeitos: 45 },
      { produto: "Laminados", taxaAprovacao: 97.8, defeitos: 78 },
      { produto: "Insulados", taxaAprovacao: 96.9, defeitos: 102 },
      { produto: "Acessórios", taxaAprovacao: 97.5, defeitos: 87 },
    ],
    defeitosPorTipo: [
      { tipo: "Riscos", quantidade: 125, percentual: 40.1 },
      { tipo: "Bolhas", quantidade: 78, percentual: 25.0 },
      { tipo: "Dimensões", quantidade: 65, percentual: 20.8 },
      { tipo: "Outros", quantidade: 44, percentual: 14.1 },
    ],
  };
}


