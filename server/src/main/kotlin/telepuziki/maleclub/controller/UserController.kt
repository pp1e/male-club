package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*
import telepuziki.maleclub.model.User
import telepuziki.maleclub.repository.RoleRepository
import telepuziki.maleclub.repository.UserRepository
import telepuziki.maleclub.security.details.UserDetailsImpl


@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/user")
class UserController(
    @Autowired
    val userRepository: UserRepository,
    @Autowired
    val roleRepository: RoleRepository,
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
        var roleId = user.roleId
        if (roleId == null) {
            val defaultRole = roleRepository.findByName("user")
            if (defaultRole == null)
                return ResponseEntity(false, HttpStatus.INTERNAL_SERVER_ERROR)
            roleId = defaultRole.id
        }
        else {
            val roleUser = roleRepository.findByIdOrNull(roleId)
            if (roleUser == null)
                return ResponseEntity(false, HttpStatus.BAD_REQUEST)
            if (roleUser.name == "admin")
                return ResponseEntity(false, HttpStatus.FORBIDDEN)
        }
        val userToAdd = user.copy(roleId = roleId, password = passwordEncoder.encode(user.password))
        userRepository.save(userToAdd)
        return ResponseEntity(true, HttpStatus.OK)
    }

    @DeleteMapping("/delete/{id:\\d+}")
    fun deleteUserById(@PathVariable("id") id: Long): ResponseEntity<Boolean>  {
        if (!userRepository.existsById(id))
            return ResponseEntity(false, HttpStatus.NOT_FOUND)

        userRepository.deleteById(id)
        return ResponseEntity(true, HttpStatus.OK)
    }

    @PutMapping("/update/{id:\\d+}")
    fun updateUserById(
        @PathVariable("id") id: Long,
        @RequestBody user: User,
        @AuthenticationPrincipal userDetails: UserDetailsImpl
    ): ResponseEntity<Boolean> {
        val currentUserId = userDetails.getId()

        if (!userRepository.existsById(id))
            return ResponseEntity(false, HttpStatus.NOT_FOUND)
        if (id != currentUserId && userDetails.isNotAdmin())
            return ResponseEntity(false, HttpStatus.FORBIDDEN)

        val newUser = user.copy(id = id)
        userRepository.save(newUser)
        return ResponseEntity(true, HttpStatus.OK)
    }

    @GetMapping("/check_phone")
    fun checkPhone(@RequestParam("phone") phone: String): Boolean {
        return userRepository.existsByPhone(phone)
    }
}
