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
import { getRiscosMockData } from "@/data/analises";

export default function RiscosPage() {
  const data = getRiscosMockData("30d");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.riscosIdentificados} />
        <KpiCard kpi={data.kpis.riscosCriticos} />
        <KpiCard kpi={data.kpis.mitigacoes} />
        <KpiCard kpi={data.kpis.exposicao} variant="percentage" />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <SectionCard
          title="Evolução de riscos"
          subtitle="Total e riscos críticos"
        >
          <TimeSeriesChart
            data={data.evolucaoRiscos.map((p) => ({
              label: new Date(p.date).toLocaleDateString("pt-BR", {
                month: "short",
              }),
              value: p.total,
            }))}
            yLabel="Total de riscos"
          />
        </SectionCard>
        <SectionCard
          title="Riscos por categoria"
          subtitle="Distribuição e severidade"
        >
          <CategoryBarChart
            data={data.riscosPorCategoria.map((r) => ({
              label: r.categoria,
              value: r.quantidade,
            }))}
            yLabel="Quantidade de riscos"
          />
        </SectionCard>
      </section>

      <section>
        <SectionCard
          title="Top riscos"
          subtitle="Probabilidade, impacto e status"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Probabilidade</TableHead>
                <TableHead>Impacto</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.topRiscos.map((risco) => (
                <TableRow key={risco.id}>
                  <TableCell>{risco.descricao}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risco.probabilidade === "Alta" ? "bg-red-100 text-red-800" :
                      risco.probabilidade === "Média" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {risco.probabilidade}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risco.impacto === "Alto" ? "bg-red-100 text-red-800" :
                      risco.impacto === "Médio" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {risco.impacto}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      risco.status === "Mitigado" ? "bg-green-100 text-green-800" :
                      risco.status === "Em mitigação" ? "bg-blue-100 text-blue-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {risco.status}
                    </span>
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


