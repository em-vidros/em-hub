from dataclasses import dataclass
from typing import Dict, List

import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

from app.core.ports.sales_analytics_repository import SalesAnalyticsRepository


@dataclass
class HistogramBin:
    start: float
    end: float
    count: int


@dataclass
class DensityPoint:
    x: float
    y: float


@dataclass
class HistogramStats:
    mean: float
    median: float
    q1: float
    q3: float


@dataclass
class DistribuicaoTicketResult:
    values: List[float]
    bins: List[HistogramBin]
    density: List[DensityPoint]
    stats: HistogramStats


class GetDistribuicaoTicketUseCase:
    def __init__(self, repository: SalesAnalyticsRepository) -> None:
        self.repository = repository

    def execute(self) -> DistribuicaoTicketResult:
        values_array = np.array(self.repository.list_ticket_values(), dtype=float)
        values_list: List[float] = [float(v) for v in values_array]

        hist_counts, bin_edges = np.histogram(values_array, bins="fd")
        bins: List[HistogramBin] = []
        for i, count in enumerate(hist_counts):
            bins.append(
                HistogramBin(
                    start=float(bin_edges[i]),
                    end=float(bin_edges[i + 1]),
                    count=int(count),
                )
            )

        mean = float(values_array.mean())
        median = float(np.median(values_array))
        q1, q3 = np.percentile(values_array, [25, 75])

        fig, ax = plt.subplots()
        try:
            sns.kdeplot(values_array, ax=ax)
            line = ax.lines[0] if ax.lines else None
            if line is not None:
                x_data = line.get_xdata()
                y_data = line.get_ydata()
                density = [
                    DensityPoint(x=float(x), y=float(y))
                    for x, y in zip(x_data, y_data)
                ]
            else:
                density = []
        finally:
            plt.close(fig)

        stats = HistogramStats(
            mean=float(mean),
            median=float(median),
            q1=float(q1),
            q3=float(q3),
        )

        return DistribuicaoTicketResult(
            values=values_list,
            bins=bins,
            density=density,
            stats=stats,
        )


