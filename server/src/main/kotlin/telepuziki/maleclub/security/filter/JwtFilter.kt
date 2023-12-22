package telepuziki.maleclub.security.filter

import io.jsonwebtoken.ExpiredJwtException
import io.jsonwebtoken.MalformedJwtException
import io.jsonwebtoken.UnsupportedJwtException
import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import telepuziki.maleclub.security.details.UserDetailsServiceImpl
import telepuziki.maleclub.security.jwt.JwtUtils
import java.io.IOException

@Component
class JwtFilter(
    @Autowired val jwtUtils: JwtUtils,
    @Autowired val userDetailsService: UserDetailsServiceImpl
): OncePerRequestFilter() {

    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            val jwt = jwtUtils.getAccessJwt(request)
            if (jwt != null) {
                if (jwtUtils.isValidAccessJwt(jwt)) {
                    val phone = jwtUtils.getPhoneFromJwt(jwt)
                    val userDetails = userDetailsService.loadUserByUsername(phone)
                    val authentication = UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.authorities
                    )
                    authentication.details = WebAuthenticationDetailsSource().buildDetails(request)
                    SecurityContextHolder.getContext().authentication = authentication
                }
            }
            else
                request.setAttribute("unauthorizedCode", HttpStatus.NOT_FOUND)
        } catch (e: MalformedJwtException) {
            //Invalid JWT token
            request.setAttribute("unauthorizedCode", HttpStatus.NOT_ACCEPTABLE)
        } catch (e: ExpiredJwtException) {
            //JWT token is expired
            request.setAttribute("unauthorizedCode", HttpStatus.REQUEST_TIMEOUT)
        } catch (e: UnsupportedJwtException) {
            //JWT token is unsupported
            request.setAttribute("unauthorizedCode", HttpStatus.UNSUPPORTED_MEDIA_TYPE)
        } catch (e: IllegalArgumentException) {
            //JWT claims string is empty
            request.setAttribute("unauthorizedCode", HttpStatus.CONFLICT)
        } catch (e: Exception) {
            //Cannot set user authentication
            request.setAttribute("unauthorizedCode", HttpStatus.EXPECTATION_FAILED)
        }
        filterChain.doFilter(request, response)
    }
}