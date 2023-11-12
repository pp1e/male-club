package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.ReservationConsole
import telepuziki.maleclub.repository.ReservationConsoleRepository

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/reservation-console")
class ReservationConsoleController(@Autowired val reservationConsoleRepository: ReservationConsoleRepository) {
    @GetMapping("/list")
    fun getAllReservations(): List<ReservationConsole> {
        return reservationConsoleRepository.findAll()
    }

    @GetMapping("/events")
    fun getUpcomingEvents(@RequestParam(name = "parent_id") parentId: Long): Any {
        return reservationConsoleRepository.getAdminInfoAboutConsoles(parentId)
    }
}