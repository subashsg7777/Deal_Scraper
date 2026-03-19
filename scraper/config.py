import os

BASE_URL = os.getenv("API_BASE_URL")


def build_api_url(path: str) -> str:
	if not BASE_URL:
		raise RuntimeError("API_BASE_URL is not set. Configure it before running the scraper.")

	normalized_base = BASE_URL.strip().rstrip("/")
	if not (normalized_base.startswith("http://") or normalized_base.startswith("https://")):
		raise RuntimeError("API_BASE_URL must start with http:// or https://")

	normalized_path = path if path.startswith("/") else f"/{path}"
	return f"{normalized_base}{normalized_path}"
