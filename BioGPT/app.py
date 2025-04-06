import torch
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import uvicorn
from typing import Optional

app = FastAPI(title="BioGPT API", description="API for querying Microsoft BioGPT model")

# Global variables for model and tokenizer
tokenizer = None
model = None
device = None

class Question(BaseModel):
    text: str
    max_tokens: Optional[int] = 500

class Answer(BaseModel):
    question: str
    answer: str
    model_info: str

@app.on_event("startup")
async def startup_event():
    global tokenizer, model, device
    print("Loading BioGPT model and tokenizer...")
    
    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained("microsoft/biogpt")
    model = AutoModelForCausalLM.from_pretrained("microsoft/biogpt")
    
    # Set device
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = model.to(device)
    print(f"Model loaded successfully on {device}")

@app.post("/query", response_model=Answer)
async def query_biogpt(question_data: Question):
    global tokenizer, model, device
    
    if model is None or tokenizer is None:
        raise HTTPException(status_code=503, detail="Model is not loaded yet")
    
    try:
        # Format the prompt
        prompt = f"Question: {question_data.text}\nAnswer:"
        
        # Prepare the input
        inputs = tokenizer(prompt, return_tensors="pt").to(device)
        
        # Generate the response
        with torch.no_grad():
            output_sequences = model.generate(
                **inputs,
                max_new_tokens=question_data.max_tokens,
                num_beams=5,
                no_repeat_ngram_size=2,
                temperature=0.7,
                top_k=50,
                top_p=0.95,
                do_sample=True,
            )
        
        # Decode the response
        full_response = tokenizer.decode(output_sequences[0], skip_special_tokens=True)
        
        # Extract just the answer part
        if "Answer:" in full_response:
            answer = full_response.split("Answer:")[1].strip()
        else:
            answer = full_response.replace(prompt, "").strip()
        
        return Answer(
            question=question_data.text,
            answer=answer,
            model_info="microsoft/biogpt"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@app.get("/health")
async def health_check():
    if model is None or tokenizer is None:
        raise HTTPException(status_code=503, detail="Model is not loaded yet")
    return {"status": "ok", "model": "microsoft/biogpt", "device": device}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=False)