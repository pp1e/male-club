package telepuziki.maleclub.security.jwt

import io.jsonwebtoken.*
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseCookie
import org.springframework.stereotype.Component
import telepuziki.maleclub.model.RefreshToken
import telepuziki.maleclub.repository.RefreshTokenRepository
import java.security.Key
import java.time.LocalDateTime
import java.util.*


@Component
class JwtUtils(
    @Autowired
    val refreshTokenRepository: RefreshTokenRepository
) {
    @Value("\${telepuziki.app.jwtSecret}")
    private val secret: String = ""

    @Value("\${telepuziki.app.expirationMsAccessToken}")
    private val expirationMsAccessToken: Long = 0

    @Value("\${telepuziki.app.expirationMsRefreshToken}")
    private val expirationMsRefreshToken: Long = 0

    fun getJwt(request: HttpServletRequest): String? {
        val authHeader = request.getHeader("Authorization")
        if (authHeader == null || !authHeader.startsWith("Bearer "))
            return null
        return authHeader.substring(7)
    }

    fun generateAccessJwt(phone: String): String {
        return Jwts.builder()
            .setSubject(phone)
            .setIssuedAt(Date())
            .setExpiration(Date(Date().getTime() + expirationMsAccessToken))
            .signWith(key(), SignatureAlgorithm.HS256)
            .compact()
    }

    fun generateRefreshJwt(userId: Long): String {
        val refreshToken = RefreshToken(
            userId = userId,
            expiryDate = LocalDateTime.now().plusSeconds(expirationMsRefreshToken / 1000),
            token = UUID.randomUUID().toString()
        )
        refreshTokenRepository.save(refreshToken)
        return refreshToken.token
    }

    fun getPhoneFromJwt(token: String): String {
        return Jwts
            .parser()
            .setSigningKey(key())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject()
    }

    fun isValidAccessJwt(token: String): Boolean {
        Jwts
            .parser()
            .setSigningKey(key())
            .build()
            .parse(token)
        return true
    }

    fun isValidRefreshJwt(token: RefreshToken): Boolean {
        if (token.expiryDate.compareTo(LocalDateTime.now()) < 0) {
            refreshTokenRepository.delete(token)
            return false
        }
        return true
    }

    private fun key(): Key {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret))
    }
}