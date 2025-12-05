from typing import Protocol, Sequence


class TicketValue(float):
    pass


class SalesAnalyticsRepository(Protocol):
    def list_ticket_values(self) -> Sequence[TicketValue]:
        ...


