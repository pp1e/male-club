package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.User
import telepuziki.maleclub.repository.UserRepository


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
        val user = userRepository.findByPhone(phone)
        if (user == null)
            return ResponseEntity(false, HttpStatus.NOT_ACCEPTABLE)
        else {
            if (!passwordEncoder.matches(password, user.password))
                return ResponseEntity(false, HttpStatus.CONFLICT)
        }
        if (userRepository.getRole(user.id) == "admin")
            return ResponseEntity(true, HttpStatus.CREATED) // это admin
        else
            return ResponseEntity(true, HttpStatus.OK) // это user
    }
}