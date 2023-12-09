package telepuziki.maleclub.model

import jakarta.persistence.*
import lombok.*

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "user")
data class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long,

    @Column(name = "firstname", nullable = false)
    val firstname: String,

    @Column(name = "lastname", nullable = false)
    val lastname: String,

    @Column(name = "patronymic", nullable = true)
    val patronymic: String?,

    @Column(name = "phone", nullable = false)
    val phone: String,

    @Column(name = "password", nullable = false)
    val password: String,

    @Column(name = "role_id", nullable = false)
    val roleId: Long?,
)