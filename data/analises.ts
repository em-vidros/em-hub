import { Period } from "./types";

export interface ClientesData {
  period: Period;
  kpis: {
    totalClientes: { label: string; value: number; trendPercentage: number };
    novosClientes: { label: string; value: number; trendPercentage: number };
    retencao: { label: string; value: number; unit: string; trendPercentage: number };
    ticketMedio: { label: string; value: number; unit: string; trendPercentage: number };
  };
  principaisClientes: Array<{ id: string; nome: string; faturamento: number; margem: number; pedidos: number }>;
  clientesPorSegmento: Array<{ segmento: string; quantidade: number; faturamento: number }>;
  evolucaoClientes: Array<{ date: string; total: number; novos: number }>;
}

export interface ProdutosData {
  period: Period;
  kpis: {
    totalProdutos: { label: string; value: number; trendPercentage: number };
    produtosAtivos: { label: string; value: number; trendPercentage: number };
    margemMedia: { label: string; value: number; unit: string; trendPercentage: number };
    rotatividade: { label: string; value: number; unit: string; trendPercentage: number };
  };
  produtosMaisVendidos: Array<{ id: string; nome: string; volume: number; faturamento: number; margem: number }>;
  produtosPorCategoria: Array<{ categoria: string; quantidade: number; faturamento: number }>;
  lucratividadeProdutos: Array<{ produto: string; margem: number; volume: number }>;
}

export interface ProcessosData {
  period: Period;
  kpis: {
    processosAtivos: { label: string; value: number; trendPercentage: number };
    tempoMedio: { label: string; value: number; unit: string; trendPercentage: number };
    eficiencia: { label: string; value: number; unit: string; trendPercentage: number };
    gargalos: { label: string; value: number; trendPercentage: number };
  };
  processosPorEtapa: Array<{ etapa: string; tempoMedio: number; volume: number }>;
  gargalosIdentificados: Array<{ processo: string; impacto: string; tempoPerdido: number }>;
  melhoriaProcessos: Array<{ processo: string; antes: number; depois: number; ganho: number }>;
}

export interface RiscosData {
  period: Period;
  kpis: {
    riscosIdentificados: { label: string; value: number; trendPercentage: number };
    riscosCriticos: { label: string; value: number; trendPercentage: number };
    mitigacoes: { label: string; value: number; trendPercentage: number };
    exposicao: { label: string; value: number; unit: string; trendPercentage: number };
  };
  riscosPorCategoria: Array<{ categoria: string; quantidade: number; severidade: string }>;
  topRiscos: Array<{ id: string; descricao: string; probabilidade: string; impacto: string; status: string }>;
  evolucaoRiscos: Array<{ date: string; total: number; criticos: number }>;
}

export function getClientesMockData(period: Period = "30d"): ClientesData {
  return {
    period,
    kpis: {
      totalClientes: { label: "Total de clientes", value: 342, trendPercentage: 5.2 },
      novosClientes: { label: "Novos clientes", value: 18, trendPercentage: 12.5 },
      retencao: { label: "Taxa de retenção", value: 87.3, unit: "%", trendPercentage: 2.1 },
      ticketMedio: { label: "Ticket médio", value: 18200, unit: "R$", trendPercentage: 3.4 },
    },
    principaisClientes: [
      { id: "c1", nome: "Construtora Horizonte", faturamento: 650000, margem: 22, pedidos: 45 },
      { id: "c2", nome: "Vidraçaria Central", faturamento: 520000, margem: 19, pedidos: 38 },
      { id: "c3", nome: "Shopping Vale", faturamento: 430000, margem: 20, pedidos: 32 },
      { id: "c4", nome: "Grupo Alfa Engenharia", faturamento: 580000, margem: 20, pedidos: 42 },
    ],
    clientesPorSegmento: [
      { segmento: "Construtoras", quantidade: 125, faturamento: 2100000 },
      { segmento: "Vidraçarias", quantidade: 98, faturamento: 1200000 },
      { segmento: "Projetos especiais", quantidade: 65, faturamento: 800000 },
      { segmento: "Varejo", quantidade: 54, faturamento: 400000 },
    ],
    evolucaoClientes: [
      { date: "2025-01-01", total: 324, novos: 12 },
      { date: "2025-02-01", total: 332, novos: 15 },
      { date: "2025-03-01", total: 338, novos: 16 },
      { date: "2025-04-01", total: 342, novos: 18 },
    ],
  };
}

