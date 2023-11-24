package telepuziki.maleclub.model

import jakarta.annotation.Nullable
import jakarta.persistence.*
import lombok.Getter
import lombok.Setter
import lombok.AllArgsConstructor
import lombok.NoArgsConstructor
import lombok.Builder

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "console")
data class Console(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    val id: Long,

    @Column(name = "name", nullable = false)
    val name: String,

    @Column(name = "number", nullable = false)
    val number: Int,

    @Column(name = "description", nullable = true)
    val description: String?
)
