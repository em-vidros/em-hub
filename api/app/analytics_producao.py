from app.core.use_cases.get_heatmap_turno_dia import GetHeatmapTurnoDiaUseCase
from app.core.use_cases.get_oee_vs_retrabalho import GetOeeVsRetrabalhoUseCase
from app.infrastructure.datasources.in_memory_production_repository import (
  InMemoryProductionAnalyticsRepository,
)


def get_oee_vs_retrabalho_analysis():
  repo = InMemoryProductionAnalyticsRepository()
  use_case = GetOeeVsRetrabalhoUseCase(repo)
  result = use_case.execute()
  return {
    "points": [
      {
        "x": p.x,
        "y": p.y,
        "z": p.z,
        "label": p.label,
        "category": p.category,
      }
      for p in result.points
    ],
    "regression": [{"x": r.x, "y": r.y} for r in result.regression],
    "correlation": result.correlation,
    "total_ok": result.total_ok,
    "total_alerta": result.total_alerta,
    "total_critico": result.total_critico,
  }


def get_heatmap_turno_dia():
  repo = InMemoryProductionAnalyticsRepository()
  use_case = GetHeatmapTurnoDiaUseCase(repo)
  cells = use_case.execute()
  return [
      {
      "x": c.x,
      "y": c.y,
      "value": c.value,
      "deviation": c.deviation,
      "is_outlier": c.is_outlier,
      }
    for c in cells
  ]

