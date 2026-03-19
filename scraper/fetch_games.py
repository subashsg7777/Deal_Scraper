import requests

def fetch_games():
    API_URL = "http://localhost:8080/api/games/all"
    response = requests.get(API_URL)
    return response.json() if response.status_code == 200 else []