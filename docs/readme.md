# Flagdown [![Docker Image](https://github.com/BetaPictoris/flagdown/actions/workflows/docker-image.yml/badge.svg)](https://github.com/BetaPictoris/flagdown/actions/workflows/docker-image.yml)

A self-hosted Go-based feature flag system 

## :rocket: Features
 - A minimal React dashboard (coming soon).
 - A simple API and Server written in Go.

## :hammer: Installation

### Using Docker

In `/path/to/app/data` directory create a [`config.ini`](https://github.com/BetaPictoris/flagdown/blob/dev/examples/config.ini) file.

#### Using Docker Hub

```bash
# Pull Docker image
docker pull betapictoris/flagdown 
# Run the Docker container.
docker run -v /path/to/app/data:/app/data betapictoris/flagdown
```

#### Using GitHub Container registry
```bash
# Pull Docker image 
docker pull ghcr.io/betapictoris/flagdown
# Run the Docker container.
docker run -v /path/to/app/data:/app/data betapictoris/flagdown
```

#### Building the container
First see the "Building Flagdown" section, you will need a Flagdown build in `./build`
for this to work. 
```bash
# Build the Docker image
docker build --tag flagdown:build
# Run the Docker container.
docker run -v /path/to/app/data:/app/data flagdown:build
```

### Manual
#### Building Flagdown

Requires Go (1.19+), Node.JS, NPM, and Make.

```bash
# Clone the repository
git clone https://github.com/BetaPictoris/flagdown.git 
# Install node modules
cd ./src/app
npm install
cd ../..
# Build Flagdown
make
# Copy the example configuration file
make data
```

To start Flagdown:
```bash
make start
```

## :memo: Documentation

For more documentation view the [wiki](https://github.com/BetaPictoris/flagdown/wiki).


---

[![BetaPictoris](https://cdn.ozx.me/betapictoris/header.svg)](https://github.com/BetaPictoris)
