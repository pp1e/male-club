# Application container
FROM openjdk:22-bookworm

ARG VERSION="0.0.1-SNAPSHOT"
ENV VERSION=$VERSION

COPY ./build/libs/male-club-${VERSION}.jar /server/
COPY ./src/main/resources/db/migration /server/src/main/resources/db/migration
WORKDIR /server
EXPOSE 8080
CMD java -jar male-club-${VERSION}.jar
