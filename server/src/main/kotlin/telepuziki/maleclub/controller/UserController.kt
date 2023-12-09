package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import telepuziki.maleclub.model.User
import telepuziki.maleclub.repository.RoleRepository
import telepuziki.maleclub.repository.UserRepository

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/user")
class UserController(
    @Autowired val userRepository: UserRepository,
    @Autowired val roleRepository: RoleRepository,
) {
    @GetMapping("/list")
    fun getAllUsers(): List<User> {
        return userRepository.findAll()
    }

    @GetMapping("/get")
    fun getChildrenById(@RequestParam id: Long): User? {
        return userRepository.findByIdOrNull(id)
    }

    @PostMapping("/add")
    fun addUser(@RequestBody user: User): ResponseEntity<Boolean> {
        if (userRepository.existsByPhone(user.phone))
            return ResponseEntity(false, HttpStatus.CONFLICT)
        var userToAdd = user
        if (user.roleId == null) {
            val role = roleRepository.findByName("user")
            if (role == null)
                return ResponseEntity(false, HttpStatus.INTERNAL_SERVER_ERROR)
            userToAdd = user.copy(roleId = role.id)
        }

        userRepository.save(userToAdd)
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