export PATH := node_modules/.bin:$(PATH)

all: build

# Development
start:
	cd build; \
	  ./flagdown

dev: build data start
dev/app: dirs build/app start
dev/api: dirs build/api data start

data:
	cp examples/config.ini build/data/

# Compile
build: build/api build/app

build/api:
	go build
	mv flagdown build/flagdown

build/app:
	BUILD_PATH='./build/app' react-app-rewired build

# File structure
dirs:
	mkdir -pv build/data

clean:
	rm -rfv build

clean/api:
	rm -v build/flagdown

clean/app:
	rm -rv build/app

clean/data:
	rm -rfv build/data
