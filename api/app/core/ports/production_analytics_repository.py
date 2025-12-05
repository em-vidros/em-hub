from typing import Protocol, Sequence


class ProductionLine(dict):
    pass


class VolumeTurnoDia(dict):
    pass


class ProductionAnalyticsRepository(Protocol):
    def list_production_lines(self) -> Sequence[ProductionLine]:
        ...

    def list_volume_turno_dia(self) -> Sequence[VolumeTurnoDia]:
        ...


