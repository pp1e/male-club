package telepuziki.maleclub.model

import jakarta.persistence.*
import lombok.*
import java.time.LocalDateTime

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "refresh_token")
data class RefreshToken(
    @Id
    @Column(name = "user_id", nullable = false)
    val userId: Long,

    @Column(name = "token", nullable = false, unique = true)
    val token: String,

    @Column(name = "expiry_date", nullable = false)
    val expiryDate: LocalDateTime
)