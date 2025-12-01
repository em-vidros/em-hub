from typing import List, Optional

from pydantic import BaseModel


class ScatterPoint(BaseModel):
  x: float
  y: float
  z: Optional[float] = None
  label: Optional[str] = None
  category: Optional[str] = None


class RegressionPoint(BaseModel):
  x: float
  y: float


class ScatterResponse(BaseModel):
  points: List[ScatterPoint]
  regression: List[RegressionPoint]
  correlation: float
  total_ok: int
  total_alerta: int
  total_critico: int


class HeatmapPoint(BaseModel):
  x: str
  y: str
  value: float
  deviation: float
  is_outlier: bool


class HeatmapResponse(BaseModel):
  cells: List[HeatmapPoint]


class HistogramBin(BaseModel):
  start: float
  end: float
  count: int


class DensityPoint(BaseModel):
  x: float
  y: float


class HistogramStats(BaseModel):
  mean: float
  median: float
  q1: float
  q3: float


class HistogramResponse(BaseModel):
  values: List[float]
  bins: List[HistogramBin]
  density: List[DensityPoint]
  stats: HistogramStats



