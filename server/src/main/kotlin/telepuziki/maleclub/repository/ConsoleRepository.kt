package telepuziki.maleclub.repository;

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import telepuziki.maleclub.model.Console

@Repository
interface ConsoleRepository : JpaRepository<Console, Long> {

}