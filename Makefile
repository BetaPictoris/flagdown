all: dirs api app

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

clean:
	rm -rfv build