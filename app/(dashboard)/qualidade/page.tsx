import { KpiCard } from "@/components/dashboard/kpi-card";
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
import { getQualidadeMockData } from "@/data/insights";

export default function QualidadePage() {
  const data = getQualidadeMockData("30d");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.taxaAprovacao} variant="percentage" />
        <KpiCard kpi={data.kpis.retrabalho} variant="percentage" />
        <KpiCard kpi={data.kpis.defeitos} />
        <KpiCard kpi={data.kpis.satisfacao} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="Qualidade por produto"
          subtitle="Taxa de aprovação"
        >
          <CategoryBarChart
            data={data.qualidadePorProduto.map((p) => ({
              label: p.produto,
              value: p.taxaAprovacao,
            }))}
            yLabel="Taxa de aprovação (%)"
            suffix="%"
          />
        </SectionCard>
        <SectionCard
          title="Defeitos por tipo"
          subtitle="Distribuição de defeitos"
        >
          <CategoryBarChart
            data={data.defeitosPorTipo.map((d) => ({
              label: d.tipo,
              value: d.percentual,
            }))}
            yLabel="Percentual (%)"
            suffix="%"
          />
        </SectionCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="Qualidade por produto"
          subtitle="Taxa de aprovação e defeitos"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Taxa aprovação</TableHead>
                <TableHead>Defeitos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.qualidadePorProduto.map((produto, idx) => (
                <TableRow key={idx}>
                  <TableCell>{produto.produto}</TableCell>
                  <TableCell>{produto.taxaAprovacao.toFixed(1)}%</TableCell>
                  <TableCell>{produto.defeitos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
        <SectionCard
          title="Defeitos por tipo"
          subtitle="Quantidade e percentual"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Percentual</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.defeitosPorTipo.map((defeito, idx) => (
                <TableRow key={idx}>
                  <TableCell>{defeito.tipo}</TableCell>
                  <TableCell>{defeito.quantidade}</TableCell>
                  <TableCell>{defeito.percentual.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </section>
    </div>
  );
}


