from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .analytics_comercial import get_distribuicao_ticket_analysis
from .analytics_producao import get_heatmap_turno_dia, get_oee_vs_retrabalho_analysis
from .models import (
  HeatmapResponse,
  HistogramResponse,
  ScatterResponse,
)


app = FastAPI(title="EM Hub Analytics API")

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)


@app.get("/health")
def health():
  return {"status": "ok"}


@app.get(
  "/analytics/producao/oee-vs-retrabalho",
  response_model=ScatterResponse,
)
def oee_vs_retrabalho():
  return get_oee_vs_retrabalho_analysis()


@app.get(
  "/analytics/producao/heatmap-turno-dia",
  response_model=HeatmapResponse,
)
def heatmap_turno_dia():
  return {"cells": get_heatmap_turno_dia()}


@app.get(
  "/analytics/comercial/distribuicao-ticket",
  response_model=HistogramResponse,
)
def distribuicao_ticket():
  return get_distribuicao_ticket_analysis()


