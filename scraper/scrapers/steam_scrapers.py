import re

import requests
from bs4 import BeautifulSoup


STEAM_API_URL = "https://store.steampowered.com/api/appdetails"


def _extract_app_id(url):
    match = re.search(r"/app/(\d+)", url)
    return match.group(1) if match else None


def _parse_price_text(price_text):
    match = re.search(r"[\d,.]+", price_text)
    if not match:
        return None

    normalized_price = match.group(0).replace(",", "")
    try:
        return float(normalized_price)
    except ValueError:
        return None


def _fetch_price_from_api(app_id, headers):
    response = requests.get(
        STEAM_API_URL,
        params={"appids": app_id, "cc": "in", "l": "en"},
        headers=headers,
        timeout=20,
    )
    if response.status_code != 200:
        return None

    payload = response.json().get(str(app_id), {})
    if not payload.get("success"):
        return None

    data = payload.get("data", {})
    if data.get("is_free"):
        return 0.0

    price_overview = data.get("price_overview")
    if not price_overview:
        return None

    final_price = price_overview.get("final")
    if final_price is None:
        return None

    return float(final_price) / 100.0


def _fetch_price_from_html(url, headers):
    # These cookies let Steam return mature game pages without age form.
    cookies = {
        "birthtime": "568022401",
        "lastagecheckage": "1-January-1970",
        "wants_mature_content": "1",
        "mature_content": "1",
    }

    response = requests.get(url, headers=headers, cookies=cookies, timeout=20)
    if response.status_code != 200:
        return None

    soup = BeautifulSoup(response.text, "html.parser")

    selectors = [
        ".game_purchase_action .discount_final_price",
        ".game_purchase_action .game_purchase_price",
        ".game_area_purchase_game .discount_final_price",
        ".game_area_purchase_game .game_purchase_price",
        ".game_purchase_price.price",
    ]

    for selector in selectors:
        price_element = soup.select_one(selector)
        if not price_element:
            continue

        parsed_price = _parse_price_text(price_element.get_text(" ", strip=True))
        if parsed_price is not None:
            return parsed_price

    return None

def scrape_steam_prices(url):
    headers = {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9",
    }

    app_id = _extract_app_id(url)
    if app_id:
        api_price = _fetch_price_from_api(app_id, headers)
        if api_price is not None:
            return api_price

    return _fetch_price_from_html(url, headers)