package telepuziki.maleclub.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import telepuziki.maleclub.model.Role

@Repository
interface RoleRepository: JpaRepository<Role, Long> {
    fun findByName(@Param("name") name: String): Role?
}