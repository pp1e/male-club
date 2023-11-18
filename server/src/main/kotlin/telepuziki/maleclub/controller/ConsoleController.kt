package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.Console
import telepuziki.maleclub.repository.ConsoleRepository
import java.sql.Date

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/console")
class ConsoleController(@Autowired val consoleRepository: ConsoleRepository) {
    @GetMapping("/list")
    fun getAllConsoles(): List<Console> {
        return consoleRepository.findAll()
    }

    @GetMapping("/admin-info")
    fun getAdminInfoAboutConsoles(@RequestParam date: Date): List<Any> {
        return consoleRepository.getAdminInfoAboutConsoles(date)
    }
}