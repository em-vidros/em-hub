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

## Integração com o cache do Next 16

O frontend Next 16 consome estes endpoints via cliente de analytics em
`lib/analytics-client.ts`:

- Os endpoints de produção e comercial são agrupados em tags de cache:
  - Produção:
    - `analytics:producao`
    - `analytics:producao:oee-vs-retrabalho`
    - `analytics:producao:heatmap-turno-dia`
  - Comercial:
    - `analytics:comercial`
    - `analytics:comercial:distribuicao-ticket`
- As rotas Next podem, futuramente, chamar `revalidateTag` com essas tags
  após a conclusão de processos de ETL para forçar a revalidação do cache.

Política sugerida:

- Dados agregados de produção/comercial:
  - Revalidação padrão de ~5 minutos (configurável via
    `ANALYTICS_REVALIDATE_SECONDS_DEFAULT`).
- Análises mais estáveis (como distribuição de ticket):
  - Revalidação de ~15 minutos (configurável via
    `ANALYTICS_REVALIDATE_SECONDS_SLOW`).

