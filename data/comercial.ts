import type {
  ClienteResumo,
  KpiValue,
  Period,
  TimeSeriesPoint,
} from "./types";

export interface ComercialDashboardData {
  period: Period;
  kpis: {
    vendasTotais: KpiValue;
    ticketMedio: KpiValue;
    novosClientes: KpiValue;
    taxaConversao: KpiValue;
  };
  vendasPorMes: TimeSeriesPoint[];
  vendasPorCanal: {
    canal: string;
    valor: number;
  }[];
  principaisClientes: ClienteResumo[];
  distribuicaoTicket: number[];
  vendasCanalMes: {
    canal: string;
    mes: string;
    valor: number;
  }[];
}

export function getComercialMockData(
  period: Period = "30d",
): ComercialDashboardData {
  return {
    period,
    kpis: {
      vendasTotais: {
        label: "Vendas totais",
        value: 3900000,
        unit: "R$",
        trendPercentage: 7.2,
      },
      ticketMedio: {
        label: "Ticket médio",
        value: 18200,
        unit: "R$",
        trendPercentage: 3.4,
      },
      novosClientes: {
        label: "Novos clientes",
        value: 18,
        trendPercentage: 1.8,
      },
      taxaConversao: {
        label: "Taxa de conversão",
        value: 27.5,
        unit: "%",
        trendPercentage: 0.9,
      },
    },
    vendasPorMes: [
      { date: "2025-01-01", value: 3400000 },
      { date: "2025-02-01", value: 3550000 },
      { date: "2025-03-01", value: 3720000 },
      { date: "2025-04-01", value: 3900000 },
    ],
    vendasPorCanal: [
      { canal: "Construtoras", valor: 1500000 },
      { canal: "Vidraçarias", valor: 1200000 },
      { canal: "Projetos especiais", valor: 800000 },
      { canal: "Varejo", valor: 400000 },
    ],
    principaisClientes: [
      {
        id: "c1",
        nome: "Construtora Horizonte",
        faturamentoMensal: 650000,
        margemPercentual: 22,
      },
      {
        id: "c4",
        nome: "Grupo Alfa Engenharia",
        faturamentoMensal: 580000,
        margemPercentual: 20,
      },
      {
        id: "c2",
        nome: "Vidraçaria Central",
        faturamentoMensal: 520000,
        margemPercentual: 19,
      },
      {
        id: "c5",
        nome: "Incorporadora Atlântica",
        faturamentoMensal: 470000,
        margemPercentual: 21,
      },
    ],
    distribuicaoTicket: [
      8000, 9500, 12000, 15000, 16000, 17500, 18000, 19000, 21000, 23000, 26000,
      28000,
    ],
    vendasCanalMes: [
      { canal: "Construtoras", mes: "Jan", valor: 360000 },
      { canal: "Construtoras", mes: "Fev", valor: 370000 },
      { canal: "Construtoras", mes: "Mar", valor: 380000 },
      { canal: "Construtoras", mes: "Abr", valor: 390000 },
      { canal: "Vidraçarias", mes: "Jan", valor: 290000 },
      { canal: "Vidraçarias", mes: "Fev", valor: 300000 },
      { canal: "Vidraçarias", mes: "Mar", valor: 310000 },
      { canal: "Vidraçarias", mes: "Abr", valor: 320000 },
      { canal: "Projetos especiais", mes: "Jan", valor: 190000 },
      { canal: "Projetos especiais", mes: "Fev", valor: 200000 },
      { canal: "Projetos especiais", mes: "Mar", valor: 205000 },
      { canal: "Projetos especiais", mes: "Abr", valor: 210000 },
      { canal: "Varejo", mes: "Jan", valor: 90000 },
      { canal: "Varejo", mes: "Fev", valor: 95000 },
      { canal: "Varejo", mes: "Mar", valor: 98000 },
      { canal: "Varejo", mes: "Abr", valor: 100000 },
    ],
  };
}


