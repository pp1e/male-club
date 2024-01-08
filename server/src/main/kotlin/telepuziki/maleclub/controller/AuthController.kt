package telepuziki.maleclub.controller

import jakarta.servlet.http.HttpServletRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.annotation.AuthenticationPrincipal
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
    ): ResponseEntity<Map<String, Any>> {
        val user = userRepository.findByPhone(phone)
        if (user == null)
            return ResponseEntity(null, HttpStatus.NOT_ACCEPTABLE)
        else {
            if (!passwordEncoder.matches(password, user.password))
                return ResponseEntity(null, HttpStatus.CONFLICT)
        }

        val authentication = authenticationManager
            .authenticate(UsernamePasswordAuthenticationToken(phone, password))
        SecurityContextHolder.getContext().authentication = authentication
        val userDetails = authentication.principal as UserDetailsImpl

        val accessJwt = jwtUtils.generateAccessJwt(userDetails.username)
        val refreshJwt = jwtUtils.generateRefreshJwt(userDetails.getId())

        val result = mapOf(
            "accessToken" to accessJwt,
            "refreshToken" to refreshJwt,
            "id" to user.id,
            "phone" to user.phone,
            "initials" to user.getInitials()
        )

        val status = if (userRepository.getRole(user.id) == "admin") HttpStatus.CREATED else HttpStatus.OK
        return ResponseEntity(result, status)
    }

    @Transactional
    @PostMapping("/logout")
    fun cleanTokens(): ResponseEntity<*>? {
        if (UserDetailsServiceImpl.isNotAnonymousUser()) {
            val userDetails = UserDetailsServiceImpl.getCurrentUserDetails()
            refreshTokenRepository.deleteByUserId(userDetails.getId())
        }
        return ResponseEntity.ok().body(true)
    }

    @PostMapping("/refresh")
    fun refreshToken(request: HttpServletRequest): ResponseEntity<Map<String, Any>> {
        val refreshTokenFromRequest = jwtUtils.getJwt(request)

        if (refreshTokenFromRequest.isNullOrEmpty())
            return ResponseEntity(null, HttpStatus.NOT_FOUND) // Refresh Token is empty

        val refreshToken = refreshTokenRepository.findByToken(refreshTokenFromRequest)
        if (refreshToken == null)
            return ResponseEntity(null, HttpStatus.NOT_ACCEPTABLE) // Refresh Token is unknown

        if (!jwtUtils.isValidRefreshJwt(refreshToken))
            return ResponseEntity(null, HttpStatus.CONFLICT) // Refresh token was expired, please sign in

        val user = userRepository.findById(refreshToken.userId).get()

        val accessJwt = jwtUtils.generateAccessJwt(user.phone)
        val refreshJwt = jwtUtils.generateRefreshJwt(user.id)
        val tokens = mapOf("accessToken" to accessJwt, "refreshToken" to refreshJwt)
        val status = if (userRepository.getRole(user.id) == "admin") HttpStatus.CREATED else HttpStatus.OK

        return ResponseEntity(tokens, status)
    }

    @GetMapping("/check_access_token")
    fun checkAccessToken(
        request: HttpServletRequest
    ): ResponseEntity<Boolean> {
        val unauthorizedCode = request.getAttribute("unauthorizedCode")
        return if (unauthorizedCode != null)
            ResponseEntity(false, unauthorizedCode as HttpStatus)
        else {
            val status = if (UserDetailsServiceImpl.isNotAdmin()) HttpStatus.OK else HttpStatus.CREATED
            ResponseEntity(true, status)
        }
    }
}