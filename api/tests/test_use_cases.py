from app.core.use_cases.get_distribuicao_ticket import (
    GetDistribuicaoTicketUseCase,
)
from app.core.use_cases.get_heatmap_turno_dia import GetHeatmapTurnoDiaUseCase
from app.core.use_cases.get_oee_vs_retrabalho import GetOeeVsRetrabalhoUseCase
from app.infrastructure.datasources.in_memory_production_repository import (
    InMemoryProductionAnalyticsRepository,
)
from app.infrastructure.datasources.in_memory_sales_repository import (
    InMemorySalesAnalyticsRepository,
)
from app.infrastructure.http.app import create_app
from fastapi.testclient import TestClient


def test_oee_vs_retrabalho_use_case():
    repo = InMemoryProductionAnalyticsRepository()
    use_case = GetOeeVsRetrabalhoUseCase(repo)
    result = use_case.execute()
    assert result.points
    assert isinstance(result.correlation, float)


def test_heatmap_turno_dia_use_case():
    repo = InMemoryProductionAnalyticsRepository()
    use_case = GetHeatmapTurnoDiaUseCase(repo)
    cells = use_case.execute()
    assert cells
    assert all(c.value > 0 for c in cells)


def test_distribuicao_ticket_use_case():
    repo = InMemorySalesAnalyticsRepository()
    use_case = GetDistribuicaoTicketUseCase(repo)
    result = use_case.execute()
    assert result.values
    assert result.bins
    assert result.stats.mean > 0


def test_http_endpoints_health_and_analytics():
    app = create_app()
    client = TestClient(app)

    health_response = client.get("/health")
    assert health_response.status_code == 200
    assert health_response.json()["status"] == "ok"

    oee_response = client.get("/analytics/producao/oee-vs-retrabalho")
    assert oee_response.status_code == 200
    data = oee_response.json()
    assert "points" in data
    assert "regression" in data

    heatmap_response = client.get("/analytics/producao/heatmap-turno-dia")
    assert heatmap_response.status_code == 200
    data = heatmap_response.json()
    assert "cells" in data

    distrib_response = client.get("/analytics/comercial/distribuicao-ticket")
    assert distrib_response.status_code == 200
    data = distrib_response.json()
    assert "values" in data
    assert "bins" in data
    assert "stats" in data


