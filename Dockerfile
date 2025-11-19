FROM maven:3.9-eclipse-temurin-21 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

WORKDIR /app

# Copy the entire project
COPY . .

# Build frontend
WORKDIR /app/audio-transcribe-frontend
RUN npm install && npm run build

# Copy frontend build to Spring Boot static resources
RUN mkdir -p ../src/main/resources/static && \
    cp -r dist/* ../src/main/resources/static/

# Build Spring Boot application
WORKDIR /app
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
