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
	go build
	mv flagdown build/flagdown

app:
	npm run build

# File structure
dirs:
	mkdir -pv build/data

clean:
	rm -rfv build

cleanapi:
	rm -v build/flagdown

cleanapp:
	rm -rv build/app

cleandata:
	rm -rfv build/data