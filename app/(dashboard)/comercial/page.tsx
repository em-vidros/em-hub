import { KpiCard } from "@/components/dashboard/kpi-card";
import { CategoryBarChart } from "@/components/dashboard/category-bar-chart";
import { TimeSeriesChart } from "@/components/dashboard/time-series-chart";
import { HistogramChart } from "@/components/dashboard/histogram-chart";
import { SmallMultipleTimeSeries } from "@/components/dashboard/small-multiple-time-series";
import { JointDistributionChart } from "@/components/dashboard/joint-distribution-chart";
import { SectionCard } from "@/components/dashboard/section-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getComercialMockData } from "@/data/comercial";
import { getDistribuicaoTicket } from "@/lib/analytics-client";
import { DonutCategoryChart } from "@/components/dashboard/donut-category-chart";


export const revalidate = 300;

export default async function ComercialPage() {
  const [data, distTicket] = await Promise.all([
    Promise.resolve(getComercialMockData("30d")),
    getDistribuicaoTicket(),
  ]);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.vendasTotais} variant="currency" />
        <KpiCard kpi={data.kpis.ticketMedio} variant="currency" />
        <KpiCard kpi={data.kpis.novosClientes} />
        <KpiCard kpi={data.kpis.taxaConversao} variant="percentage" />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="Vendas por mês"
          subtitle="Tendência de faturamento"
        >
          <TimeSeriesChart
            data={data.vendasPorMes.map((p) => ({
              label: new Date(p.date).toLocaleDateString("pt-BR", {
                month: "short",
              }),
              value: p.value,
            }))}
            yLabel="Faturamento mensal"
          />
        </SectionCard>

        <SectionCard
          title="Vendas por canal"
          subtitle="Distribuição da receita por canal"
        >
          <DonutCategoryChart
            data={data.vendasPorCanal.map((canal) => ({
              label: canal.canal,
              value: canal.valor,
            }))}
          />
        </SectionCard>
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="Distribuição de tickets"
          subtitle="Histograma por faixa de valor de pedido"
        >
          <HistogramChart
            values={
              distTicket?.values?.length
                ? distTicket.values
                : data.distribuicaoTicket ?? []
            }
            bins={distTicket?.bins}
            density={distTicket?.density}
            stats={distTicket?.stats}
            unit="R$"
          />
        </SectionCard>

        <SectionCard
          title="Principais clientes"
          subtitle="Top contas por faturamento"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Faturamento</TableHead>
                <TableHead>Margem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.principaisClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>
                    {cliente.faturamentoMensal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell>{cliente.margemPercentual.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="Funil de vendas"
          subtitle="Conversão por etapa e valor em pipeline"
        >
          <CategoryBarChart
            data={data.funilVendas.map((etapa) => ({
              label: etapa.etapa,
              value: etapa.taxaConversao,
              secondaryValue:
                (etapa.valorTotal / data.kpis.vendasTotais.value) * 100,
            }))}
            suffix="%"
          />
          <p className="mt-2 text-xs text-gray-500">
            A primeira barra mostra a taxa de conversão da etapa; a segunda, a
            participação do valor em pipeline em relação às vendas totais do
            período. Isso ajuda a priorizar onde focar esforços comerciais.
          </p>
        </SectionCard>
        <SectionCard
          title="Joint distribution clientes"
          subtitle="Faturamento mensal × margem percentual"
        >
          <JointDistributionChart
            points={data.principaisClientes.map((c) => ({
              x: c.faturamentoMensal,
              y: c.margemPercentual,
              label: c.nome,
            }))}
            xLabel="Faturamento mensal (R$)"
            yLabel="Margem (%)"
          />
        </SectionCard>
      </section>

      <section>
        <SectionCard
          title="Receita mensal por canal"
          subtitle="Small multiples comparando a evolução de cada canal"
        >
          <SmallMultipleTimeSeries
            series={Array.from(
              new Map(
                data.vendasCanalMes.map((item) => [
                  item.canal,
                  data.vendasCanalMes.filter((i) => i.canal === item.canal),
                ]),
              ).entries(),
            ).map(([canal, pontos]) => ({
              name: canal,
              points: (pontos as typeof data.vendasCanalMes).map((p) => ({
                label: p.mes,
                value: p.valor,
              })),
            }))}
          />
        </SectionCard>
      </section>
    </div>
  );
}


