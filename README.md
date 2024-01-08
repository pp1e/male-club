# Development deployment
## Server API deployment
### Create database
1. Log in MySQL as root user
2. Create MySQL database:
    ```sql
    CREATE DATABASE male_club;
    CREATE OR REPLACE USER 'male_club_user'@'localhost' IDENTIFIED BY 'qwerty';
    CREATE OR REPLACE USER 'male_club_user'@'%' IDENTIFIED BY 'qwerty';
    GRANT ALL PRIVILEGES ON male_club.* TO 'male_club_user'@'localhost';
    GRANT ALL PRIVILEGES ON male_club.* TO 'male_club_user'@'%';
    ```
### Set up application settings
1. Put database credentials in ```database.properties``` file 
(see [```database-development-template.properties```](server/src/main/resources/config/db/database-development-template.properties)
as example)
### Launch
1. Execute ```./gradlew build``` if needed
2. Execute ```./gradle bootRun```

## Frontend deployment
1. Install node.js
2. ```cd web_client```
3. ```npm install```\
   Loads dependencies.
4. ```npm start```\
   Runs the react app in the development mode.\
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Production deployment

### Create database
1. Log in MySQL as root user
2. Create MySQL database:
    ```sql
    CREATE DATABASE male_club;
    CREATE OR REPLACE USER 'male_club_user'@'localhost' IDENTIFIED BY 'qwerty';
    CREATE OR REPLACE USER 'male_club_user'@'%' IDENTIFIED BY 'qwerty';
    GRANT ALL PRIVILEGES ON male_club.* TO 'male_club_user'@'localhost';
    GRANT ALL PRIVILEGES ON male_club.* TO 'male_club_user'@'%';
    ```
3. Allow remote access to the database. Add the following line to `/ect/mysql/my.cnf` file: 
   ```bash
   [mysqld]
   bind-address = 0.0.0.0
   ```

### Set up application settings
1. Put database credentials in ```database.properties``` file
   (see [```database-production-template.properties```](server/src/main/resources/config/db/database-production-template.properties)
   as example)
   
### Docker deployment
1. If there are changes in code:
   1. Move to the server directory:
   ```bash
   cd server
   ```
   2. Execute ```./gradlew build``` to compile `JAR` file.
2. Run ```docker-compose build && docker-compose up -d``` in project root directory
