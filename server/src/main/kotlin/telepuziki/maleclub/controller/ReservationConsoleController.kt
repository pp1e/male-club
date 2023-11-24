package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.Reservation
import telepuziki.maleclub.repository.ReservationRepository

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/reservation_console")
class ReservationConsoleController(@Autowired val reservationRepository: ReservationRepository) {
    @GetMapping("/list")
    fun getAllReservations(): List<Reservation> {
        return reservationRepository.findAll()
    }

    @GetMapping("/get")
    fun getChildrenById(@RequestParam id: Long): Reservation? {
        return reservationRepository.findByIdOrNull(id)
    }

    @PostMapping("/add")
    fun addUser(@RequestBody reservation: Reservation): Reservation {
        return reservationRepository.save(reservation)
    }

    @GetMapping("/events")
    fun getUpcomingEvents(@RequestParam(name = "parent_id") parentId: Long): List<Any> {
        return reservationRepository.getUpcomingEvents(parentId)
    }
}