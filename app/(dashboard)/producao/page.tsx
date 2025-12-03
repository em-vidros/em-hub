import { KpiCard } from "@/components/dashboard/kpi-card";
import { CategoryBarChart } from "@/components/dashboard/category-bar-chart";
import { AdvancedScatterChart } from "@/components/dashboard/scatter-chart";
import { HeatmapChart } from "@/components/dashboard/heatmap-chart";
import { SectionCard } from "@/components/dashboard/section-card";
import { StatusPill } from "@/components/dashboard/status-pill";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProducaoMockData } from "@/data/producao";
import {
  getHeatmapTurnoDia,
  getOeeVsRetrabalho,
} from "@/lib/analytics-client";

// Aproveita o full-route cache do Next 16 para esta página de analytics,
// revalidando os dados agregados de produção a cada 5 minutos em produção.
export const revalidate = 300;

export default async function ProducaoPage() {
  const [data, scatter, heatmap] = await Promise.all([
    Promise.resolve(getProducaoMockData("30d")),
    getOeeVsRetrabalho(),
    getHeatmapTurnoDia(),
  ]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.produtividadeMedia} />
        <KpiCard kpi={data.kpis.oee} variant="percentage" />
        <KpiCard kpi={data.kpis.tempoParada} />
        <KpiCard kpi={data.kpis.retrabalho} variant="percentage" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="Produção por turno"
          subtitle="Volume produzido em m², últimos 30 dias"
        >
          <CategoryBarChart
            data={data.producaoPorTurno.map((t) => ({
              label: t.turno,
              value: t.volumeM2,
            }))}
          />
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            {data.producaoPorTurno.map((t) => (
              <div key={t.turno} className="flex flex-col">
                <span className="font-medium text-foreground">{t.turno}</span>
                <span>
                  {t.volumeM2.toLocaleString("pt-BR", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  m²
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="OEE vs. retrabalho por linha"
          subtitle="Correlação entre eficiência e retrabalho"
        >
          <AdvancedScatterChart
            data={
              scatter?.points?.length
                ? scatter.points
                : data.linhas.map((linha) => ({
                    x: linha.oeePercentual,
                    y: linha.retrabalhoPercentual,
                    z:
                      linha.status === "critico"
                        ? 2.5
                        : linha.status === "alerta"
                          ? 1.5
                          : 0.8,
                    label: linha.nome,
                    category: linha.status,
                  }))
            }
            regression={scatter?.regression}
            correlation={scatter?.correlation}
            total_ok={scatter?.total_ok}
            total_alerta={scatter?.total_alerta}
            total_critico={scatter?.total_critico}
            xLabel="OEE"
            yLabel="Retrabalho"
          />
        </SectionCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="Mapa de calor por turno e dia"
          subtitle="Volume produzido por turno e dia da semana"
        >
          <HeatmapChart
            data={
              heatmap.length
                ? heatmap
                : data.volumeTurnoDia.map((item) => ({
                    x: item.turno,
                    y: item.diaSemana,
                    value: item.volumeM2,
                  }))
            }
            xLabel="Turno"
            yLabel="Dia da semana"
          />
        </SectionCard>

        <SectionCard
          title="Linhas de produção"
          subtitle="Status, OEE e retrabalho por linha"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Linha</TableHead>
                <TableHead>OEE</TableHead>
                <TableHead>Retrabalho</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.linhas.map((linha) => (
                <TableRow key={linha.id}>
                  <TableCell>{linha.nome}</TableCell>
                  <TableCell>{linha.oeePercentual.toFixed(1)}%</TableCell>
                  <TableCell>
                    {linha.retrabalhoPercentual.toFixed(1)}%
                  </TableCell>
                  <TableCell>
                    <StatusPill status={linha.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </section>
    </div>
  );
}


