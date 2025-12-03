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
import { getClientesMockData } from "@/data/analises";

export default function ClientesPage() {
  const data = getClientesMockData("30d");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.totalClientes} />
        <KpiCard kpi={data.kpis.novosClientes} />
        <KpiCard kpi={data.kpis.retencao} variant="percentage" />
        <KpiCard kpi={data.kpis.ticketMedio} variant="currency" />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="Evolução de clientes"
          subtitle="Total e novos clientes"
        >
          <TimeSeriesChart
            data={data.evolucaoClientes.map((p) => ({
              label: new Date(p.date).toLocaleDateString("pt-BR", {
                month: "short",
              }),
              value: p.total,
            }))}
            yLabel="Total de clientes"
          />
        </SectionCard>
        <SectionCard
          title="Clientes por segmento"
          subtitle="Distribuição por categoria"
        >
          <CategoryBarChart
            data={data.clientesPorSegmento.map((s) => ({
              label: s.segmento,
              value: s.quantidade,
            }))}
            yLabel="Quantidade de clientes"
          />
        </SectionCard>
      </section>

      <section>
        <SectionCard
          title="Principais clientes"
          subtitle="Por faturamento e margem"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Faturamento</TableHead>
                <TableHead>Margem</TableHead>
                <TableHead>Pedidos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.principaisClientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.nome}</TableCell>
                  <TableCell>
                    {cliente.faturamento.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell>{cliente.margem.toFixed(1)}%</TableCell>
                  <TableCell>{cliente.pedidos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </section>
    </div>
  );
}


