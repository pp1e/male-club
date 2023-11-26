package telepuziki.maleclub.repository;

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import telepuziki.maleclub.model.Console
import java.sql.Date
import java.sql.Time

@Repository
interface ConsoleRepository : JpaRepository<Console, Long> {
    fun existsByName(@Param("name") name: String): Boolean

    @Query(value = "CALL GetAdminInfoAboutConsoles(:date, :time, :child_name);", nativeQuery = true)
    fun getAdminInfoAboutConsoles(
        @Param("date") date: Date,
        @Param("time") time: Time?,
        @Param("child_name") childName: String,
    ): List<List<Any>>
}