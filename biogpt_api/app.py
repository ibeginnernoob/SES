from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

# Load BioGPT model
pipe = pipeline("text-generation", model="microsoft/biogpt")

# Initialize FastAPI app
app = FastAPI()

# Define request format
class TextInput(BaseModel):
    text: str
    max_length: int = 1000  # Optional parameter to limit output length

@app.post("/generate")
async def generate_text(input: TextInput):
    """Generates text using BioGPT given an input prompt."""
    #generated = pipe(input.text, max_length=input.max_length, do_sample=True, temperature=0.7, top_k=50)[0]["generated_text"]
    generated = pipe(
	input.text,
	max_length=500,  # Adjust as needed
	#min_length=50,   # Ensures some output
	#do_sample=True,
	temperature=0.5,
	top_k=50
)

    print(generated)
    return {"input": input.text, "output": generated}

# Root endpoint
@app.get("/")
def home():
    return {"message": "BioGPT API is running. Use /generate to generate text."}
