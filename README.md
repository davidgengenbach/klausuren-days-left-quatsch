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

Die `exams.json` liegt im Container unter `/web/exams.json`

## Run
```shell
docker run --publish 80:80 --volume ./exams.json:/web/exams.json kcountdown:latest
```

