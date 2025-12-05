const BASE_URL =
  process.env.NEXT_PUBLIC_ANALYTICS_API_URL ?? "http://localhost:8000";

const IS_DEV = process.env.NODE_ENV === "development";

function parseEnvInt(name: string, fallback: number): number {
  const raw = process.env[name];
  const parsed = raw ? Number(raw) : Number.NaN;
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallback;
}

// Valores padrão de revalidação:
// - Em desenvolvimento, desabilitamos cache (0) para evitar confusão.
// - Em produção/stage, usamos 5 minutos como default e 15 minutos para análises mais estáveis.
const ANALYTICS_REVALIDATE_DEFAULT = IS_DEV
  ? 0
  : parseEnvInt("ANALYTICS_REVALIDATE_SECONDS_DEFAULT", 300);

const ANALYTICS_REVALIDATE_SLOW = IS_DEV
  ? 0
  : parseEnvInt("ANALYTICS_REVALIDATE_SECONDS_SLOW", 900);

export type ScatterPoint = {
  x: number;
  y: number;
  z?: number | null;
  label?: string | null;
  category?: string | null;
};

export type RegressionPoint = {
  x: number;
  y: number;
};

export type ScatterAnalysis = {
  points: ScatterPoint[];
  regression: RegressionPoint[];
  correlation: number;
  total_ok: number;
  total_alerta: number;
  total_critico: number;
};

export type HeatmapPoint = {
  x: string;
  y: string;
  value: number;
  deviation: number;
  is_outlier: boolean;
};

export type HistogramBin = {
  start: number;
  end: number;
  count: number;
};

export type DensityPoint = {
  x: number;
  y: number;
};

export type HistogramStats = {
  mean: number;
  median: number;
  q1: number;
  q3: number;
};

export type TicketHistogram = {
  values: number[];
  bins: HistogramBin[];
  density: DensityPoint[];
  stats: HistogramStats;
};

type AnalyticsFetchOptions = {
  /**
   * Tempo de revalidação em segundos.
   * - 0 ou negativo => `no-store`
   * - > 0 => cacheável com revalidate
   */
  revalidateSeconds?: number;
  /**
   * Tags usadas para invalidação seletiva (Next 16 `revalidateTag`).
   */
  tags?: string[];
};

async function fetchAnalytics<T>(
  path: string,
  { revalidateSeconds, tags }: AnalyticsFetchOptions = {},
): Promise<T | null> {
  const revalidate =
    typeof revalidateSeconds === "number"
      ? revalidateSeconds
      : ANALYTICS_REVALIDATE_DEFAULT;

  const isCacheable = !IS_DEV && revalidate > 0;
  const url = `${BASE_URL}${path}`;

  const fetchOptions: RequestInit & {
    next?: { revalidate?: number; tags?: string[] };
  } = {
    cache: isCacheable ? "force-cache" : "no-store",
    next: isCacheable
      ? {
          revalidate,
          ...(tags && tags.length ? { tags } : {}),
        }
      : undefined,
  };

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log(
      "[analytics-fetch]",
      url,
      isCacheable ? `revalidate=${revalidate}` : "no-store",
      tags?.length ? `tags=${tags.join(",")}` : "",
    );
  }

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getOeeVsRetrabalho(): Promise<ScatterAnalysis | null> {
  return fetchAnalytics<ScatterAnalysis>(
    "/analytics/producao/oee-vs-retrabalho",
    {
      tags: ["analytics:producao", "analytics:producao:oee-vs-retrabalho"],
    },
  );
}

export async function getHeatmapTurnoDia(): Promise<HeatmapPoint[]> {
  const result = await fetchAnalytics<{ cells?: HeatmapPoint[] }>(
    "/analytics/producao/heatmap-turno-dia",
    {
      tags: ["analytics:producao", "analytics:producao:heatmap-turno-dia"],
    },
  );

  return result?.cells ?? [];
}

export async function getDistribuicaoTicket(): Promise<TicketHistogram | null> {
  return fetchAnalytics<TicketHistogram>(
    "/analytics/comercial/distribuicao-ticket",
    {
      revalidateSeconds: ANALYTICS_REVALIDATE_SLOW,
      tags: [
        "analytics:comercial",
        "analytics:comercial:distribuicao-ticket",
      ],
    },
  );
}

