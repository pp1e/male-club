package telepuziki.application.db

import java.sql.Connection
import java.sql.DriverManager

fun connectToDatabase(databaseURL: String, databaseUser: String, databasePassword: String): Connection {
    Class.forName("com.mysql.cj.jdbc.Driver")
    return DriverManager.getConnection(databaseURL, databaseUser, databasePassword)
}
