const BASE_URL =
  process.env.NEXT_PUBLIC_ANALYTICS_API_URL ?? "http://localhost:8000";

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

export async function getOeeVsRetrabalho(): Promise<ScatterAnalysis | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/analytics/producao/oee-vs-retrabalho`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json as ScatterAnalysis;
  } catch {
    return null;
  }
}

export async function getHeatmapTurnoDia(): Promise<HeatmapPoint[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/analytics/producao/heatmap-turno-dia`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return (json.cells ?? []) as HeatmapPoint[];
  } catch {
    return [];
  }
}

export async function getDistribuicaoTicket(): Promise<TicketHistogram | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/analytics/comercial/distribuicao-ticket`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return json as TicketHistogram;
  } catch {
    return null;
  }
}


