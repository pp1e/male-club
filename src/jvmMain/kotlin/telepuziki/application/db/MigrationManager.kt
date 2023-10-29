package telepuziki.application.db

import org.flywaydb.core.Flyway

fun performMigrations(databaseURL: String, databaseUser: String, databasePassword: String) {
    val flyway = Flyway
        .configure()
        .locations("telepuziki/application/db/migrations")
        .validateMigrationNaming(true)
        .dataSource(databaseURL, databaseUser, databasePassword)
        .load()
    flyway.migrate()
}
