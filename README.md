This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

This project uses [Bun](https://bun.sh) as the runtime and package manager for improved performance.

## Getting Started

### Prerequisites

Install Bun if you haven't already:

```bash
curl -fsSL https://bun.sh/install | bash
```

### Installation

Install dependencies:

```bash
bun install
```

### Development

Run the development server:

```bash
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

> **Note:** This project is configured to use Bun as the runtime. While you can use npm/yarn/pnpm for package management, Bun is the recommended runtime for optimal performance.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Available Scripts

- `bun run dev` - Start the development server
- `bun run build` - Build the application for production
- `bun run start` - Start the production server
- `bun run lint` - Run ESLint

## Caching de analytics com Next 16

Este projeto utiliza o sistema de cache do Next 16 para os dados de analytics
expostos pelo backend Python (`analytics-api`):

- O cliente de analytics em `lib/analytics-client.ts` encapsula `fetch` com:
  - `cache: "force-cache"` + `next.revalidate` e `next.tags` para dados
    agregados cacheáveis
  - `cache: "no-store"` em desenvolvimento ou quando `revalidateSeconds <= 0`
- Páginas de dashboard em `app/(dashboard)` usam full-route cache (via
  `export const revalidate`) sempre que possível.

### Variáveis de ambiente de revalidação

As políticas de revalidação são controladas por variáveis de ambiente
(somente server-side):

- `ANALYTICS_REVALIDATE_SECONDS_DEFAULT`:
  - Tempo padrão de revalidação (segundos) para a maioria dos endpoints de
    analytics
  - Fallback: 300 segundos (5 minutos) em produção/stage
  - Em `NODE_ENV=development`, o helper força `no-store` independentemente
    do valor
- `ANALYTICS_REVALIDATE_SECONDS_SLOW`:
  - Tempo de revalidação para análises mais estáveis (ex.: histogramas)
  - Fallback: 900 segundos (15 minutos) em produção/stage

### Convenções de uso do cliente de analytics

O helper principal é `fetchAnalytics` (usado internamente pelas funções
exportadas em `lib/analytics-client.ts`):

- Em produção/stage:
  - Endpoints agregados comuns usam `ANALYTICS_REVALIDATE_SECONDS_DEFAULT`
  - Endpoints de análises estáveis (como distribuição de ticket) usam
    `ANALYTICS_REVALIDATE_SECONDS_SLOW`
- Em desenvolvimento:
  - Sempre `no-store` para evitar confusão com cache.

Futuramente, rotas ou processos de ETL poderão chamar `revalidateTag` com as
tags definidas em `lib/analytics-client.ts` para invalidação seletiva dos
caches quando novos dados forem carregados.
