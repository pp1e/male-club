package telepuziki.maleclub.security.details

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import telepuziki.maleclub.model.User
import telepuziki.maleclub.repository.UserRepository
import java.util.*


class UserDetailsImpl(
    val user: User,
    val userRepository: UserRepository
    ): UserDetails {

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        val role = userRepository.getRole(user.id)
        return Collections.singletonList(SimpleGrantedAuthority(role))
    }

    fun getId(): Long {
        return user.id
    }

    override fun getPassword(): String {
        return user.password
    }

    override fun getUsername(): String {
        return user.phone
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}