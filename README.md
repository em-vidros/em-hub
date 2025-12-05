# EM Hub - EM Vidros

Sistema de dashboard e analytics para gestão industrial da EM Vidros.

## Estrutura do Projeto

O projeto está organizado em 5 módulos principais:

### 📱 `web/`
Frontend Next.js com dashboard e interface do usuário.
- **Tecnologias**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Estrutura**: 
  - `app/` - Rotas e páginas do Next.js
  - `components/` - Componentes React reutilizáveis
  - `lib/` - Utilitários e clientes (incluindo analytics-client)
  - `public/` - Assets estáticos

**Executar:**
```bash
cd web
bun install
bun dev
```

### 🔌 `api/`
API FastAPI responsável por preparar dados analíticos para os gráficos do dashboard.
- **Tecnologias**: FastAPI, Python 3.11, Pandas, NumPy
- **Endpoints principais**:
  - `GET /health`
  - `GET /analytics/producao/oee-vs-retrabalho`
  - `GET /analytics/producao/heatmap-turno-dia`
  - `GET /analytics/comercial/distribuicao-ticket`

**Executar:**
```bash
cd api
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 📊 `warehouse/`
Dados e processos de ETL (Extract, Transform, Load).
- `data/` - Dados mockados e tipos TypeScript para desenvolvimento

### 🤖 `mlops/`
Pipelines e ferramentas de MLOps (Machine Learning Operations).
- Pipelines de CI/CD para modelos
- Monitoramento de modelos em produção
- Versionamento e deploy de modelos

### 🧠 `ml/`
Modelos de machine learning e código relacionado.
- Modelos de análise preditiva
- Scripts de treinamento
- Feature engineering
- Notebooks de experimentação

## Desenvolvimento

### Pré-requisitos
- Bun (runtime e package manager para o frontend)
- Python 3.11+ (para a API)
- Node.js 20+ (alternativa ao Bun)

### Configuração Inicial

1. **Frontend (Web)**
   ```bash
   cd web
   bun install
   ```

2. **API**
   ```bash
   cd api
   python -m venv venv
   source venv/bin/activate  # ou `venv\Scripts\activate` no Windows
   pip install -r requirements.txt
   ```

### Executar em Desenvolvimento

Em terminais separados:

1. **API** (porta 8000):
   ```bash
   cd api
   uvicorn app.main:app --reload --port 8000
   ```

2. **Web** (porta 3000):
   ```bash
   cd web
   bun dev
   ```

## Estrutura de Imports

O projeto usa path aliases configurados no `tsconfig.json`:
- `@/*` - Aponta para `web/*`
- `@/warehouse/*` - Aponta para `warehouse/*`

Exemplo:
```typescript
import { getProducaoMockData } from "@/warehouse/data/producao";
import { KpiCard } from "@/components/dashboard/kpi-card";
```

## Licença

Proprietário - EM Vidros

