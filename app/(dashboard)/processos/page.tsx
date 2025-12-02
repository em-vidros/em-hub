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
import { getProcessosMockData } from "@/data/analises";

export default function ProcessosPage() {
  const data = getProcessosMockData("30d");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.processosAtivos} />
        <KpiCard kpi={data.kpis.tempoMedio} />
        <KpiCard kpi={data.kpis.eficiencia} variant="percentage" />
        <KpiCard kpi={data.kpis.gargalos} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="Tempo por etapa"
          subtitle="Tempo médio de processamento"
        >
          <CategoryBarChart
            data={data.processosPorEtapa.map((e) => ({
              label: e.etapa,
              value: e.tempoMedio,
            }))}
            yLabel="Tempo médio (h)"
            suffix="h"
          />
        </SectionCard>
        <SectionCard
          title="Gargalos identificados"
          subtitle="Impacto e tempo perdido"
        >
          <CategoryBarChart
            data={data.gargalosIdentificados.map((g) => ({
              label: g.processo,
              value: g.tempoPerdido,
            }))}
            yLabel="Tempo perdido (h)"
            suffix="h"
          />
        </SectionCard>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="Processos por etapa"
          subtitle="Tempo médio e volume"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Etapa</TableHead>
                <TableHead>Tempo médio</TableHead>
                <TableHead>Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.processosPorEtapa.map((etapa, idx) => (
                <TableRow key={idx}>
                  <TableCell>{etapa.etapa}</TableCell>
                  <TableCell>{etapa.tempoMedio} h</TableCell>
                  <TableCell>{etapa.volume.toLocaleString("pt-BR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
        <SectionCard
          title="Melhorias implementadas"
          subtitle="Ganho de eficiência"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Processo</TableHead>
                <TableHead>Antes</TableHead>
                <TableHead>Depois</TableHead>
                <TableHead>Ganho</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.melhoriaProcessos.map((melhoria, idx) => (
                <TableRow key={idx}>
                  <TableCell>{melhoria.processo}</TableCell>
                  <TableCell>{melhoria.antes} h</TableCell>
                  <TableCell>{melhoria.depois} h</TableCell>
                  <TableCell className="text-green-600 font-medium">
                    {melhoria.ganho.toFixed(1)}%
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


