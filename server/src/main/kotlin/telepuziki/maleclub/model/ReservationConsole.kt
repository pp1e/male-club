package telepuziki.maleclub.model

import jakarta.persistence.*
import lombok.*
import java.io.Serializable
import java.util.Date

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "reservation_console")
data class ReservationConsole(
    @Column(name = "time_and_date", nullable = false)
    val timeAndDate: Date,

    @EmbeddedId
    val reservationConsoleId: ReservationConsoleId
)

@Embeddable
data class ReservationConsoleId(
    @Column(name = "child_id", nullable = false)
    val childId: Long,

    @Column(name = "console_id", nullable = false)
    val consoleId: Long,
): Serializable
