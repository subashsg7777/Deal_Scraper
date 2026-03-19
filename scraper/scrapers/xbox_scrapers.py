import requests

XBOX_BASE_URL = "https://displaycatalog.mp.microsoft.com/v7.0/products"


def _extract_lowest_list_price(product):
    prices = []

    sku_availabilities = product.get("DisplaySkuAvailabilities", [])
    if not isinstance(sku_availabilities, list):
        return None

    for sku in sku_availabilities:
        if not isinstance(sku, dict):
            continue

        availabilities = sku.get("Availabilities", [])
        if not isinstance(availabilities, list):
            continue

        for availability in availabilities:
            if not isinstance(availability, dict):
                continue

            order_data = availability.get("OrderManagementData", {})
            if not isinstance(order_data, dict):
                continue

            price_info = order_data.get("Price", {})
            if not isinstance(price_info, dict):
                continue

            list_price = price_info.get("ListPrice")
            if isinstance(list_price, (int, float)) and list_price >= 0:
                prices.append(float(list_price))

    if not prices:
        return None

    positive_prices = [price for price in prices if price > 0]
    if positive_prices:
        return min(positive_prices)

    return 0.0


def scrape_xbox_price(xbox_big_id):
    params = {
        "bigIds": xbox_big_id,
        "market": "IN",
        "languages": "en-us"
    }

    headers = {
        "User-Agent": "Mozilla/5.0"
    }

    response = requests.get(XBOX_BASE_URL, params=params, headers=headers, timeout=30)

    if response.status_code != 200:
        print(f"Failed to fetch Xbox price for Big ID {xbox_big_id}: HTTP {response.status_code}")
        return None
    data = response.json()

    try:
        products = data.get("Products", [])
        if not products:
            print(f"No products found for Xbox Big ID {xbox_big_id}")
            return None

        price = _extract_lowest_list_price(products[0])
        if price is None:
            print(f"No parseable ListPrice found for Xbox Big ID {xbox_big_id}")
            return None

        return price

    except (KeyError, IndexError, TypeError, ValueError) as e:
        print(f"Error parsing Xbox price for Big ID {xbox_big_id}: {e}")
        return None