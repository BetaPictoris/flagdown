all: dirs api app

# Development
start:
	cd build; \
	  ./flagdown

dev: all config start

config:
	cp examples/config.ini build/data

# Compile
api:
	cd src/api; \
	  go build
	mv src/api/flagdown build

app:
	cd src/app; \
	  npm run build
	mv src/app/build build/app

# File structure
dirs:
	mkdir -v build
	mkdir -v build/data

clean:
	rm -rfv build

cleanapi:
	rm -v build/flagdown

cleanapp:
	rm -rv build/app