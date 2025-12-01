import numpy as np
import pandas as pd

from .datasets import LINHAS_PRODUCAO, VOLUME_TURNO_DIA


def _tempo_parada(status: str) -> float:
  if status == "critico":
    return 2.5
  if status == "alerta":
    return 1.5
  return 0.8


def get_oee_vs_retrabalho_analysis():
  df = pd.DataFrame(LINHAS_PRODUCAO)
  points: list[dict] = []

  for _, row in df.iterrows():
    points.append(
      {
        "x": float(row["oeePercentual"]),
        "y": float(row["retrabalhoPercentual"]),
        "z": _tempo_parada(str(row["status"])),
        "label": str(row["nome"]),
        "category": str(row["status"]),
      }
    )

  x = df["oeePercentual"].astype(float)
  y = df["retrabalhoPercentual"].astype(float)

  if len(df) >= 2:
    correlation = float(x.corr(y))
    slope, intercept = np.polyfit(x, y, 1)
    x_min, x_max = float(x.min()), float(x.max())
    x_line = np.linspace(x_min, x_max, 20)
    regression = [
      {"x": float(xv), "y": float(slope * xv + intercept)} for xv in x_line
    ]
  else:
    correlation = 0.0
    regression = []

  total_ok = int((df["status"] == "ok").sum())
  total_alerta = int((df["status"] == "alerta").sum())
  total_critico = int((df["status"] == "critico").sum())

  return {
    "points": points,
    "regression": regression,
    "correlation": correlation,
    "total_ok": total_ok,
    "total_alerta": total_alerta,
    "total_critico": total_critico,
  }


def get_heatmap_turno_dia():
  df = pd.DataFrame(VOLUME_TURNO_DIA)
  df["turno"] = df["turno"].astype(str)
  df["diaSemana"] = pd.Categorical(
    df["diaSemana"],
    categories=["Seg", "Ter", "Qua", "Qui", "Sex"],
    ordered=True,
  )
  df = df.sort_values(["turno", "diaSemana"])

  media = df["volumeM2"].mean()
  cells: list[dict] = []

  for _, row in df.iterrows():
    value = float(row["volumeM2"])
    deviation = ((value - media) / media) * 100 if media else 0.0
    is_outlier = abs(deviation) >= 15
    cells.append(
      {
        "x": str(row["turno"]),
        "y": str(row["diaSemana"]),
        "value": value,
        "deviation": float(deviation),
        "is_outlier": is_outlier,
      }
    )

  return cells



