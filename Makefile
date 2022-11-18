all: dirs api

# Compile
api:
	cd src/api; \
	  go build
	mv src/api/flagdown build
	
# File structure
dirs:
	mkdir -pv build

clean:
	rm -rfv build