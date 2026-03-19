from fetch_games import fetch_games
from scrapers.epic_scrapers import scrape_epic_price
from scrapers.steam_scrapers import scrape_steam_prices
from scrapers.xbox_scrapers import scrape_xbox_price
from api_client import send_prices
import time

games = fetch_games()

print("Retrieved Game List:\n", games)

for game in games:

    game_id = game.get("id")
    game_name = game.get("name")

    stores = game.get("stores", {})
    steam_url = stores.get("steam", "")
    epic_offer_id = stores.get("epic_offerId", "")
    epic_sandbox_id = stores.get("epic_sandboxId", "")
    xbox_big_id = stores.get("xbox_big_id", "")

    print(f"Processing {game_name} ({game_id})")

    try:
        if steam_url:
            steam_price = scrape_steam_prices(steam_url)
            print(f"Scraped Steam price for {game_name} ({game_id}): {steam_price}")
            if steam_price is not None:
                send_prices(game_id, steam_price, "steam", "INR")
            else:
                print(f"Steam price not found for {game_name}")
        else:
            print(f"Skipping Steam scrape for {game_name} (no Steam URL)")

        if epic_offer_id and epic_sandbox_id:
            epic_price = scrape_epic_price(epic_offer_id, epic_sandbox_id)
            print(f"Scraped Epic price for {game_name} ({game_id}): {epic_price}")
            if epic_price is not None:
                send_prices(game_id, epic_price, "epic", "INR")
            else:
                print(f"Epic price not found for {game_name}")
        else:
            print(f"Skipping Epic scrape for {game_name} (missing Epic offer or sandbox ID)")
            print(f" Epic Offer ID: {epic_offer_id}, Epic Sandbox ID: {epic_sandbox_id}")

        if xbox_big_id:
            print(f"Xbox Big ID for {game_name} ({game_id}): {xbox_big_id}")
            xbox_price = scrape_xbox_price(xbox_big_id)
            print(f"Scraped Xbox price for {game_name} ({game_id}): {xbox_price}")
            if xbox_price is not None:
                send_prices(game_id, xbox_price, "xbox", "INR")
            else:
                print(f"Xbox price not found for {game_name}")

    except Exception as e:

        print(f"Scrape failed for {game_name}: {e}")

    # polite delay to avoid rate limiting
    time.sleep(5)