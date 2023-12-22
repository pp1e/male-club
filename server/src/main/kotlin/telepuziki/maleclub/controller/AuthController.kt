package telepuziki.maleclub.controller

import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.repository.RefreshTokenRepository
import telepuziki.maleclub.repository.UserRepository
import telepuziki.maleclub.security.details.UserDetailsImpl
import telepuziki.maleclub.security.details.UserDetailsServiceImpl
import telepuziki.maleclub.security.jwt.JwtUtils


@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1")
class AuthController(
    @Autowired
    val authenticationManager: AuthenticationManager,
    @Autowired
    val jwtUtils: JwtUtils,
    @Autowired
    val refreshTokenRepository: RefreshTokenRepository,
    @Autowired
    val userRepository: UserRepository,
    @Autowired
    val passwordEncoder: PasswordEncoder
) {

    @PostMapping("/login")
    fun generateToken(
        @RequestParam("phone") phone: String,
        @RequestParam("password") password: String
    ): ResponseEntity<Boolean> {
        val user = userRepository.findByPhone(phone)
        if (user == null)
            return ResponseEntity(false, HttpStatus.NOT_ACCEPTABLE)
        else {
            if (!passwordEncoder.matches(password, user.password))
                return ResponseEntity(false, HttpStatus.CONFLICT)
        }

        val authentication = authenticationManager
            .authenticate(UsernamePasswordAuthenticationToken(phone, password))
        SecurityContextHolder.getContext().authentication = authentication
        val userDetails = authentication.principal as UserDetailsImpl

        val accessJwtCookie = jwtUtils.generateAccessJwtCookie(userDetails.username)
        val refreshJwtCookie = jwtUtils.generateRefreshJwtCookie(userDetails.getId())

        val headers = HttpHeaders()
        headers.add(HttpHeaders.SET_COOKIE, accessJwtCookie.toString())
        headers.add(HttpHeaders.SET_COOKIE, refreshJwtCookie.toString())
        val status = if (userRepository.getRole(user.id) == "admin") HttpStatus.CREATED else HttpStatus.OK
        return ResponseEntity(true, headers, status)
    }

    @Transactional
    @PostMapping("/logout")
    fun cleanTokens(): ResponseEntity<*>? {
        if (UserDetailsServiceImpl.isNotAnonymousUser()) {
            val userDetails = UserDetailsServiceImpl.getCurrentUserDetails()
            refreshTokenRepository.deleteByUserId(userDetails.getId())
        }

        val accessJwtCookie = jwtUtils.getCleanAccessJwtCookie()
        val refreshJwtCookie = jwtUtils.getCleanJwtRefreshCookie()

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, accessJwtCookie.toString())
            .header(HttpHeaders.SET_COOKIE, refreshJwtCookie.toString())
            .body(true)
    }

    @PostMapping("/refresh")
    fun refreshToken(request: HttpServletRequest): ResponseEntity<*>? {
        val refreshTokenFromRequest = jwtUtils.getRefreshJwt(request)

        if (refreshTokenFromRequest.isNullOrEmpty())
            return ResponseEntity(false, HttpStatus.NOT_FOUND) // Refresh Token is empty

        val refreshToken = refreshTokenRepository.findByToken(refreshTokenFromRequest)
        if (refreshToken == null)
            return ResponseEntity(false, HttpStatus.NOT_ACCEPTABLE) // Refresh Token is unknown

        if (!jwtUtils.isValidRefreshJwt(refreshToken))
            return ResponseEntity(false, HttpStatus.CONFLICT) // Refresh token was expired, please sign in

        val user = userRepository.findById(refreshToken.userId).get()

        val accessJwtCookie: ResponseCookie = jwtUtils.generateAccessJwtCookie(user.phone)
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessJwtCookie.toString())
                .body(true)
    }
}