package telepuziki.maleclub.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import telepuziki.maleclub.model.ReservationConsole

@Repository
interface ReservationConsoleRepository: JpaRepository<ReservationConsole, Long> {
    @Query(value = "CALL GetUpcomingEvents(:parent_id);", nativeQuery = true)
    fun getUpcomingEvents(@Param("parent_id") parentId: Long): List<Any>
}