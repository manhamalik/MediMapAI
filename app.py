from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
from tensorflow import keras
import numpy as np
import io
import uvicorn
import os
import requests
import subprocess
from PIL import Image
import cv2
import imutils

# Define model path inside the container
model_path = "/app/tumor_classification.h5"

# Download model if it does not exist
if os.path.exists(model_path):

    # Load the model
    model = keras.models.load_model(model_path)
    print("Model loaded successfully!")
else:
    print("Model not found!")

# Define class labels
class_labels = ["Glioma", "Meningioma", "Pituitary Tumor"]

# Initialize FastAPI app
app = FastAPI()

def crop_image(image):
  img_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  img_blur = cv2.GaussianBlur(img_gray, (5, 5), 0)
  img_thresh = cv2.threshold(img_blur, 45, 255, cv2.THRESH_BINARY)[1]
  img_thresh = cv2.erode(img_thresh, None, iterations =2)
  img_thresh = cv2.dilate(img_thresh, None, iterations =2)

  contours = cv2.findContours(img_thresh.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
  contours = imutils.grab_contours(contours)
  if len(contours) == 0:
        return image
  
  c = max(contours, key = cv2.contourArea)
  # Get bounding rectangle coordinates
  x, y, w, h = cv2.boundingRect(c)

  # Crop the image using the bounding rectangle
  new_img = image[y:y + h, x:x + w]
  return new_img

@app.get("/")
def home():
    return {"message": "Brain Tumor Classification API is running!"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    # Read image
    try:
        # Read and open image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        print("✅ Image loaded!")

        image = np.array(image)
        # Apply preprocessing (cropping)
        cropped_image = crop_image(image)

        img = Image.fromarray(cropped_image)
        img = img.resize((240, 240))
        img = np.array(img)/255.0

        img = np.expand_dims(img, axis = 0)

        # Run model prediction
        result = model.predict(img)
        
        CLASS_DICT = {0: 'glioma', 1: 'meningioma', 2: 'notumor', 3: 'pituitary'}
        prediction = CLASS_DICT[np.argmax(result)]


        return {"prediction": prediction}
    
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=7860, reload=True)