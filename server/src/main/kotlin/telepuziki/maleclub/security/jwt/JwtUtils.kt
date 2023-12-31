package telepuziki.maleclub.security.jwt

import io.jsonwebtoken.*
import io.jsonwebtoken.io.Decoders
import io.jsonwebtoken.security.Keys
import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.ResponseCookie
import org.springframework.stereotype.Component
import org.springframework.web.util.WebUtils
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

    @Value("\${telepuziki.app.cookieNameAccessToken}")
    private val cookieNameAccessToken: String = ""

    @Value("\${telepuziki.app.cookieNameRefreshToken}")
    private val cookieNameRefreshToken: String = ""

    fun getAccessJwt(request: HttpServletRequest): String? {
        return getCookieFromRequest(request, cookieNameAccessToken)
    }

    fun getRefreshJwt(request: HttpServletRequest): String? {
        return getCookieFromRequest(request, cookieNameRefreshToken)
    }

    fun getCookieFromRequest(request: HttpServletRequest, nameCookie: String): String? {
        return WebUtils.getCookie(request, nameCookie)?.getValue()
    }

    fun generateAccessJwtCookie(phone: String): Map<String,Any> {
        val expiration = Date(Date().getTime() + expirationMsAccessToken)
        val jwt = Jwts.builder()
            .setSubject(phone)
            .setIssuedAt(Date())
            .setExpiration(expiration)
            .signWith(key(), SignatureAlgorithm.HS256)
            .compact()
        val result = mapOf(
            "accessToken" to jwt,
            "expiryDateAccessToken" to expiration
        )
        return result
    }

    fun generateRefreshJwtCookie(userId: Long): Map<String,Any> {
        val refreshToken = RefreshToken(
            userId = userId,
            expiryDate = LocalDateTime.now().plusSeconds(expirationMsRefreshToken / 1000),
            token = UUID.randomUUID().toString()
        )
        refreshTokenRepository.save(refreshToken)
        val result = mapOf(
            "refreshToken" to refreshToken.token,
            "expiryDateRefreshToken" to refreshToken.expiryDate
        )
        return result
    }

    fun getCleanAccessJwtCookie(): ResponseCookie? {
        return ResponseCookie.from(cookieNameAccessToken, "").path("/").build()
    }

    fun getCleanJwtRefreshCookie(): ResponseCookie? {
        return ResponseCookie.from(cookieNameRefreshToken, "").path("/").build()
    }

    fun createResponseCookie(token: String, cookieNameToken: String, path: String): ResponseCookie {
        return ResponseCookie
            .from(cookieNameToken, token)
            .path(path)
            .maxAge(24 * 60 * 60)
            .httpOnly(true)
            .build()
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