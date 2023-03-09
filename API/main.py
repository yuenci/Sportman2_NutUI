from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from client import insertOne
import json


app = FastAPI()

# set CORS policy
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins
    allow_credentials=True,  # allow cookies
    allow_methods=["*"],  # allow all methods
    allow_headers=["*"]
)

# post word
@app.post("/word")
def chat(item: dict):
    print(item)
    doucment_id =  insertOne(item)
    doucment_id = str(doucment_id)
    return {"message": "success" , "doucment_id": doucment_id}



if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=4999, reload=True)