export function getProdutosMockData(period: Period = "30d"): ProdutosData {
  return {
    period,
    kpis: {
      totalProdutos: { label: "Total de produtos", value: 156, trendPercentage: 3.3 },
      produtosAtivos: { label: "Produtos ativos", value: 142, trendPercentage: 2.9 },
      margemMedia: { label: "Margem média", value: 19.8, unit: "%", trendPercentage: 0.5 },
      rotatividade: { label: "Rotatividade", value: 5.4, unit: "vezes/ano", trendPercentage: 0.6 },
    },
    produtosMaisVendidos: [
      { id: "p1", nome: "Vidro temperado 8mm", volume: 45000, faturamento: 720000, margem: 22 },
      { id: "p2", nome: "Vidro laminado 10mm", volume: 38000, faturamento: 684000, margem: 20 },
      { id: "p3", nome: "Vidro insulado 6mm", volume: 28000, faturamento: 560000, margem: 18 },
      { id: "p4", nome: "Espelho decorativo", volume: 12000, faturamento: 240000, margem: 25 },
    ],
    produtosPorCategoria: [
      { categoria: "Templados", quantidade: 45, faturamento: 1800000 },
      { categoria: "Laminados", quantidade: 38, faturamento: 1520000 },
      { categoria: "Insulados", quantidade: 28, faturamento: 840000 },
      { categoria: "Acessórios", quantidade: 45, faturamento: 360000 },
    ],
    lucratividadeProdutos: [
      { produto: "Espelho decorativo", margem: 25, volume: 12000 },
      { produto: "Vidro temperado 8mm", margem: 22, volume: 45000 },
      { produto: "Vidro laminado 10mm", margem: 20, volume: 38000 },
      { produto: "Vidro insulado 6mm", margem: 18, volume: 28000 },
    ],
  };
}

export function getProcessosMockData(period: Period = "30d"): ProcessosData {
  return {
    period,
    kpis: {
      processosAtivos: { label: "Processos ativos", value: 12, trendPercentage: 0 },
      tempoMedio: { label: "Tempo médio de ciclo", value: 4.2, unit: "h", trendPercentage: -5.1 },
      eficiencia: { label: "Eficiência de processos", value: 86.3, unit: "%", trendPercentage: 2.3 },
      gargalos: { label: "Gargalos identificados", value: 3, trendPercentage: -25 },
    },
    processosPorEtapa: [
      { etapa: "Corte", tempoMedio: 0.5, volume: 125000 },
      { etapa: "Têmpera", tempoMedio: 2.0, volume: 98000 },
      { etapa: "Laminação", tempoMedio: 1.5, volume: 112000 },
      { etapa: "Inspeção", tempoMedio: 0.2, volume: 125000 },
    ],
    gargalosIdentificados: [
      { processo: "Forno Têmpera B", impacto: "Alto", tempoPerdido: 45 },
      { processo: "Corte automático", impacto: "Médio", tempoPerdido: 28 },
      { processo: "Laminação", impacto: "Baixo", tempoPerdido: 15 },
    ],
    melhoriaProcessos: [
      { processo: "Corte automático", antes: 0.7, depois: 0.5, ganho: 28.6 },
      { processo: "Têmpera", antes: 2.3, depois: 2.0, ganho: 13.0 },
      { processo: "Inspeção", antes: 0.3, depois: 0.2, ganho: 33.3 },
    ],
  };
}

export function getRiscosMockData(period: Period = "30d"): RiscosData {
  return {
    period,
    kpis: {
      riscosIdentificados: { label: "Riscos identificados", value: 24, trendPercentage: -8.3 },
      riscosCriticos: { label: "Riscos críticos", value: 3, trendPercentage: -25 },
      mitigacoes: { label: "Mitigações implementadas", value: 18, trendPercentage: 12.5 },
      exposicao: { label: "Exposição ao risco", value: 12.5, unit: "%", trendPercentage: -2.3 },
    },
    riscosPorCategoria: [
      { categoria: "Operacional", quantidade: 10, severidade: "Média" },
      { categoria: "Segurança", quantidade: 6, severidade: "Alta" },
      { categoria: "Qualidade", quantidade: 5, severidade: "Média" },
      { categoria: "Financeiro", quantidade: 3, severidade: "Baixa" },
    ],
    topRiscos: [
      { id: "r1", descricao: "Falha no forno têmpera", probabilidade: "Média", impacto: "Alto", status: "Em mitigação" },
      { id: "r2", descricao: "Acidente de trabalho", probabilidade: "Baixa", impacto: "Alto", status: "Monitorado" },
      { id: "r3", descricao: "Ruptura de estoque", probabilidade: "Média", impacto: "Médio", status: "Mitigado" },
      { id: "r4", descricao: "Variação de custos", probabilidade: "Alta", impacto: "Médio", status: "Em mitigação" },
    ],
    evolucaoRiscos: [
      { date: "2025-01-01", total: 28, criticos: 5 },
      { date: "2025-02-01", total: 26, criticos: 4 },
      { date: "2025-03-01", total: 25, criticos: 4 },
      { date: "2025-04-01", total: 24, criticos: 3 },
    ],
  };
}


