import google.generativeai as genai

genai.configure(api_key="AIzaSyCs3noJDEy1SNnmZfLgsKfO70eFHw4A0CE")

models = genai.list_models()
for m in models:
    print(m.name)
