import requests
import json
import re

try:
    import cloudscraper
except ImportError:
    cloudscraper = None

EPIC_GRAPHQL_URL = "https://store.epicgames.com/graphql"
SHA256_HASH = "ec112951b1824e1e215daecae17db4069c737295d4a697ddb9832923f93a326e"


def _parse_price_string(value):
    if not isinstance(value, str):
        return None

    match = re.search(r"[\d,.]+", value)
    if not match:
        return None

    try:
        return float(match.group(0).replace(",", ""))
    except ValueError:
        return None


def _collect_price_candidates(node, candidates):
    if isinstance(node, dict):
        for key, value in node.items():
            key_lower = str(key).lower()

            if "price" in key_lower and isinstance(value, (int, float)):
                if value >= 0:
                    candidates.append(float(value) / 100.0)
            elif "price" in key_lower and isinstance(value, str):
                parsed = _parse_price_string(value)
                if parsed is not None and parsed >= 0:
                    candidates.append(parsed)

            _collect_price_candidates(value, candidates)

    elif isinstance(node, list):
        for item in node:
            _collect_price_candidates(item, candidates)


def _extract_lowest_price(data):
    catalog_offer = (
        data.get("data", {})
        .get("Catalog", {})
        .get("catalogOffer", {})
    )

    price_blob = catalog_offer.get("price", {})
    candidates = []
    _collect_price_candidates(price_blob, candidates)

    if not candidates:
        return None

    return min(candidates)


def _build_graphql_params(offer_id, sandbox_id):
    variables = {
        "locale": "en-US",
        "country": "IN",
        "offerId": offer_id,
        "sandboxId": sandbox_id,
    }

    extensions = {
        "persistedQuery": {
            "version": 1,
            "sha256Hash": SHA256_HASH,
        }
    }

    return {
        "operationName": "getCatalogOffer",
        "variables": json.dumps(variables, separators=(",", ":")),
        "extensions": json.dumps(extensions, separators=(",", ":")),
    }


def scrape_epic_price(offer_id, sandbox_id):
    params = _build_graphql_params(offer_id, sandbox_id)

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Origin": "https://store.epicgames.com",
        "Referer": "https://store.epicgames.com/",
    }

    response = requests.get(
        EPIC_GRAPHQL_URL,
        params=params,
        headers=headers,
        timeout=30,
    )

    if response.status_code == 403 and cloudscraper is not None:
        scraper = cloudscraper.create_scraper(
            browser={"browser": "chrome", "platform": "windows", "mobile": False}
        )
        response = scraper.get(
            EPIC_GRAPHQL_URL,
            params=params,
            headers=headers,
            timeout=30,
        )

    if response.status_code != 200:
        print(f"Epic GraphQL returned status {response.status_code} for offer {offer_id}")
        return None

    try:
        data = response.json()
    except ValueError:
        print("Epic GraphQL response was not JSON (likely blocked by Cloudflare JS challenge)")
        return None

    errors = data.get("errors")
    if errors:
        print(f"Epic GraphQL errors for offer {offer_id}: {errors}")
        return None

    return _extract_lowest_price(data)