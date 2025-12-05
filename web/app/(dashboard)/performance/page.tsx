 "use client";

import { useMemo } from "react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { TimeSeriesChart } from "@/components/dashboard/time-series-chart";
import { CategoryBarChart } from "@/components/dashboard/category-bar-chart";
import { HistogramChart } from "@/components/dashboard/histogram-chart";
import { SectionCard } from "@/components/dashboard/section-card";
import { DensityChart } from "@/components/dashboard/density-chart";
import {
  ChartContainer,
  DefaultCartesianGrid,
  CHART_COLORS,
  CHART_STROKE_WIDTH,
} from "@/components/dashboard/chart-theme";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPerformanceMockData } from "@/warehouse/insights";

export default function PerformancePage() {
  const data = useMemo(() => getPerformanceMockData("30d"), []);
  
  const maxEndpointThroughput = useMemo(
    () => Math.max(...data.taxaErroPorEndpoint.map((e) => e.throughput)),
    [data.taxaErroPorEndpoint]
  );

  const performancePorMesData = useMemo(
    () =>
      data.performancePorMes.map((p) => ({
        label: new Date(p.date).toLocaleDateString("pt-BR", {
          month: "short",
        }),
        throughput: p.throughput,
        latencia: p.latencia,
      })),
    [data.performancePorMes]
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.throughput} />
        <KpiCard kpi={data.kpis.latencia} />
        <KpiCard kpi={data.kpis.uptime} variant="percentage" />
        <KpiCard kpi={data.kpis.taxaErro} variant="percentage" />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <SectionCard
          title="Throughput × Latência por mês"
          subtitle="Comparação entre volume processado e tempo de resposta"
        >
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%" minHeight={0}>
              <LineChart
                data={performancePorMesData}
                margin={{ top: 8, right: 24, bottom: 8, left: 0 }}
              >
                <DefaultCartesianGrid />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(v) =>
                    v >= 1_000 ? `${(v / 1_000).toFixed(0)}k` : `${v}`
                  }
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  tickFormatter={(v) => `${v}ms`}
                />
                <Tooltip contentStyle={{ color: "#000" }} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="throughput"
                  name="Throughput (req/min)"
                  stroke={CHART_COLORS.secondary}
                  strokeWidth={CHART_STROKE_WIDTH}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="latencia"
                  name="Latência P50 (ms)"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={CHART_STROKE_WIDTH}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
          <p className="mt-2 text-xs text-gray-500">
            Mede simultaneamente volume processado e latência mediana, permitindo
            enxergar se ganhos de throughput foram obtidos às custas de piora de
            tempo de resposta.
          </p>
        </SectionCard>
        <SectionCard
          title="Latência P50 por mês"
          subtitle="Tempo de resposta mediano"
        >
          <TimeSeriesChart
            data={data.performancePorMes.map((p) => ({
              label: new Date(p.date).toLocaleDateString("pt-BR", {
                month: "short",
              }),
              value: p.latencia,
            }))}
            yLabel="Latência P50 (ms)"
            suffix="ms"
          />
          <p className="mt-2 text-xs text-gray-500">
            A P50 representa a experiência típica do usuário. Em conjunto com o
            throughput, ajuda a detectar gargalos de CPU, IO ou banco de dados.
          </p>
        </SectionCard>
        <SectionCard
          title="Distribuição de latência"
          subtitle="Histograma de respostas (ms)"
        >
          <HistogramChart values={data.latenciaDistribuicao} unit="ms" />
        </SectionCard>
      </section>

      <section>
        <SectionCard
          title="Densidade de latência"
          subtitle="Curva de densidade aproximada (ms) – período atual vs. anterior"
        >
          <DensityChart
            samples={data.latenciaDistribuicao}
            secondarySamples={data.latenciaDistribuicaoAnterior}
            xLabel="Latência de resposta (ms)"
          />
        </SectionCard>
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="Taxa de erro por endpoint"
          subtitle="Percentual de respostas com falha e throughput normalizado"
        >
          <CategoryBarChart
            data={data.taxaErroPorEndpoint.map((e) => ({
              label: e.endpoint,
              value: e.taxaErro * 100,
              secondaryValue:
                maxEndpointThroughput > 0
                  ? (e.throughput / maxEndpointThroughput) * 100
                  : 0,
            }))}
            suffix="%"
          />
          <p className="mt-2 text-xs text-gray-500">
            Ajuda a priorizar correções em APIs mais críticas, cruzando volume
            atendido e taxa de erro. Endpoints com alto throughput e erro acima
            da média são candidatos a revisão imediata.
          </p>
        </SectionCard>
        <SectionCard
          title="Top processos internos"
          subtitle="Tempo médio de execução e volume processado"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Processo</TableHead>
                <TableHead>Tempo médio</TableHead>
                <TableHead>Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.topProcessos.map((processo) => (
                <TableRow key={processo.id}>
                  <TableCell>{processo.nome}</TableCell>
                  <TableCell>{processo.tempoMedio} min</TableCell>
                  <TableCell>
                    {processo.volume.toLocaleString("pt-BR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="mt-2 text-xs text-gray-500">
            Processos com tempo médio alto e grande volume tendem a ser os
            principais candidatos para otimização de fila, paralelismo ou
            ajuste de capacidade.
          </p>
        </SectionCard>
      </section>
    </div>
  );
}


