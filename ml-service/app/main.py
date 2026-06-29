from fastapi import FastAPI
from app.api.endpoints import router as endpointApi

app = FastAPI(title="RecoPlant ML API", version="1.0.0")

# Daftarkan route ke main file
app.include_router(endpointApi)