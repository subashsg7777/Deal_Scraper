import requests
from config import build_api_url

API_URL = build_api_url("/api/games/prices")

def send_prices(game_id, price, store, currency="INR"):
    payload = {
        "gameId": game_id,
        "price": price,
        "store": store,
        "currency": currency
    }

    response = requests.post(API_URL, json=payload)

    if response.status_code == 200:
        print(f"Prices for game {game_id} sent successfully.")
    else:
        print(f"Failed to send prices for game {game_id}. Status code: {response.status_code}. Response: {response.text}")