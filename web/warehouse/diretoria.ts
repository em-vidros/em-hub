import type {
  ClienteResumo,
  KpiValue,
  Period,
  ProdutoResumo,
  TimeSeriesPoint,
} from "./types";

export interface DiretoriaDashboardData {
  period: Period;
  kpis: {
    faturamento: KpiValue;
    margem: KpiValue;
    volumeProduzido: KpiValue;
    eficienciaGeral: KpiValue;
    acidentes: KpiValue;
    retrabalho: KpiValue;
  };
  faturamentoPorMes: TimeSeriesPoint[];
  eficienciaPorMes: TimeSeriesPoint[];
  principaisClientes: ClienteResumo[];
  produtosMaisLucrativos: ProdutoResumo[];
  despesasPorTipo: {
    tipo: string;
    valor: number;
  }[];
  fluxoCaixaMensal: TimeSeriesPoint[];
  endividamentoPorPrazo: {
    prazo: string;
    saldo: number;
  }[];
}

export function getDiretoriaMockData(
  period: Period = "30d",
): DiretoriaDashboardData {
  return {
    period,
    kpis: {
      faturamento: {
        label: "Faturamento",
        value: 4200000,
        unit: "R$",
        trendPercentage: 8.4,
      },
      margem: {
        label: "Margem líquida",
        value: 18.7,
        unit: "%",
        trendPercentage: 1.2,
      },
      volumeProduzido: {
        label: "Volume produzido",
        value: 125000,
        unit: "m²",
        trendPercentage: 5.1,
      },
      eficienciaGeral: {
        label: "Eficiência geral",
        value: 86.3,
        unit: "%",
        trendPercentage: 2.3,
      },
      acidentes: {
        label: "Acidentes no período",
        value: 1,
        trendPercentage: -50,
      },
      retrabalho: {
        label: "Retrabalho",
        value: 2.4,
        unit: "%",
        trendPercentage: -0.8,
      },
    },
    faturamentoPorMes: [
      { date: "2025-01-01", value: 3800000 },
      { date: "2025-02-01", value: 3950000 },
      { date: "2025-03-01", value: 4100000 },
      { date: "2025-04-01", value: 4200000 },
    ],
    eficienciaPorMes: [
      { date: "2025-01-01", value: 82 },
      { date: "2025-02-01", value: 84 },
      { date: "2025-03-01", value: 85 },
      { date: "2025-04-01", value: 86.3 },
    ],
    principaisClientes: [
      {
        id: "c1",
        nome: "Construtora Horizonte",
        faturamentoMensal: 650000,
        margemPercentual: 22,
      },
      {
        id: "c2",
        nome: "Vidraçaria Central",
        faturamentoMensal: 520000,
        margemPercentual: 19,
      },
      {
        id: "c3",
        nome: "Shopping Vale",
        faturamentoMensal: 430000,
        margemPercentual: 20,
      },
    ],
    produtosMaisLucrativos: [
      {
        id: "p1",
        nome: "Lamina temperada 8mm",
        faturamentoMensal: 980000,
        margemPercentual: 24,
      },
      {
        id: "p2",
        nome: "Vidro insulado low-e",
        faturamentoMensal: 720000,
        margemPercentual: 26,
      },
      {
        id: "p3",
        nome: "Box de banho sob medida",
        faturamentoMensal: 610000,
        margemPercentual: 21,
      },
    ],
    despesasPorTipo: [
      {
        tipo: "Matéria-prima (chapas de vidro)",
        valor: 1450000,
      },
      {
        tipo: "Mão de obra direta",
        valor: 620000,
      },
      {
        tipo: "Energia e utilidades dos fornos",
        valor: 430000,
      },
      {
        tipo: "Logística e fretes",
        valor: 310000,
      },
      {
        tipo: "Despesas comerciais e marketing",
        valor: 270000,
      },
      {
        tipo: "Despesas administrativas",
        valor: 210000,
      },
    ],
    fluxoCaixaMensal: [
      { date: "2025-01-01", value: 520000 },
      { date: "2025-02-01", value: 480000 },
      { date: "2025-03-01", value: 560000 },
      { date: "2025-04-01", value: 590000 },
    ],
    endividamentoPorPrazo: [
      {
        prazo: "Curto prazo (até 12 meses)",
        saldo: 1800000,
      },
      {
        prazo: "Médio prazo (13 a 36 meses)",
        saldo: 2400000,
      },
      {
        prazo: "Longo prazo (acima de 36 meses)",
        saldo: 1200000,
      },
    ],
  };
}


