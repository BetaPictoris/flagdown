export PATH := node_modules/.bin:$(PATH)

all: dirs api app

# Development
start:
	cd build; \
	  ./flagdown

dev: all data start
devapp: dirs app start
devapi: dirs api data start

data:
	cp examples/config.ini build/data/

# Compile
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