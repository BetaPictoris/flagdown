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
	mkdir -pv build
	mkdir -pv build/data

clean:
	rm -rfv build

cleanapi:
	rm -v build/flagdown

cleanapp:
	rm -rv build/app

cleandata:
	rm -rfv build/data