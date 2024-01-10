package telepuziki.maleclub.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import telepuziki.maleclub.model.Reservation
import java.time.LocalDateTime

@Repository
interface ReservationRepository: JpaRepository<Reservation, Long> {
    @Query(value = "CALL GetUpcomingEvents(:parent_id);", nativeQuery = true)
    fun getUpcomingEvents(@Param("parent_id") parentId: Long): List<List<Any>>

    @Query(value = "CALL GetCurrentOccupancy(:datetime);", nativeQuery = true)
    fun getOccupancy(@Param("datetime") datetime: LocalDateTime): Int

    @Query(value = "CALL GetUpcomingOccupancy(:datetime);", nativeQuery = true)
    fun getUpcomingOccupancy(@Param("datetime") datetime: LocalDateTime): Int

    @Query(value = "CALL GetChildReservationInfo(:datetime, :id_child);", nativeQuery = true)
    fun getReservationsForChild(
        @Param("datetime") datetime: LocalDateTime,
        @Param("id_child") childId: Long,
    ): Int
}