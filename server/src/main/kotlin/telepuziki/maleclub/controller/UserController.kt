package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.User
import telepuziki.maleclub.repository.UserRepository
import telepuziki.maleclub.security.details.UserDetailsImpl


@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/user")
class UserController(
    @Autowired
    val userRepository: UserRepository,
    @Autowired
    val passwordEncoder: PasswordEncoder
    ) {

    @GetMapping("/list")
    fun getAllUsers(): List<User> {
        return userRepository.findAll()
    }

    @GetMapping("/get")
    fun getUserById(@RequestParam id: Long): User? {
        return userRepository.findByIdOrNull(id)
    }

    @PostMapping("/add")
    fun addUser(@RequestBody user: User): ResponseEntity<Boolean> {
        if (userRepository.existsByPhone(user.phone))
            return ResponseEntity(false, HttpStatus.CONFLICT)
        if (user.roleId == 2L)
            return ResponseEntity(false, HttpStatus.FORBIDDEN)
        user.password = passwordEncoder.encode(user.password)
        userRepository.save(user)
        return ResponseEntity(true, HttpStatus.OK)
    }

    @GetMapping("/check_phone")
    fun checkPhone(@RequestParam("phone") phone: String): Boolean {
        return userRepository.existsByPhone(phone)
    }

    @GetMapping("check_success_login")
    fun checkSuccessLogin(
        @RequestParam("phone") phone: String,
        @RequestParam("password") password: String
    ): ResponseEntity<Boolean> {
        if (!checkPhone(phone))
            return ResponseEntity(false, HttpStatus.NOT_ACCEPTABLE)
        else {
            if (!userRepository.existsByPhoneAndPassword(phone, password))
                return ResponseEntity(false, HttpStatus.CONFLICT)
        }
        return ResponseEntity(true, HttpStatus.OK)
    }
}