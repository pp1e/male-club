package telepuziki.maleclub.security.details

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Component

import telepuziki.maleclub.repository.UserRepository

@Component
class UserDetailsServiceImpl(
    @Autowired
    val userRepository: UserRepository,
    ): UserDetailsService {
    override fun loadUserByUsername(username: String): UserDetails {
        val user = userRepository.findByPhone(username) ?: throw UsernameNotFoundException("User not found")
        return UserDetailsImpl(user, userRepository)
    }
}