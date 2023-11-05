package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import telepuziki.maleclub.model.Console
import telepuziki.maleclub.repository.ConsoleRepository

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/")
class ConsoleController(@Autowired val consoleRepository: ConsoleRepository) {
    @GetMapping("/consoles")
    fun getAllConsoles(): List<Console> {
        return consoleRepository.findAll()
    }
}