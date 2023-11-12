package telepuziki.maleclub.repository;

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import telepuziki.maleclub.model.Console
import java.sql.Date

@Repository
interface ConsoleRepository : JpaRepository<Console, Long> {
    fun existsByName(@Param("name") name: String): Boolean

    @Query(value = "CALL GetAdminInfoAboutConsoles(:date);", nativeQuery = true)
    fun getAdminInfoAboutConsoles(@Param("date") date: Date): List<Any>
}