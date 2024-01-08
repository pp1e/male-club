package telepuziki.maleclub.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import telepuziki.maleclub.model.Child

@Repository
interface ChildRepository: JpaRepository<Child, Long> {
    @Query(value = "CALL GetChildList(:parent_id, :age_filter);", nativeQuery = true)
    fun getChildList(
        @Param("parent_id") parentId: Long? = null,
        @Param("age_filter") ageFilter: Boolean = false,
    ): List<List<Any>>
}