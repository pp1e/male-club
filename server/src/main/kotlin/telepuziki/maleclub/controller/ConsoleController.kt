package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.Console
import telepuziki.maleclub.repository.ConsoleRepository
import telepuziki.maleclub.security.details.UserDetailsImpl
import java.sql.Date
import java.sql.Time
import java.time.LocalDateTime

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/console")
class ConsoleController(@Autowired val consoleRepository: ConsoleRepository) {
    @GetMapping("/list")
    fun getAllConsoles(): List<Console> {
        return consoleRepository.findAll()
    }

    @GetMapping("/get")
    fun getConsoleById(@RequestParam id: Long): Console? {
        return consoleRepository.findByIdOrNull(id)
    }

    @PostMapping("/add")
    fun addConsole(@RequestBody console: Console): Console {
        return consoleRepository.save(console)
    }

    @DeleteMapping("/delete/{id:\\d+}")
    fun deleteConsoleById(@PathVariable("id") id: Long): ResponseEntity<Boolean> {
        if (!consoleRepository.existsById(id))
            return ResponseEntity(false, HttpStatus.NOT_FOUND)

        consoleRepository.deleteById(id)
        return ResponseEntity(true, HttpStatus.OK)
    }

    @PutMapping("/update/{id:\\d+}")
    fun updateConsoleById(
        @PathVariable("id") id: Long,
        @RequestBody console: Console,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Boolean> {
        if (!consoleRepository.existsById(id))
            return ResponseEntity(false, HttpStatus.NOT_FOUND)

        val newConsole= console.copy(id=id)
        consoleRepository.save(newConsole)
        return ResponseEntity(true, HttpStatus.OK)
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

    @GetMapping("/reservation_info")
    fun getConsoleReservationInfo(
        @RequestParam(name = "datetime") datetime: LocalDateTime,
    ): List<Any> {
        val consoleReservationInfo = consoleRepository.getConsoleReservationInfo(datetime)
        var consoleReservationInfoMapped = listOf<Map<String, Any>>()
        for (consoleReservationInfoItem in consoleReservationInfo) {
            val consoleReservationInfoItemMapped = mapOf(
                "id" to consoleReservationInfoItem[0],
                "name" to consoleReservationInfoItem[1],
                "number" to consoleReservationInfoItem[2],
                "description" to consoleReservationInfoItem[3],
                "is_reserved" to (consoleReservationInfoItem[4] != null),
            )
            consoleReservationInfoMapped = consoleReservationInfoMapped.plus(consoleReservationInfoItemMapped)
        }
        return consoleReservationInfoMapped
    }
}
