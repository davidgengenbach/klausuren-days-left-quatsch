FROM node:alpine AS build

COPY . /build
RUN cd /build \
 && apk --no-cache add git \
 && npm install -g bower \
 && bower install --allow-root


FROM alpine:latest

COPY --from=build /build /web
RUN apk --no-cache add thttpd \
 && chown -R thttpd:www-data /web \
 && chmod -R 644 /web \
 && chmod 711 $(find /web -type d)

EXPOSE 80
ENTRYPOINT ["thttpd", "-D", "-l", "/dev/stdout", "-u", "thttpd", "-d", "/web"]

