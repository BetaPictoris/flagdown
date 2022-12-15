FROM debian:buster
WORKDIR /app

COPY build .

CMD ["/app/flagdown"]