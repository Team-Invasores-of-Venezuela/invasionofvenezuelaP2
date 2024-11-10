package com.example.backend_edunerd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@SpringBootApplication
public class BackendEdunerdApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendEdunerdApplication.class, args);
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests((authz) ->
						authz.anyRequest().permitAll()
				)
				.httpBasic(withDefaults())
				.formLogin((form) ->
						form.loginPage("/svc").permitAll()
				)
				.logout((logout) -> logout.permitAll());

		return http.build();
	}

}
