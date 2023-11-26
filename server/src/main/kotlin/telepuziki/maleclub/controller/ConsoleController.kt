package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.Console
import telepuziki.maleclub.repository.ConsoleRepository
import java.sql.Date
import java.sql.Time

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/console")
class ConsoleController(@Autowired val consoleRepository: ConsoleRepository) {
    @GetMapping("/list")
    fun getAllConsoles(): List<Console> {
        return consoleRepository.findAll()
    }

    @GetMapping("/get")
    fun getChildrenById(@RequestParam id: Long): Console? {
        return consoleRepository.findByIdOrNull(id)
    }

    @PostMapping("/add")
    fun addUser(@RequestBody console: Console): Console {
        return consoleRepository.save(console)
    }

    @GetMapping("/admin_info")
    fun getAdminInfoAboutConsoles(
        @RequestParam(name = "date") date: Date,
        @RequestParam(name = "time") time: Time?,
        @RequestParam(name = "child_name", defaultValue = "") childName: String,
    ): List<Any> {
        val childNamePattern = "%${childName}%"
        val adminInfo = consoleRepository.getAdminInfoAboutConsoles(date, time, childNamePattern)
        var adminInfoMapped = listOf<Map<String, Any>>()
        for (adminInfoItem in adminInfo) {
            val adminInfoItemMapped = mapOf(
                "childId" to adminInfoItem[0],
                "childFirstname" to adminInfoItem[1],
                "consoleNumber" to adminInfoItem[2],
                "phone" to adminInfoItem[3],
                "countVisit" to adminInfoItem[4],
                "childPeculiarities" to adminInfoItem[5]
            )
            adminInfoMapped = adminInfoMapped.plus(adminInfoItemMapped)
        }
        return adminInfoMapped
    }
}