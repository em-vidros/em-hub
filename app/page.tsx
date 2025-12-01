export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted">
      <div className="max-w-md text-center">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          EM Hub – EM Vidros
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Business Intelligence para a operação de vidro plano
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Acesse o painel para visualizar indicadores de diretoria, produção,
          comercial e estoque.
        </p>
        <div className="mt-6">
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            Ir para login
          </a>
        </div>
      </div>
    </main>
  );
}
