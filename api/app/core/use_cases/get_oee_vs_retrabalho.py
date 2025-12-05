from dataclasses import dataclass
from typing import List

import numpy as np
import pandas as pd

from app.core.ports.production_analytics_repository import ProductionAnalyticsRepository


@dataclass
class OeeVsRetrabalhoPoint:
    x: float
    y: float
    z: float
    label: str
    category: str


@dataclass
class RegressionPoint:
    x: float
    y: float


@dataclass
class OeeVsRetrabalhoResult:
    points: List[OeeVsRetrabalhoPoint]
    regression: List[RegressionPoint]
    correlation: float
    total_ok: int
    total_alerta: int
    total_critico: int


class GetOeeVsRetrabalhoUseCase:
    def __init__(self, repository: ProductionAnalyticsRepository) -> None:
        self.repository = repository

    def _tempo_parada(self, status: str) -> float:
        if status == "critico":
            return 2.5
        if status == "alerta":
            return 1.5
        return 0.8

    def execute(self) -> OeeVsRetrabalhoResult:
        data = self.repository.list_production_lines()
        df = pd.DataFrame(data)
        points: List[OeeVsRetrabalhoPoint] = []

        for _, row in df.iterrows():
            points.append(
                OeeVsRetrabalhoPoint(
                    x=float(row["oeePercentual"]),
                    y=float(row["retrabalhoPercentual"]),
                    z=self._tempo_parada(str(row["status"])),
                    label=str(row["nome"]),
                    category=str(row["status"]),
                )
            )

        x = df["oeePercentual"].astype(float)
        y = df["retrabalhoPercentual"].astype(float)

        if len(df) >= 2:
            correlation = float(x.corr(y))
            slope, intercept = np.polyfit(x, y, 1)
            x_min, x_max = float(x.min()), float(x.max())
            x_line = np.linspace(x_min, x_max, 20)
            regression = [
                RegressionPoint(x=float(xv), y=float(slope * xv + intercept))
                for xv in x_line
            ]
        else:
            correlation = 0.0
            regression = []

        total_ok = int((df["status"] == "ok").sum())
        total_alerta = int((df["status"] == "alerta").sum())
        total_critico = int((df["status"] == "critico").sum())

        return OeeVsRetrabalhoResult(
            points=points,
            regression=regression,
            correlation=correlation,
            total_ok=total_ok,
            total_alerta=total_alerta,
            total_critico=total_critico,
        )


