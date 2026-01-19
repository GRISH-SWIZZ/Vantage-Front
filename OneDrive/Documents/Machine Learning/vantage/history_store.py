import json
import os
from datetime import datetime

FILE = "history.json"

def load_history():
    if not os.path.exists(FILE):
        return []
    with open(FILE, "r") as f:
        return json.load(f)

def save_history(data):
    with open(FILE, "w") as f:
        json.dump(data, f, indent=2)

def add_history(url, result, reason):
    data = load_history()
    data.append({
        "url": url,
        "result": result,
        "reason": reason,
        "time": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    })
    save_history(data)

def get_history():
    return load_history()
