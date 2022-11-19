package main

import (
	"log"

  "github.com/gofiber/fiber/v2"
  "github.com/gofiber/redirect/v2"
  "github.com/gofiber/fiber/v2/middleware/logger"
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
    DisableStartupMessage: true,
	})
  
  /*
  *: *

  Redirect if needed and log requests
  */
  app.Use(redirect.New(redirect.Config{
    Rules: map[string]string{
      "/":   "/app",
    },
    StatusCode: 301,
  }))

  app.Use(logger.New(logger.Config{
    Format: "[${ip}] ${status} - ${method} ${path}\n",
  }))

  /*
  GET: /app and /static

  Serve client app
  */
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

  log.Println("Flagdown listening on :3000")
  app.Listen(":3000")
}