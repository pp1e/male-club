package telepuziki.maleclub.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import telepuziki.maleclub.model.User

@Repository
interface UserRepository: JpaRepository<User, Long> {
    fun findByPhone(phone: String): User?
    fun existsByPhone(@Param("phone") phone: String): Boolean
    @Query(value = "CALL GetRole(:user_id);", nativeQuery = true)
    fun getRole(@Param("user_id") userId: Long): String
}