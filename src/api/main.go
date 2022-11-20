package main

import (
	"database/sql"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/redirect/v2"

	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/monitor"

	_ "github.com/mattn/go-sqlite3"
	"gopkg.in/ini.v1"
)

const (
	API_SERVER_VERSION = "1.0.0"
	API_VERSION        = "v1"
)

func main() {
	log.Println("Opening config file...")
	cfg, err := ini.Load("./data/config.ini")
	apiConfig := cfg.Section("API")
	if err != nil {
		log.Fatalln(err)
	}

	log.Println("Opening database...")
	db, err := sql.Open("sqlite3", "./data/database.db")
	if err != nil {
		log.Fatalln(err)
	}

	log.Println("Checking if tables have been created...")
	_, err = db.Exec(`
  CREATE TABLE IF NOT EXISTS Projects (
  projectID INTEGER PRIMARY KEY AUTOINCREMENT, 
  projectName varchar(255) NOT NULL
  );`)
	if err != nil {
		log.Fatal("ERR: Can't create \"Projects\" table", err)
	}

	_, err = db.Exec(`
  CREATE TABLE IF NOT EXISTS Flags (
  flagID INTEGER PRIMARY KEY AUTOINCREMENT, 
  projectID INTEGER NOT NULL,
  flagName varchar(255) NOT NULL,
  value text NOT NULL
  );`)
	if err != nil {
		log.Fatal("ERR: Can't create \"Flags\" table", err)
	}

	log.Println("Initializing API...")
	app := fiber.New(fiber.Config{
		ServerHeader:          "Flagdown API Server",
		CaseSensitive:         true,
		AppName:               "Flagdown",
		DisableStartupMessage: true,
	})

	/*
	  *: *

	  Redirect if needed and log requests
	*/
	app.Use(redirect.New(redirect.Config{
		Rules: map[string]string{
			"/": "/app",
		},
		StatusCode: 301,
	}))

	if apiConfig.Key("logging").MustBool(false) {
		log.Println("Setting logging config...")
		app.Use(logger.New(logger.Config{
			Format: "[${ip}] ${status} - ${method} ${path}\n",
		}))
	}

	/*
	  GET: /app and /static

	  Serve client app
	*/
	app.Static("/app", "./app")
	app.Static("/static", "./app/static")

	/*
	  GET: /metrics

	  Flagdown metrics page
	*/
	if apiConfig.Key("metrics").MustBool(false) {
		log.Println("Setting metrics config...")
		app.Get("/metrics", monitor.New(monitor.Config{Title: "Flagdown metrics"}))
	}

	v1api := app.Group("/api").Group("/v1")

	/*
	  GET: /api/v1/ping

	  Checks if the API Server is running
	*/
	v1api.Get("/ping", handlePing)

	log.Println("Flagdown listening on :3000")
	app.Listen(":3000")
}

// Routes

/*
GET: /api/v1/ping
Checks if the API Server is running

HandlePing
Structure for handlePing response (pingResponse)

ServerVersion     string: The version of the API Server
APIVersion        string: The current stable API Version
APIInUseVersion   string: The API version used in the request
*/
func handlePing(c *fiber.Ctx) error {
	pingResponse := HandlePing{
		ServerVersion:   API_SERVER_VERSION,
		APIVersion:      API_VERSION,
		APIInUseVersion: "v1",
	}

	c.SendStatus(200)
	return c.JSON(pingResponse)
}

type HandlePing struct {
	ServerVersion   string
	APIVersion      string
	APIInUseVersion string
}

/*
GET: /api/v1/projects/:ID?
Returns a list of projects, or a single project with the projectID ":ID"

POST: /api/v1/projects
Creates a new project, params match that of Project (struct)

Project
Structure that matches the "Projects" table

ProjectID		 uint8: The project's ID.
ProjectName		string: The name of the project.
*/
