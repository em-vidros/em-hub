import { KpiCard } from "@/components/dashboard/kpi-card";
import { TimeSeriesChart } from "@/components/dashboard/time-series-chart";
import { CategoryBarChart } from "@/components/dashboard/category-bar-chart";
import { SectionCard } from "@/components/dashboard/section-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCustosMockData } from "@/data/insights";

export default function CustosPage() {
  const data = getCustosMockData("30d");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.custoTotal} variant="currency" />
        <KpiCard kpi={data.kpis.custoPorM2} variant="currency" />
        <KpiCard kpi={data.kpis.margemBruta} variant="percentage" />
        <KpiCard kpi={data.kpis.variacaoCusto} variant="percentage" />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="Custos por mês"
          subtitle="Evolução e variação"
        >
          <TimeSeriesChart
            data={data.custosPorMes.map((p) => ({
              label: new Date(p.date).toLocaleDateString("pt-BR", {
                month: "short",
              }),
              value: p.valor,
            }))}
            yLabel="Custo total (R$)"
          />
        </SectionCard>
        <SectionCard
          title="Custos por categoria"
          subtitle="Distribuição percentual"
        >
          <CategoryBarChart
            data={data.custosPorCategoria.map((c) => ({
              label: c.categoria,
              value: c.percentual,
            }))}
            suffix="%"
          />
        </SectionCard>
      </section>

      <section>
        <SectionCard
          title="Detalhamento de custos"
          subtitle="Por categoria"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoria</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Percentual</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.custosPorCategoria.map((categoria, idx) => (
                <TableRow key={idx}>
                  <TableCell>{categoria.categoria}</TableCell>
                  <TableCell>
                    {categoria.valor.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell>{categoria.percentual.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </section>
    </div>
  );
}


