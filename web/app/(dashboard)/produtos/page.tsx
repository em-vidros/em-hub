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
import { getProdutosMockData } from "@/warehouse/analises";

export default function ProdutosPage() {
  const data = getProdutosMockData("30d");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard kpi={data.kpis.totalProdutos} />
        <KpiCard kpi={data.kpis.produtosAtivos} />
        <KpiCard kpi={data.kpis.margemMedia} variant="percentage" />
        <KpiCard kpi={data.kpis.rotatividade} />
      </section>

      <section className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <SectionCard
          title="Produtos por categoria"
          subtitle="Quantidade e faturamento"
        >
          <CategoryBarChart
            data={data.produtosPorCategoria.map((c) => ({
              label: c.categoria,
              value: c.quantidade,
            }))}
          />
        </SectionCard>
        <SectionCard
          title="Lucratividade de produtos"
          subtitle="Margem e volume"
        >
          <CategoryBarChart
            data={data.lucratividadeProdutos.map((p) => ({
              label: p.produto,
              value: p.margem,
            }))}
            suffix="%"
          />
        </SectionCard>
      </section>

      <section>
        <SectionCard
          title="Produtos mais vendidos"
          subtitle="Volume, faturamento e margem"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead>Volume (m²)</TableHead>
                <TableHead>Faturamento</TableHead>
                <TableHead>Margem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.produtosMaisVendidos.map((produto) => (
                <TableRow key={produto.id}>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>{produto.volume.toLocaleString("pt-BR")}</TableCell>
                  <TableCell>
                    {produto.faturamento.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell>{produto.margem.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>
      </section>
    </div>
  );
}


