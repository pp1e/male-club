package telepuziki.maleclub.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import telepuziki.maleclub.model.ReservationConsole
import java.util.Date

@Repository
interface ReservationConsoleRepository: JpaRepository<ReservationConsole, Date> {
    @Query(value = "CALL GetUpcomingEvents(:parent_id);", nativeQuery = true)
    fun getAdminInfoAboutConsoles(@Param("parent_id") parentId: Long): Any
}