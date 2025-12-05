"use client";

import { useMemo } from "react";

import { CategoryBarChart } from "@/components/dashboard/category-bar-chart";
import { AdvancedScatterChart } from "@/components/dashboard/scatter-chart";
import { HeatmapChart } from "@/components/dashboard/heatmap-chart";
import { HistogramChart } from "@/components/dashboard/histogram-chart";
import { SectionCard } from "@/components/dashboard/section-card";

import type {
  ComercialDashboardData,
  DiretoriaDashboardData,
  EstoqueDashboardData,
  ProducaoDashboardData,
} from "@/warehouse/types";

interface OverviewClientProps {
  diretoria: DiretoriaDashboardData;
  producao: ProducaoDashboardData;
  comercial: ComercialDashboardData;
  estoque: EstoqueDashboardData;
}

export function OverviewClient({
  diretoria,
  producao,
  comercial,
  estoque,
}: OverviewClientProps) {
  const eficienciaData = useMemo(
    () =>
      diretoria.eficienciaPorMes.map((p) => ({
        label: new Date(p.date).toLocaleDateString("pt-BR", {
          month: "short",
        }),
        value: p.value,
      })),
    [diretoria.eficienciaPorMes],
  );

  const despesasData = useMemo(
    () =>
      diretoria.despesasPorTipo.map((d) => ({
        label: d.tipo,
        value: d.valor,
      })),
    [diretoria.despesasPorTipo],
  );

  const coberturaData = useMemo(
    () =>
      estoque.coberturaPorCategoria.map((c) => ({
        label: c.categoria,
        value: c.diasCobertura,
      })),
    [estoque.coberturaPorCategoria],
  );

  const scatterData = useMemo(
    () =>
      producao.linhas.map((linha) => ({
        x: linha.oeePercentual,
        y: linha.retrabalhoPercentual,
        z: 4 + Math.random() * 4,
        label: linha.nome,
        category: linha.status,
      })),
    [producao.linhas],
  );

  const heatmapData = useMemo(
    () =>
      producao.volumeTurnoDia.map((ponto) => ({
        x: ponto.diaSemana,
        y: ponto.turno,
        value: ponto.volumeM2,
      })),
    [producao.volumeTurnoDia],
  );

  return (
    <>
      <SectionCard
        title="Eficiência geral"
        subtitle="Últimos 4 meses (%)"
      >
        <AdvancedScatterChart
          data={scatterData}
          xLabel="OEE"
          yLabel="Retrabalho"
        />
      </SectionCard>
      <SectionCard
        title="Volume produzido por turno e dia"
        subtitle="Padrão semanal de carregamento"
      >
        <HeatmapChart
          data={heatmapData}
          xLabel="Dia da semana"
          yLabel="Turno"
        />
      </SectionCard>
      <SectionCard
        title="Distribuição de ticket médio"
        subtitle="Pedidos fechados no período"
      >
        <HistogramChart values={comercial.distribuicaoTicket} unit="R$" />
      </SectionCard>
      <SectionCard
        title="Despesas operacionais"
        subtitle="Perfil de custo industrial"
      >
        <CategoryBarChart data={despesasData} />
      </SectionCard>
      <SectionCard
        title="Cobertura de estoque por categoria"
        subtitle="Dias de atendimento estimados"
      >
        <CategoryBarChart data={coberturaData} suffix=" dias" />
      </SectionCard>
    </>
  );
}


