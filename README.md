# :)
```shell
bower install
# npm install http-server -g
http-server -o
```

# Anpassen
Einfach die `exams.json` anschauen. Sollte klar sein :) Wenn nicht einfach kurz anschreiben oder Issue erstellen!

![Screenshot](screenshot.png)

# Docker
## Build
```shell
docker build -t kcountdown .
```

Die `exams.json` liegt im Container unter `/usr/share/nginx/html/exams.json`

## docker-compose.yml
```yaml
version: '3'
services:
        kcountdown:
                image: "kcountdown:latest"
                restart: "unless-stopped"
                ports:
                        - "80:80"
                volumes:
                        - "./exams.json:/usr/share/nginx/html/exams.json"
```

