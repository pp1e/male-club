package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.Reservation
import telepuziki.maleclub.repository.ChildRepository
import telepuziki.maleclub.repository.ConsoleRepository
import telepuziki.maleclub.repository.ReservationRepository
import telepuziki.maleclub.security.details.UserDetailsImpl

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/reservation")
class ReservationController(
    @Autowired val reservationRepository: ReservationRepository,
    @Autowired val childRepository: ChildRepository,
    @Autowired val consoleRepository: ConsoleRepository
    ) {
    @GetMapping("/list")
    fun getAllReservations(): List<Reservation> {
        return reservationRepository.findAll()
    }

    @GetMapping("/get")
    fun getReservationById(
        @RequestParam id: Long,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Reservation?> {
        val findReservation = reservationRepository.findByIdOrNull(id)
        if (userDetails.getAuthorities().first().authority == "admin")
            return ResponseEntity(findReservation, HttpStatus.OK)
        if (findReservation != null &&
            childRepository.findByIdOrNull(findReservation.childId)?.userId != userDetails.getId())
            return ResponseEntity(null, HttpStatus.FORBIDDEN)
        else
            return ResponseEntity(findReservation, HttpStatus.OK)
    }

    @PostMapping("/add")
    fun addReservation(
        @RequestBody reservation: Reservation,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Boolean> {
        val child = childRepository.findByIdOrNull(reservation.childId)
        val console = consoleRepository.findByIdOrNull(reservation.consoleId)
        if (child == null || console == null) {
            return ResponseEntity(false, HttpStatus.BAD_REQUEST)
        }
        if (child.userId != userDetails.getId() && userDetails.getAuthorities().first().authority != "admin")
            return ResponseEntity(false, HttpStatus.FORBIDDEN)
        reservationRepository.save(reservation)
        return ResponseEntity(true, HttpStatus.OK)
    }

    @GetMapping("/events")
    fun getUpcomingEvents(
        @RequestParam(name = "userId") userId: Long,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<List<Map<String, Any>>> {
        if (userId != userDetails.getId() && userDetails.getAuthorities().first().authority != "admin")
            return ResponseEntity(null, HttpStatus.FORBIDDEN)
        val upcomingEvents = reservationRepository.getUpcomingEvents(userId)
        var upcomingEventsMapped = listOf<Map<String, Any>>()
        for (event in upcomingEvents) {
            val eventMapped = mapOf(
                "childFirstname" to event[0],
                "reservationTime" to event[1],
                "consoleNumber" to event[2]
            )
            upcomingEventsMapped = upcomingEventsMapped.plus(eventMapped)
        }
        return ResponseEntity<List<Map<String, Any>>>(upcomingEventsMapped, HttpStatus.OK)
    }
}