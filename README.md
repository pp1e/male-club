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
1. Put database creditionals in ```database.properties``` file 
(see [```database-template.properties```](server/src/main/resources/config/db/database-template.properties)
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
