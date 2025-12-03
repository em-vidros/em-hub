"use client";

import { useMemo } from "react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { TimeSeriesChart } from "@/components/dashboard/time-series-chart";
import { SectionCard } from "@/components/dashboard/section-card";
import { CategoryBarChart } from "@/components/dashboard/category-bar-chart";
import { AdvancedScatterChart } from "@/components/dashboard/scatter-chart";
import { HeatmapChart } from "@/components/dashboard/heatmap-chart";
import { HistogramChart } from "@/components/dashboard/histogram-chart";

import { getDiretoriaMockData } from "@/data/diretoria";
import { getProducaoMockData } from "@/data/producao";
import { getComercialMockData } from "@/data/comercial";
import { getEstoqueMockData } from "@/data/estoque";

// Página de visão geral ainda usa mocks client-side, então mantemos dinâmica.
// Quando migrar para dados reais via server components, esta configuração poderá ser ajustada.
export const dynamic = "force-dynamic";

export default function OverviewPage() {
  const diretoria = useMemo(() => getDiretoriaMockData("30d"), []);
  const producao = useMemo(() => getProducaoMockData("30d"), []);
  const comercial = useMemo(() => getComercialMockData("30d"), []);
  const estoque = useMemo(() => getEstoqueMockData("30d"), []);

  const scatterData = useMemo(
    () =>
      producao.linhas.map((linha) => ({
        x: linha.oeePercentual,
        y: linha.retrabalhoPercentual,
        z: 4 + Math.random() * 4,
        label: linha.nome,
        category: linha.status,
      })),
    [producao.linhas]
  );

  const heatmapData = useMemo(
    () =>
      producao.volumeTurnoDia.map((ponto) => ({
        x: ponto.diaSemana,
        y: ponto.turno,
        value: ponto.volumeM2,
      })),
    [producao.volumeTurnoDia]
  );

  const faturamentoData = useMemo(
    () =>
      diretoria.faturamentoPorMes.map((p) => ({
        label: new Date(p.date).toLocaleDateString("pt-BR", {
          month: "short",
        }),
        value: p.value,
      })),
    [diretoria.faturamentoPorMes]
  );

  const eficienciaData = useMemo(
    () =>
      diretoria.eficienciaPorMes.map((p) => ({
        label: new Date(p.date).toLocaleDateString("pt-BR", {
          month: "short",
        }),
        value: p.value,
      })),
    [diretoria.eficienciaPorMes]
  );

  const despesasData = useMemo(
    () =>
      diretoria.despesasPorTipo.map((d) => ({
        label: d.tipo,
        value: d.valor,
      })),
    [diretoria.despesasPorTipo]
  );

  const coberturaData = useMemo(
    () =>
      estoque.coberturaPorCategoria.map((c) => ({
        label: c.categoria,
        value: c.diasCobertura,
      })),
    [estoque.coberturaPorCategoria]
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={diretoria.kpis.faturamento} variant="currency" />
        <KpiCard kpi={diretoria.kpis.margem} variant="percentage" />
        <KpiCard kpi={producao.kpis.oee} variant="percentage" />
        <KpiCard kpi={estoque.kpis.estoqueTotal} />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SectionCard
          title="Faturamento mensal"
          subtitle="Últimos 4 meses (R$)"
        >
          <TimeSeriesChart
            data={faturamentoData}
            yLabel="Faturamento consolidado"
          />
          <p className="mt-2 text-xs text-gray-500">
            Série consolidada de faturamento, já descontando devoluções e
            cancelamentos. Útil para acompanhar a cadência de receita do
            negócio.
          </p>
        </SectionCard>

        <SectionCard
          title="Eficiência geral"
          subtitle="Últimos 4 meses (%)"
        >
          <TimeSeriesChart
            data={eficienciaData}
            yLabel="Eficiência média por mês"
            suffix="%"
          />
          <p className="mt-2 text-xs text-gray-500">
            Agrega o desempenho das principais linhas de produção ponderando
            volume fabricado, paradas e retrabalho.
          </p>
        </SectionCard>

        <SectionCard
          title="Distribuição de ticket médio"
          subtitle="Pedidos fechados no período"
        >
          <HistogramChart values={comercial.distribuicaoTicket} unit="R$" />
        </SectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionCard
          title="OEE × Retrabalho por linha"
          subtitle="Correlação entre eficiência e refugo"
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
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
        <SectionCard
          title="Resumo técnico"
          subtitle="Leitura executiva do período"
        >
          <div className="space-y-2 text-xs text-gray-600">
            <p>
              A combinação de faturamento crescente com OEE acima de 80% indica
              bom aproveitamento da capacidade instalada, mas o perfil de
              despesas mostra forte dependência de energia e matéria-prima.
            </p>
            <p>
              O histograma de tickets revela concentração em faixas de médio
              valor, sugerindo espaço para ofertas maiores em projetos
              especiais. A matriz turno × dia destaca oportunidades de
              nivelamento de carga entre turnos.
            </p>
          </div>
        </SectionCard>
      </section>
    </div>
  );
}


