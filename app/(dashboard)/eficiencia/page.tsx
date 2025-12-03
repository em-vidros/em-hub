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
import { getEficienciaMockData } from "@/data/insights";

export default function EficienciaPage() {
  const data = getEficienciaMockData("30d");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.oeeGeral} variant="percentage" />
        <KpiCard kpi={data.kpis.produtividade} />
        <KpiCard kpi={data.kpis.utilizacao} variant="percentage" />
        <KpiCard kpi={data.kpis.desperdicio} variant="percentage" />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="OEE por linha"
          subtitle="Eficiência geral de equipamentos"
        >
          <CategoryBarChart
            data={data.eficienciaPorLinha.map((l) => ({
              label: l.linha,
              value: l.oee,
            }))}
            yLabel="OEE (%)"
            suffix="%"
          />
        </SectionCard>
        <SectionCard
          title="Eficiência por turno"
          subtitle="OEE e volume por turno"
        >
          <CategoryBarChart
            data={data.eficienciaPorTurno.map((t) => ({
              label: t.turno,
              value: t.oee,
            }))}
            yLabel="OEE (%)"
            suffix="%"
          />
        </SectionCard>
      </section>

      <section>
        <SectionCard
          title="Detalhamento por linha"
          subtitle="OEE e produtividade"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Linha</TableHead>
                <TableHead>OEE</TableHead>
                <TableHead>Produtividade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.eficienciaPorLinha.map((linha, idx) => (
                <TableRow key={idx}>
                  <TableCell>{linha.linha}</TableCell>
                  <TableCell>{linha.oee.toFixed(1)}%</TableCell>
                  <TableCell>{linha.produtividade} m²/h</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </section>
    </div>
  );
}


