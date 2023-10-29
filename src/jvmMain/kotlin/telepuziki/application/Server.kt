package telepuziki.application

import io.ktor.http.HttpStatusCode
import io.ktor.server.application.*
import io.ktor.server.engine.embeddedServer
import io.ktor.server.html.*
import io.ktor.server.http.content.*
import io.ktor.server.netty.Netty
import io.ktor.server.routing.*
import kotlinx.html.*
import telepuziki.application.config.AppConfig
import telepuziki.application.db.performMigrations

fun HTML.index() {
    head {
        title("Hello from Ktor!")
    }
    body {
        div {
            +"Hello from Ktor"
        }
        div {
            id = "root"
        }
        script(src = "/static/male-club.js") {}
    }
}

fun main() {
    val appConfig = AppConfig.createAppConfig()
    performMigrations(appConfig.dbURL, appConfig.dbUser, appConfig.dbPassword)
    val list1 = mutableListOf<Int>()
    val list2 = listOf<Int>()

    embeddedServer(Netty, port = 8080, host = "127.0.0.1") {
        routing {
            get("/") {
                call.respondHtml(HttpStatusCode.OK, HTML::index)
            }
            static("/static") {
                resources()
            }
        }
    }.start(wait = true)
}