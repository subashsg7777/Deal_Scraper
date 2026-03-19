import requests
from config import build_api_url

def fetch_games():
    API_URL = build_api_url("/api/games/all")
    response = requests.get(API_URL)
    return response.json() if response.status_code == 200 else []