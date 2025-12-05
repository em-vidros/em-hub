import { KpiCard } from "@/components/dashboard/kpi-card";
import { TimeSeriesChart } from "@/components/dashboard/time-series-chart";
import { SectionCard } from "@/components/dashboard/section-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDiretoriaMockData } from "@/warehouse/diretoria";

export default function DiretoriaPage() {
  const data = getDiretoriaMockData("30d");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard kpi={data.kpis.faturamento} variant="currency" />
        <KpiCard kpi={data.kpis.margem} variant="percentage" />
        <KpiCard kpi={data.kpis.volumeProduzido} />
        <KpiCard kpi={data.kpis.eficienciaGeral} variant="percentage" />
        <KpiCard kpi={data.kpis.acidentes} />
        <KpiCard kpi={data.kpis.retrabalho} variant="percentage" />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="Faturamento mensal"
          subtitle="Últimos 4 meses (R$)"
        >
          <TimeSeriesChart
            data={data.faturamentoPorMes.map((p) => ({
              label: new Date(p.date).toLocaleDateString("pt-BR", {
                month: "short",
              }),
              value: p.value,
            }))}
            yLabel="Faturamento consolidado"
          />
        </SectionCard>
        <SectionCard
          title="Eficiência geral"
          subtitle="Últimos 4 meses (%)"
        >
          <TimeSeriesChart
            data={data.eficienciaPorMes.map((p) => ({
              label: new Date(p.date).toLocaleDateString("pt-BR", {
                month: "short",
              }),
              value: p.value,
            }))}
            yLabel="Eficiência média por mês"
            suffix="%"
          />
        </SectionCard>
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="Principais clientes"
          subtitle="Por faturamento"
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
        <SectionCard
          title="Produtos mais lucrativos"
          subtitle="Margem e volume"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Faturamento</TableHead>
                <TableHead>Margem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.produtosMaisLucrativos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>
                    {produto.faturamentoMensal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell>{produto.margemPercentual.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </section>
    </div>
  );
}


