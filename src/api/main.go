package main

import (
	"log"

  "github.com/gofiber/fiber/v2"
)

const (
  API_SERVER_VERSION = "1.0.0"
)

func main() {
  log.Println("Initializing API...")
  app := fiber.New(fiber.Config{
    ServerHeader:  "Flagdown API Server",
		CaseSensitive: true,
		AppName: "Flagdown",
	})

  // Serve client app
  app.Static("/app", "./app")
  app.Static("/static", "./app/static")

  v1api := app.Group("/api").Group("/v1")

  /*
  GET: /api/v1/ping

  Checks if the API Server is running
  */
  v1api.Get("/ping", func(c *fiber.Ctx) error {
    c.SendStatus(200)
    return c.SendString("Flagdown API Server v" + API_SERVER_VERSION + " using v1 API")
  })

  log.Println("Starting API...")
  app.Listen(":3000")
}