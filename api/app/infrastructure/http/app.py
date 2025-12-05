from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.infrastructure.http.routers.analytics_comercial import router as comercial_router
from app.infrastructure.http.routers.analytics_producao import router as producao_router


def create_app() -> FastAPI:
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

    app.include_router(producao_router)
    app.include_router(comercial_router)

    return app


