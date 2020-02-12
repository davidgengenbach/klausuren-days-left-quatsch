FROM node:alpine AS build
COPY . /build
RUN cd /build \
 && apk add git \
 && npm install -g bower \
 && bower install --allow-root

FROM nginx:alpine
COPY --from=build /build /usr/share/nginx/html
