from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import uvicorn
from typing import Optional

# Initialize FastAPI app
app = FastAPI(
    title="PubMedQA LLM API",
    description="API for serving a fine-tuned Llama 3.2 1B model for PubMedQA",
    version="1.0.0"
)

# Model loading flag
model_loaded = False
model = None
tokenizer = None
device = None

class QuestionRequest(BaseModel):
    question: str
    max_length: Optional[int] = 512
    temperature: Optional[float] = 0.7
    top_p: Optional[float] = 0.9

class AnswerResponse(BaseModel):
    answer: str
    model_info: str

@app.on_event("startup")
async def startup_event():
    global model, tokenizer, device, model_loaded
    
    # Check for GPU availability
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Using device: {device}")
    
    try:
        # Path to your saved model
        model_path = r"C:\Users\surya\llama-3.2-1B-pubmedqa\final"
        
        # Load tokenizer and model
        tokenizer = AutoTokenizer.from_pretrained(model_path)
        model = AutoModelForCausalLM.from_pretrained(
            model_path,
            torch_dtype=torch.float16 if device == "cuda" else torch.float32
        )
        
        # Move model to device
        model = model.to(device)
        
        # Set pad_token_id explicitly if it's not set
        if tokenizer.pad_token_id is None:
            tokenizer.pad_token_id = tokenizer.eos_token_id
            
        model_loaded = True
        print("Model loaded successfully!")
    
    except Exception as e:
        print(f"Error loading model: {e}")
        model_loaded = False

@app.get("/")
async def root():
    return {"status": "active", "model": "llama-3.2-1B-pubmedqa", "model_loaded": model_loaded}

@app.post("/ask", response_model=AnswerResponse)
async def ask_question(request: QuestionRequest):
    global model, tokenizer, device, model_loaded
    
    if not model_loaded:
        raise HTTPException(status_code=503, detail="Model not loaded. Please check server logs.")
    
    try:
        # Format prompt
        prompt = f"Question: {request.question}\nAnswer:"
        
        # Tokenize input
        inputs = tokenizer(
            prompt,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=model.config.max_position_embeddings
        )
        inputs = {k: v.to(device) for k, v in inputs.items()}
        
        # Generate response
        with torch.no_grad():
            outputs = model.generate(
                input_ids=inputs["input_ids"],
                attention_mask=inputs["attention_mask"],
                max_length=request.max_length,
                temperature=request.temperature,
                top_p=request.top_p,
                do_sample=True,
                pad_token_id=tokenizer.pad_token_id
            )
        
        # Move outputs to CPU for decoding
        outputs = outputs.cpu()
        
        # Decode response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        # Extract answer part
        answer = response.split("Answer:")[1].strip() if "Answer:" in response else response
        
        # Return response
        return AnswerResponse(
            answer=answer,
            model_info="llama-3.2-1B-pubmedqa"
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

# For direct execution
if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)