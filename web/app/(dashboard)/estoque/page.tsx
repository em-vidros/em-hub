import { KpiCard } from "@/components/dashboard/kpi-card";
import { SectionCard } from "@/components/dashboard/section-card";
import { DonutCategoryChart } from "@/components/dashboard/donut-category-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getEstoqueMockData } from "@/warehouse/estoque";

export default function EstoquePage() {
  const data = getEstoqueMockData("30d");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.estoqueTotal} />
        <KpiCard kpi={data.kpis.itensCriticos} />
        <KpiCard kpi={data.kpis.giroMedio} />
        <KpiCard kpi={data.kpis.rupturas} />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="Estoque por categoria"
          subtitle="Nível atual vs. mínimo recomendado"
        >
          <DonutCategoryChart
            data={data.estoquePorCategoria.map((c) => ({
              label: c.categoria,
              value: c.nivelAtual,
            }))}
          />
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground md:grid-cols-4">
            {data.estoquePorCategoria.map((categoria) => (
              <div key={categoria.categoria} className="flex flex-col">
                <span className="font-medium text-foreground">
                  {categoria.categoria}
                </span>
                <span>
                  Atual:{" "}
                  {categoria.nivelAtual.toLocaleString("pt-BR", {
                    maximumFractionDigits: 0,
                  })}
                </span>
                <span>Mínimo: {categoria.minimo.toLocaleString("pt-BR")}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="SKUs críticos"
          subtitle="Itens abaixo do nível mínimo"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Nível atual</TableHead>
                <TableHead>Mínimo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.skusCriticos.map((sku) => (
                <TableRow key={sku.id}>
                  <TableCell>{sku.codigo}</TableCell>
                  <TableCell>{sku.descricao}</TableCell>
                  <TableCell>{sku.nivelAtual.toLocaleString("pt-BR")}</TableCell>
                  <TableCell>{sku.minimo.toLocaleString("pt-BR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </section>
    </div>
  );
}


