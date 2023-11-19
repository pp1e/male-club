package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.ReservationConsole
import telepuziki.maleclub.repository.ReservationConsoleRepository

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/reservation_console")
class ReservationConsoleController(@Autowired val reservationConsoleRepository: ReservationConsoleRepository) {
    @GetMapping("/list")
    fun getAllReservations(): List<ReservationConsole> {
        return reservationConsoleRepository.findAll()
    }

    @PostMapping("/add")
    fun addUser(@RequestBody reservationConsole: ReservationConsole): ReservationConsole {
        return reservationConsoleRepository.save(reservationConsole)
    }

    @GetMapping("/events")
    fun getUpcomingEvents(@RequestParam(name = "parent_id") parentId: Long): List<Any> {
        return reservationConsoleRepository.getUpcomingEvents(parentId)
    }
}