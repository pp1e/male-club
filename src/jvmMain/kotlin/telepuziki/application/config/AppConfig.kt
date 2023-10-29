package telepuziki.application.config

import java.util.*


const val CONFIG_FILE_PATH = "telepuziki/application/config/app.properties"

class AppConfig(
    val dbURL: String,
    val dbUser: String,
    val dbPassword: String,
) {
    companion object {
        fun createAppConfig(): AppConfig = AppConfig(
            dbURL = getProp("db_url"),
            dbUser = getProp("db_user"),
            dbPassword = getProp("db_password"),
        )

        @Suppress("UNCHECKED_CAST")
        private fun <T> getProp(key: String): T {
            val props  = javaClass.classLoader.getResourceAsStream(CONFIG_FILE_PATH).use {
                if (it == null)
                    throw RuntimeException("Could not find $CONFIG_FILE_PATH file!")
                Properties().apply { load(it) }
            }
            return (props.getProperty(key) as T) ?: throw RuntimeException("Could not find property $key")
        }
    }
}