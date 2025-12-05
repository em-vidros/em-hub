from typing import Sequence

from app.core.ports.production_analytics_repository import (
    ProductionAnalyticsRepository,
    ProductionLine,
    VolumeTurnoDia,
)
from app.infrastructure.datasources.datasets import LINHAS_PRODUCAO, VOLUME_TURNO_DIA


class InMemoryProductionAnalyticsRepository(ProductionAnalyticsRepository):
    def list_production_lines(self) -> Sequence[ProductionLine]:
        return list(LINHAS_PRODUCAO)

    def list_volume_turno_dia(self) -> Sequence[VolumeTurnoDia]:
        return list(VOLUME_TURNO_DIA)


