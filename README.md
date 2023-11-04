## Server API deployment
### Create database
1. Log in MySQL as root user
2. Create MySQL database:
    ```sql
    CREATE DATABASE male_club;
    GRANT ALL PRIVILEGES ON male_club.* TO 'male_club_user'@'localhost' IDENTIFIED BY 'qwerty';
    GRANT ALL PRIVILEGES ON male_club.* TO 'male_club_user'@'%' IDENTIFIED BY 'qwerty';
    ```
### Set up application settings
1. Put database creditionals in ```application.properties``` file 
(see [```application-template.properties```](src/main/resources/config/mysql/application-template.properties)
as example)
### Launch
1. Execute ```gradle run```