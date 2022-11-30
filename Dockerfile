FROM alpine:3
WORKDIR /app

COPY build .

CMD ["flagdown"]