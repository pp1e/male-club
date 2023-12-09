package telepuziki.maleclub.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import telepuziki.maleclub.model.Child

@Repository
interface ChildRepository: JpaRepository<Child, Long> {
    fun findAllByUserId(userId: Long): List<Child>
}