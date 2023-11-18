package telepuziki.maleclub.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import telepuziki.maleclub.model.User
import telepuziki.maleclub.repository.UserRepository

@CrossOrigin(origins = ["http://localhost:3000"])
@RestController
@RequestMapping("/api/v1/user")
class UserController(@Autowired val userRepository: UserRepository) {
    @GetMapping("/list")
    fun getAllUsers(): List<User> {
        return userRepository.findAll()
    }
}