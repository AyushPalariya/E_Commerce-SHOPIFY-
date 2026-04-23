# Build stage
# specifiy the base image
FROM maven:3.9.6-eclipse-temurin-21 AS build
#set working directory inside the container
WORKDIR /app
# copy pom.xml and src folder to the working directory
COPY pom.xml .
COPY src ./src
# build the project
RUN mvn clean package -DskipTests
# run stage
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
