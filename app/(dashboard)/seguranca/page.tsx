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
import { getSegurancaMockData } from "@/data/insights";

export default function SegurancaPage() {
  const data = getSegurancaMockData("30d");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.acidentes} />
        <KpiCard kpi={data.kpis.diasSemAcidente} />
        <KpiCard kpi={data.kpis.treinamentos} />
        <KpiCard kpi={data.kpis.conformidade} variant="percentage" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="Acidentes por mês"
          subtitle="Evolução e severidade"
        >
          <TimeSeriesChart
            data={data.acidentesPorMes.map((p) => ({
              label: new Date(p.date).toLocaleDateString("pt-BR", {
                month: "short",
              }),
              value: p.quantidade,
            }))}
            yLabel="Quantidade de acidentes"
          />
        </SectionCard>
        <SectionCard
          title="Áreas de risco"
          subtitle="Nível de risco por área"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Área</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Última ocorrência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.areasRisco.map((area, idx) => (
                <TableRow key={idx}>
                  <TableCell>{area.area}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      area.nivel === "Alto" ? "bg-red-100 text-red-800" :
                      area.nivel === "Médio" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {area.nivel}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(area.ultimaOcorrencia).toLocaleDateString("pt-BR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </section>
    </div>
  );
}


