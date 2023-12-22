package telepuziki.maleclub.security.filter

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import telepuziki.maleclub.security.details.UserDetailsServiceImpl
import java.io.IOException

@Component
class RoleFilter : OncePerRequestFilter() {
    private val listPathsForOnlyAdmin = listOf(
        "/api/v1/console/list",
        "/api/v1/console/add",
        "/api/v1/console/delete",
        "/api/v1/console/update",
        "/api/v1/console/admin_info",
        "/api/v1/reservation/list",
        "/api/v1/reservation/delete/",
        "/api/v1/reservation/confirm/",
        "/api/v1/reservation/update/",
        "/api/v1/reservation/occupancy",
        "/api/v1/user/list",
        "/api/v1/user/delete",
    )

    private val listPathsForAll = listOf(
        "/api/v1/user/add",
        "/api/v1/user/check_phone",
        "/api/v1/login",
        "/api/v1/logout",
        "/api/v1/refresh"
    )

    @Throws(IOException::class, ServletException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        if (!isAllPath(request.servletPath)) {
            val unauthorizedCode = request.getAttribute("unauthorizedCode")
            if (unauthorizedCode != null) {
                response.status = (unauthorizedCode as HttpStatus).value()
                return
            } else if (UserDetailsServiceImpl.isNotAdmin() && isAdminPath(request.servletPath)) {
                response.status = HttpStatus.FORBIDDEN.value()
                return
            }
        }
        filterChain.doFilter(request, response)
    }

    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        val path = request.servletPath
        return isAllPath(path)
    }

    fun isAdminPath(path: String): Boolean = listPathsForOnlyAdmin.contains(path)

    fun isAllPath(path: String): Boolean = listPathsForAll.contains(path)
}