import type { KpiValue, Period, SkuEstoqueResumo } from "./types";

export interface EstoqueDashboardData {
  period: Period;
  kpis: {
    estoqueTotal: KpiValue;
    itensCriticos: KpiValue;
    giroMedio: KpiValue;
    rupturas: KpiValue;
  };
  estoquePorCategoria: {
    categoria: string;
    nivelAtual: number;
    minimo: number;
  }[];
  skusCriticos: SkuEstoqueResumo[];
}

export function getEstoqueMockData(
  period: Period = "30d",
): EstoqueDashboardData {
  return {
    period,
    kpis: {
      estoqueTotal: {
        label: "Estoque total",
        value: 780000,
        unit: "m²",
        trendPercentage: -2.1,
      },
      itensCriticos: {
        label: "Itens críticos",
        value: 14,
        trendPercentage: 0.0,
      },
      giroMedio: {
        label: "Giro médio",
        value: 5.4,
        unit: "vezes/ano",
        trendPercentage: 0.6,
      },
      rupturas: {
        label: "Rupturas no período",
        value: 3,
        trendPercentage: -1.0,
      },
    },
    estoquePorCategoria: [
      { categoria: "Templados", nivelAtual: 280000, minimo: 240000 },
      { categoria: "Laminados", nivelAtual: 220000, minimo: 210000 },
      { categoria: "Insulados", nivelAtual: 140000, minimo: 130000 },
      { categoria: "Acessórios", nivelAtual: 140000, minimo: 100000 },
    ],
    skusCriticos: [
      {
        id: "s1",
        codigo: "VT-08-TEMP",
        descricao: "Vidro temperado incolor 8mm",
        categoria: "Templados",
        nivelAtual: 9500,
        minimo: 12000,
        maximo: 25000,
      },
      {
        id: "s2",
        codigo: "VL-10-LAM",
        descricao: "Vidro laminado 10mm incolor",
        categoria: "Laminados",
        nivelAtual: 4800,
        minimo: 8000,
        maximo: 20000,
      },
      {
        id: "s3",
        codigo: "VI-06-LOWE",
        descricao: "Vidro insulado 6mm low-e",
        categoria: "Insulados",
        nivelAtual: 3100,
        minimo: 6000,
        maximo: 15000,
      },
      {
        id: "s4",
        codigo: "AC-FIX-001",
        descricao: "Kit fixação fachada structural",
        categoria: "Acessórios",
        nivelAtual: 1200,
        minimo: 2500,
        maximo: 8000,
      },
    ],
  };
}


