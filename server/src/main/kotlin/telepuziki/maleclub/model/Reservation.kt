package telepuziki.maleclub.model

import jakarta.persistence.*
import lombok.*
import java.util.Date

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "reservation")
data class Reservation(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long,

    @Column(name = "time_and_date", nullable = false)
    val timeAndDate: Date,

    @Column(name = "child_id", nullable = false)
    val childId: Long,

    @Column(name = "console_id", nullable = true)
    val consoleId: Long,

    @Column(name = "phone", nullable = false)
    val phone: String
)
