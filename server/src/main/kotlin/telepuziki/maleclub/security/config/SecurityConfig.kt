package telepuziki.maleclub.security.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
class SecurityConfig {
    @Bean
    @Throws(Exception::class)
    fun filterChain(http: HttpSecurity): SecurityFilterChain? {
        http
            .csrf(Customizer { csrf -> csrf.disable() })
            .authorizeHttpRequests(
                Customizer { authorize ->
                    authorize
                        .requestMatchers(
                            "api/v1/console/list",
                            "api/v1/console/add",
                            "api/v1/console/admin_info",
                            "api/v1/reservation/list",
                            "api/v1/user/list",
                            "api/v1/user/get",
                            "api/v1/user/delete",
                            "api/v1/console/delete/",
                            "api/v1/reservation/delete/",
                            "api/v1/reservation/confirm/",
                        ).hasAuthority("admin")
                        .requestMatchers(
                            "api/v1/user/add",
                            "api/v1/user/check_phone",
                            "api/v1/user/check_success_login",
                        ).permitAll()
                        .anyRequest().authenticated()
                }
            )
            .httpBasic(Customizer.withDefaults())
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        return http.build()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }
}