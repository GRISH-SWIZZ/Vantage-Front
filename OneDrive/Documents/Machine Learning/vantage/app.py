from flask import Flask, app, request, jsonify
import joblib
import numpy as np
from history_store import add_history, get_history
from gemini_service import ask_gemini
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
# Tokenizer (same as training)
def tokenize_url(url):
    return url.replace("://", " ").replace(".", " ").replace("-", " ").replace("/", " ").split()

# Manual features
def extract_features(url):
    length = len(url)
    digits = sum(c.isdigit() for c in url)
    special = sum(not c.isalnum() for c in url)
    https = 1 if url.startswith("https") else 0
    subdomains = url.count(".") - 1
    return [length, digits, special, https, subdomains]



model = joblib.load("vantage_url_model.pkl")
vectorizer = joblib.load("vantage_vectorizer.pkl")

# Health
@app.route("/", methods=["GET"])
def home():
    return "Vantage Backend Running"

# URL Scan
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "URL is required"}), 400
    
    SAFE_DOMAINS = ["google.com", "example.com", "openai.com", "github.com"]

    for d in SAFE_DOMAINS:
        if url.endswith(d):
            return jsonify({
                "url": url,
                "prediction": "Benign",
                "risk": "Low",
                "reason": "Trusted domain (whitelisted)"
            })


    url_vec = vectorizer.transform([url]).toarray()
    manual = np.array(extract_features(url)).reshape(1, -1)
    final_vec = np.hstack((url_vec, manual))

    result = model.predict(final_vec)[0]
    label = "Malicious" if result == 1 else "Benign"
    risk = "High" if result == 1 else "Low"
    reason = "Suspicious pattern" if result == 1 else "Looks safe"

    add_history(url, label, reason)

    return jsonify({
        "url": url,
        "prediction": label,
        "risk": risk,
        "reason": reason
    })

# Chat with Vantage
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message")
    url = data.get("url")

    if not message:
        return jsonify({"error": "Message required"}), 400

    reply = ask_gemini(message, url)
    return jsonify({"reply": reply})

# Get History
@app.route("/history", methods=["GET"])
def history():
    return jsonify(get_history())

# Dashboard Stats
@app.route("/stats", methods=["GET"])
def stats():
    data = get_history()
    total = len(data)
    malicious = len([x for x in data if x["result"] == "Malicious"])
    benign = len([x for x in data if x["result"] == "Benign"])
    return jsonify({
        "total": total,
        "malicious": malicious,
        "benign": benign
    })

if __name__ == "__main__":
    app.run(debug=True)
