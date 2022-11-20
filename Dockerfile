FROM alpine
WORKDIR /app

COPY build .

CMD ["flagdown"]