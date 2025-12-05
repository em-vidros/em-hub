from typing import Sequence

from app.core.ports.sales_analytics_repository import (
    SalesAnalyticsRepository,
    TicketValue,
)
from app.infrastructure.datasources.datasets import DISTRIBUICAO_TICKET


class InMemorySalesAnalyticsRepository(SalesAnalyticsRepository):
    def list_ticket_values(self) -> Sequence[TicketValue]:
        return list(DISTRIBUICAO_TICKET)


