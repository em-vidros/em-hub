import type {
  KpiValue,
  Period,
  LinhaProducaoResumo,
  TimeSeriesPoint,
} from "./types";

export interface ProducaoDashboardData {
  period: Period;
  kpis: {
    produtividadeMedia: KpiValue;
    oee: KpiValue;
    tempoParada: KpiValue;
    retrabalho: KpiValue;
  };
  producaoPorTurno: {
    turno: string;
    volumeM2: number;
  }[];
  linhas: LinhaProducaoResumo[];
  distribuicaoParadasHoras: number[];
  volumeTurnoDia: {
    turno: string;
    diaSemana: string;
    volumeM2: number;
  }[];
  oeePorLinhaMes: {
    linha: string;
    mes: string;
    oee: number;
  }[];
  refugosPorCausa: {
    causa: string;
    percentual: number;
  }[];
}

export function getProducaoMockData(
  period: Period = "30d",
): ProducaoDashboardData {
  return {
    period,
    kpis: {
      produtividadeMedia: {
        label: "Produtividade média",
        value: 158,
        unit: "m²/h",
        trendPercentage: 4.1,
      },
      oee: {
        label: "OEE médio",
        value: 82.4,
        unit: "%",
        trendPercentage: 2.7,
      },
      tempoParada: {
        label: "Tempo de parada",
        value: 11.5,
        unit: "h",
        trendPercentage: -6.3,
      },
      retrabalho: {
        label: "Retrabalho",
        value: 3.1,
        unit: "%",
        trendPercentage: -1.1,
      },
    },
    producaoPorTurno: [
      { turno: "1º turno", volumeM2: 46000 },
      { turno: "2º turno", volumeM2: 52000 },
      { turno: "3º turno", volumeM2: 27000 },
    ],
    linhas: [
      {
        id: "l1",
        nome: "Forno Têmpera A",
        oeePercentual: 85,
        retrabalhoPercentual: 2.2,
        status: "ok",
      },
      {
        id: "l2",
        nome: "Forno Têmpera B",
        oeePercentual: 79,
        retrabalhoPercentual: 3.5,
        status: "alerta",
      },
      {
        id: "l3",
        nome: "Laminação",
        oeePercentual: 83,
        retrabalhoPercentual: 2.8,
        status: "ok",
      },
      {
        id: "l4",
        nome: "Corte automático",
        oeePercentual: 76,
        retrabalhoPercentual: 4.1,
        status: "critico",
      },
    ],
    distribuicaoParadasHoras: [0.5, 0.8, 1.2, 0.4, 2.1, 1.7, 0.3, 0.9, 1.4],
    volumeTurnoDia: [
      { turno: "1º turno", diaSemana: "Seg", volumeM2: 16000 },
      { turno: "1º turno", diaSemana: "Ter", volumeM2: 15000 },
      { turno: "1º turno", diaSemana: "Qua", volumeM2: 15500 },
      { turno: "1º turno", diaSemana: "Qui", volumeM2: 17000 },
      { turno: "1º turno", diaSemana: "Sex", volumeM2: 16500 },
      { turno: "2º turno", diaSemana: "Seg", volumeM2: 17500 },
      { turno: "2º turno", diaSemana: "Ter", volumeM2: 18000 },
      { turno: "2º turno", diaSemana: "Qua", volumeM2: 17600 },
      { turno: "2º turno", diaSemana: "Qui", volumeM2: 19000 },
      { turno: "2º turno", diaSemana: "Sex", volumeM2: 18500 },
      { turno: "3º turno", diaSemana: "Seg", volumeM2: 8000 },
      { turno: "3º turno", diaSemana: "Ter", volumeM2: 8200 },
      { turno: "3º turno", diaSemana: "Qua", volumeM2: 7800 },
      { turno: "3º turno", diaSemana: "Qui", volumeM2: 9000 },
      { turno: "3º turno", diaSemana: "Sex", volumeM2: 8800 },
    ],
    oeePorLinhaMes: [
      { linha: "Forno Têmpera A", mes: "Jan", oee: 83 },
      { linha: "Forno Têmpera A", mes: "Fev", oee: 84 },
      { linha: "Forno Têmpera A", mes: "Mar", oee: 86 },
      { linha: "Forno Têmpera A", mes: "Abr", oee: 87 },
      { linha: "Forno Têmpera B", mes: "Jan", oee: 78 },
      { linha: "Forno Têmpera B", mes: "Fev", oee: 79 },
      { linha: "Forno Têmpera B", mes: "Mar", oee: 80 },
      { linha: "Forno Têmpera B", mes: "Abr", oee: 81 },
      { linha: "Laminação", mes: "Jan", oee: 81 },
      { linha: "Laminação", mes: "Fev", oee: 82 },
      { linha: "Laminação", mes: "Mar", oee: 83 },
      { linha: "Laminação", mes: "Abr", oee: 84 },
    ],
    refugosPorCausa: [
      { causa: "Quebra na têmpera", percentual: 34 },
      { causa: "Riscos e manchas", percentual: 27 },
      { causa: "Desalinhamento na laminação", percentual: 22 },
      { causa: "Corte fora de medida", percentual: 17 },
    ],
  };
}


