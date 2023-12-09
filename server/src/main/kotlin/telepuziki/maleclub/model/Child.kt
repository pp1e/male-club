package telepuziki.maleclub.model

import jakarta.persistence.*
import lombok.*
import java.sql.Date

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "child")
data class Child(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long,

    @Column(name = "firstname", nullable = false)
    val firstname: String,

    @Column(name = "peculiarities", nullable = true)
    val peculiarities: String?,

    @Column(name = "count_visit", nullable = false)
    val countVisit: Int = 0,

    @Column(name = "user_id", nullable = false)
    val userId: Long?,

    @Column(name = "birthdate", nullable = false)
    val birthdate: Date,
)