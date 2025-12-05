from fastapi import APIRouter, Depends

from app.core.use_cases.get_distribuicao_ticket import (
    GetDistribuicaoTicketUseCase,
)
from app.infrastructure.datasources.in_memory_sales_repository import (
    InMemorySalesAnalyticsRepository,
)
from app.infrastructure.http.schemas import HistogramResponse


router = APIRouter(prefix="/analytics/comercial", tags=["analytics_comercial"])


def get_sales_repository():
    return InMemorySalesAnalyticsRepository()


def get_distribuicao_ticket_use_case(
    repo=Depends(get_sales_repository),
) -> GetDistribuicaoTicketUseCase:
    return GetDistribuicaoTicketUseCase(repo)


@router.get(
    "/distribuicao-ticket",
    response_model=HistogramResponse,
)
def distribuicao_ticket(
    use_case: GetDistribuicaoTicketUseCase = Depends(
        get_distribuicao_ticket_use_case
    ),
):
    result = use_case.execute()
    return HistogramResponse(
        values=result.values,
        bins=[
            {
                "start": b.start,
                "end": b.end,
                "count": b.count,
            }
            for b in result.bins
        ],
        density=[
            {
                "x": d.x,
                "y": d.y,
            }
            for d in result.density
        ],
        stats={
            "mean": result.stats.mean,
            "median": result.stats.median,
            "q1": result.stats.q1,
            "q3": result.stats.q3,
        },
    )


