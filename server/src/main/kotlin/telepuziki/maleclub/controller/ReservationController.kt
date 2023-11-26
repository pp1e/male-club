package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.Reservation
import telepuziki.maleclub.repository.ReservationRepository

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/reservation")
class ReservationController(@Autowired val reservationRepository: ReservationRepository) {
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
    fun getUpcomingEvents(@RequestParam(name = "parent_id") parentId: Long): List<Map<String, Any>> {
        val upcomingEvents = reservationRepository.getUpcomingEvents(parentId)
        var upcomingEventsMapped = listOf<Map<String, Any>>()
        for (event in upcomingEvents) {
            val eventMapped = mapOf(
                "childFirstname" to event[0],
                "reservationTime" to event[1],
                "consoleNumber" to event[2]
            )
            upcomingEventsMapped = upcomingEventsMapped.plus(eventMapped)
        }
        return upcomingEventsMapped
    }
}