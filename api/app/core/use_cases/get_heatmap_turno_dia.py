from dataclasses import dataclass
from typing import List

import pandas as pd

from app.core.ports.production_analytics_repository import ProductionAnalyticsRepository


@dataclass
class HeatmapCell:
    x: str
    y: str
    value: float
    deviation: float
    is_outlier: bool


class GetHeatmapTurnoDiaUseCase:
    def __init__(self, repository: ProductionAnalyticsRepository) -> None:
        self.repository = repository

    def execute(self) -> List[HeatmapCell]:
        data = self.repository.list_volume_turno_dia()
        df = pd.DataFrame(data)
        df["turno"] = df["turno"].astype(str)
        df["diaSemana"] = pd.Categorical(
            df["diaSemana"],
            categories=["Seg", "Ter", "Qua", "Qui", "Sex"],
            ordered=True,
        )
        df = df.sort_values(["turno", "diaSemana"])

        media = df["volumeM2"].mean()
        cells: List[HeatmapCell] = []

        for _, row in df.iterrows():
            value = float(row["volumeM2"])
            deviation = ((value - media) / media) * 100 if media else 0.0
            is_outlier = abs(deviation) >= 15
            cells.append(
                HeatmapCell(
                    x=str(row["turno"]),
                    y=str(row["diaSemana"]),
                    value=value,
                    deviation=float(deviation),
                    is_outlier=is_outlier,
                )
            )

        return cells


