from app.core.use_cases.get_distribuicao_ticket import GetDistribuicaoTicketUseCase
from app.infrastructure.datasources.in_memory_sales_repository import (
  InMemorySalesAnalyticsRepository,
)


def get_distribuicao_ticket_analysis():
  repo = InMemorySalesAnalyticsRepository()
  use_case = GetDistribuicaoTicketUseCase(repo)
  result = use_case.execute()
  return {
    "values": result.values,
    "bins": [
      {
        "start": b.start,
        "end": b.end,
        "count": b.count,
      }
      for b in result.bins
    ],
    "density": [
      {
        "x": d.x,
        "y": d.y,
      }
      for d in result.density
    ],
    "stats": {
      "mean": result.stats.mean,
      "median": result.stats.median,
      "q1": result.stats.q1,
      "q3": result.stats.q3,
    },
  }
