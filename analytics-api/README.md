# EM Hub Analytics API

Serviço FastAPI responsável por preparar dados analíticos (Produção e Comercial)
para os gráficos avançados do dashboard EM Hub – EM Vidros.

## Requisitos

- Python 3.11

## Instalação

```bash
cd analytics-api
pip install -r requirements.txt
```

## Execução em desenvolvimento

```bash
uvicorn app.main:app --reload --port 8000
```

Endpoints principais:

- `GET /health`
- `GET /analytics/producao/oee-vs-retrabalho`
- `GET /analytics/producao/heatmap-turno-dia`
- `GET /analytics/comercial/distribuicao-ticket`


