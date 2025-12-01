from typing import Dict, List

import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

from .datasets import DISTRIBUICAO_TICKET


def get_distribuicao_ticket_analysis() -> Dict[str, object]:
  values = np.array(DISTRIBUICAO_TICKET, dtype=float)
  values_list: List[float] = [float(v) for v in values]

  # Histograma com regra de Freedman–Diaconis (bins=\"fd\") para algo mais robusto.
  hist_counts, bin_edges = np.histogram(values, bins="fd")
  bins: List[dict] = []
  for i, count in enumerate(hist_counts):
    bins.append(
      {
        "start": float(bin_edges[i]),
        "end": float(bin_edges[i + 1]),
        "count": int(count),
      }
    )

  # Estatísticas básicas.
  mean = float(values.mean())
  median = float(np.median(values))
  q1, q3 = np.percentile(values, [25, 75])

  # Curva de densidade (KDE) usando seaborn, extraindo os pontos.
  fig, ax = plt.subplots()
  try:
    sns.kdeplot(values, ax=ax)
    line = ax.lines[0] if ax.lines else None
    if line is not None:
      x_data = line.get_xdata()
      y_data = line.get_ydata()
      density = [
        {"x": float(x), "y": float(y)}
        for x, y in zip(x_data, y_data)
      ]
    else:
      density = []
  finally:
    plt.close(fig)

  return {
    "values": values_list,
    "bins": bins,
    "density": density,
    "stats": {
      "mean": float(mean),
      "median": float(median),
      "q1": float(q1),
      "q3": float(q3),
    },
  }

