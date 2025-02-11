from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import io
import uvicorn
import os
import requests
from keras.models import load_model
import subprocess
# Define model path inside the container
model_path = "/app/tumor_classification.h5"
# Hugging Face URL for your .h5 model
model_url = "https://huggingface.co/e1z/tumor-classification-model/resolve/main/tumor_classification.h5"
hf_token = os.getenv("HF_AUTH_TOKEN")


if not hf_token:
    raise RuntimeError("Hugging Face token is missing! Set HF_AUTH_TOKEN in Docker.")

# Download model if it does not exist
if not os.path.exists(model_path):
    print(f"Downloading model from {model_url}...")

    command = [
        "curl", "-L",
        "-H", f"Authorization: Bearer {hf_token}",
        "-o", model_path,
        model_url
    ]
    
    result = subprocess.run(command, capture_output=True, text=True)

    if result.returncode != 0:
        raise RuntimeError(f"🚨 Failed to download model. Curl Error: {result.stderr}")

# Load the model
model = load_model(model_path)
print("Model loaded successfully!")

# Define class labels
class_labels = ["Glioma", "Meningioma", "Pituitary Tumor"]

# Initialize FastAPI app
app = FastAPI()

@app.get("/")
def home():
    return {"message": "Brain Tumor Classification API is running!"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Read image
    image_bytes = await file.read()
    image = image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((224, 224))  # Resize to model's input shape
    image = np.array(image) / 255.0  # Normalize
    image = np.expand_dims(image, axis=0)  # Add batch dimension

    # Predict
    predictions = model.predict(image)
    predicted_class = class_labels[np.argmax(predictions)]

    return {"prediction": predicted_class, "confidence": float(np.max(predictions))}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=7860, reload=True)