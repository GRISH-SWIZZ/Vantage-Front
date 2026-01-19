import google.generativeai as genai

genai.configure(api_key="   ")

model = genai.GenerativeModel("models/gemini-flash-lite-latest")

def ask_gemini(message, url=None):
    if url:
        prompt = f"""
You are a cybersecurity assistant.

URL: {url}
User Question: {message}

Give short, clear, security-focused answer.
"""
    else:
        prompt = f"""
You are a cybersecurity assistant.
User Question: {message}
Give short, clear, security-focused answer.
"""

    response = model.generate_content(prompt)
    return response.text
