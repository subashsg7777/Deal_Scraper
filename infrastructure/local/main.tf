terraform {
  required_version = ">= 1.6.0"
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "4.4.0"  # ◄ UPDATED TO MATCH THE MODERN CACHED BINARY
    }
  }
}

provider "docker" {}

resource "docker_network" "app_network" {
  name = "deal_scraper_network"
}

resource "docker_container" "mongo_db" {
  name  = "dev_mongodb"
  image = "mongo:6.0"
  
  networks_advanced {
    name = docker_network.app_network.name
  }

  ports {
    internal = 27017
    external = 27017
  }

  volumes {
    host_path      = "/home/subash/mongo_dev_data"
    container_path = "/data/db"
  }
}
