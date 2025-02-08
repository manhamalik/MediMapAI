from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
import io
import uvicorn

# Load the model from Hugging Face
import tensorflow as tf
model_path = tf.keras.utils.get_file(
    "model.h5", "https://huggingface.co/e1z/tumor-classification-model"
)
model = load_model(model_path)

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
    image = Image.open(io.BytesIO(image_bytes)).convert("BGR")
    image = image.resize((224, 224))  # Resize to model's input shape
    image = np.array(image) / 255.0  # Normalize
    image = np.expand_dims(image, axis=0)  # Add batch dimension

    # Predict
    predictions = model.predict(image)
    predicted_class = class_labels[np.argmax(predictions)]

    return {"prediction": predicted_class, "confidence": float(np.max(predictions))}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)