package main

import (
	"database/sql"
	"log"
	"strconv"

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
	v1api.Get("/ping", func(c *fiber.Ctx) error {
		pingResponse := HandlePing{
			ServerVersion:   API_SERVER_VERSION,
			APIVersion:      API_VERSION,
			APIInUseVersion: "v1",
		}

		c.SendStatus(200)
		return c.JSON(pingResponse)
	})

	/*
		POST: /api/v1/projects
		Creates a new project, params match that of Project (struct)
	*/
	v1api.Post("/projects", func(c *fiber.Ctx) error {
		// Creates "project" (of Project) and parses the request body to it
		project := new(Project)
		if err := c.BodyParser(project); err != nil {
			c.SendStatus(400)
			log.Println("Failed to parse project data:", err)
			return c.SendString("Failed to parse project data")
		}

		// Now insert the new project into the Projects table
		query, err := db.Exec(`INSERT INTO Projects VALUES (NULL, ?)`, project.ProjectName)
		if err != nil {
			c.SendStatus(500)
			log.Println("Failed to create new project:", err)
			return c.SendString("Failed to create new project")
		}

		pID, _ := query.LastInsertId()

		c.SendStatus(200)
		log.Println("Stored project in database:", pID)
		return c.JSON(fiber.Map{
			"ProjectID":   pID,
			"ProjectName": project.ProjectName,
		})
	})

	/*
		GET: /api/v1/projects/:ID?
		Returns a list of projects, or a single project with the projectID ":ID"
	*/
	v1api.Get("/projects/:id?", func(c *fiber.Ctx) error {
		var projects = []Project{}
		var q = `SELECT * FROM Projects`

		if c.Params("id") != "" {
			q += ` WHERE projectID=` + c.Params("id")
		}

		query, err := db.Query(q)
		if err != nil {
			c.SendStatus(500)
			log.Println("Failed to read projects:", err)
			return c.SendString("Failed to read projects")
		}

		for query.Next() {
			var projectID, projectName string
			query.Scan(&projectID, &projectName)

			pID, err := strconv.ParseInt(projectID, 10, 8)
			if err != nil {
				c.SendStatus(500)
				log.Println("Failed to parse projectID:", err)
				return c.SendString("Failed to parse projectID")
			}

			projects = append(projects, Project{uint8(pID), projectName})
		}

		c.SendStatus(200)
		return c.JSON(projects)
	})

	/*
		DELETE: /api/v1/projects/:ID
		Deletes a project
	*/
	v1api.Delete("/projects/:id", func(c *fiber.Ctx) error {
		projectID := c.Params("id")

		_, err := db.Exec(`DELETE FROM Projects WHERE projectID=?`, projectID)
		if err != nil {
			c.SendStatus(500)
			log.Println("Failed to delete project:", err)
			return c.SendString("Failed to delete project")
		}

		c.SendStatus(200)
		return c.SendString("Deleted project")
	})

	/*
		POST: /api/v1/projects/:projectName/flags
		Creates a new flag, params match that of FlagNew (struct)
	*/
	v1api.Post("/projects/:projectName/flags", func(c *fiber.Ctx) error {
		flag := new(FlagNew)
		if err := c.BodyParser(flag); err != nil {
			c.SendStatus(400)
			log.Println("Failed to parse flag data:", err)
			return c.SendString("Failed to parse flag data")
		}

		// Get projectID from projectName
		var projectID string
		query, err := db.Query(`SELECT * FROM Projects WHERE projectName=?`, c.Params("projectName"))
		if err != nil {
			c.SendStatus(500)
			log.Println("Failed to read projects:", err)
			return c.SendString("Failed to read projects")
		}

		for query.Next() {
			query.Scan(&projectID)
		}

		// Insert the new flag into the Flags table
		queryFlags, err := db.Exec(`INSERT INTO Flags VALUES (NULL, ?, ?, ?)`, projectID, flag.FlagName, flag.Value)
		if err != nil {
			c.SendStatus(500)
			log.Println("Failed to create new flag:", err)
			return c.SendString("Failed to create new flag")
		}

		fID, _ := queryFlags.LastInsertId()
		pID, _ := strconv.ParseInt(projectID, 10, 8)

		c.SendStatus(200)
		log.Println("Created flag in database:", fID)
		return c.JSON(fiber.Map{
			"FlagID":    fID,
			"ProjectID": uint8(pID),
			"FlagName":  flag.FlagName,
			"FlagValue": flag.Value,
		})
	})

	host, _ := apiConfig.GetKey("host")
	port, _ := apiConfig.GetKey("port")

	log.Println("Flagdown listening on http://" + host.Value() + ":" + port.Value())
	app.Listen(host.Value() + ":" + port.Value())
}

/*
HandlePing
Structure for handlePing response (pingResponse)

ServerVersion     string: The version of the API Server
APIVersion        string: The current stable API Version
APIInUseVersion   string: The API version used in the request
*/

type HandlePing struct {
	ServerVersion   string
	APIVersion      string
	APIInUseVersion string
}

/*
Project
Structure that matches the "Projects" table

ProjectID		 uint8: The project's ID.
ProjectName		string: The name of the project.
*/
type Project struct {
	ProjectID   uint8
	ProjectName string
}

/*
Flag
Structure that matches the "Flags" table

FlagID			 uint8: The flag's ID.
ProjectID		 uint8: The ID of the flag's project.
FlagName		string: The name of the flag.
Value 			string: The flag's value.

FlagNew
Same as Flag, although without IDs
*/
type Flag struct {
	FlagID    uint8
	ProjectID uint8
	FlagName  string
	Value     string
}

type FlagNew struct {
	FlagName string
	Value    string
}
