from fastapi import APIRouter, Depends

from app.core.use_cases.get_heatmap_turno_dia import GetHeatmapTurnoDiaUseCase
from app.core.use_cases.get_oee_vs_retrabalho import GetOeeVsRetrabalhoUseCase
from app.infrastructure.datasources.in_memory_production_repository import (
    InMemoryProductionAnalyticsRepository,
)
from app.infrastructure.http.schemas import HeatmapResponse, ScatterResponse


router = APIRouter(prefix="/analytics/producao", tags=["analytics_producao"])


def get_production_repository():
    return InMemoryProductionAnalyticsRepository()


def get_oee_vs_retrabalho_use_case(
    repo=Depends(get_production_repository),
) -> GetOeeVsRetrabalhoUseCase:
    return GetOeeVsRetrabalhoUseCase(repo)


def get_heatmap_turno_dia_use_case(
    repo=Depends(get_production_repository),
) -> GetHeatmapTurnoDiaUseCase:
    return GetHeatmapTurnoDiaUseCase(repo)


@router.get(
    "/oee-vs-retrabalho",
    response_model=ScatterResponse,
)
def oee_vs_retrabalho(
    use_case: GetOeeVsRetrabalhoUseCase = Depends(get_oee_vs_retrabalho_use_case),
):
    result = use_case.execute()
    return ScatterResponse(
        points=[
            {
                "x": p.x,
                "y": p.y,
                "z": p.z,
                "label": p.label,
                "category": p.category,
            }
            for p in result.points
        ],
        regression=[{"x": r.x, "y": r.y} for r in result.regression],
        correlation=result.correlation,
        total_ok=result.total_ok,
        total_alerta=result.total_alerta,
        total_critico=result.total_critico,
    )


@router.get(
    "/heatmap-turno-dia",
    response_model=HeatmapResponse,
)
def heatmap_turno_dia(
    use_case: GetHeatmapTurnoDiaUseCase = Depends(get_heatmap_turno_dia_use_case),
):
    cells = use_case.execute()
    return HeatmapResponse(
        cells=[
            {
                "x": c.x,
                "y": c.y,
                "value": c.value,
                "deviation": c.deviation,
                "is_outlier": c.is_outlier,
            }
            for c in cells
        ]
    )


