FROM busybox:1
WORKDIR /app

COPY build .

CMD ["/app/flagdown"]