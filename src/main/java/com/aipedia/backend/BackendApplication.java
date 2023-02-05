package com.aipedia.backend;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.data.repository.query.SecurityEvaluationContextExtension;

import com.aipedia.backend.entity.Role;
import com.aipedia.backend.entity.User;
import com.aipedia.backend.repository.RoleRepository;
import com.aipedia.backend.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class BackendApplication implements CommandLineRunner {
	
	@Autowired
	UserRepository ur;

	@Autowired
	RoleRepository rr;



	@Autowired PasswordEncoder passwordEncoder;
	

	@Override
	public void run(String... args) throws Exception {
          
		//creating default role
		
		List<Role> existingRoles = rr.findAll();

	
		

		if (existingRoles.isEmpty()) {
			Role role1 = rr.save(new Role((long) 100, "ADMIN"));
			Role role2 = rr.save(new Role((long) 101, "USER"));

			Set<Role> roles = new HashSet<>();
			roles.add(role1);
			roles.add(role2);
			User user1 = User.builder().firstName("admin").lastName("admin").username("admin").password(passwordEncoder.encode("Adminaipedia@12345")).roles(roles).email("firstadmin@gmail.com")
					.build();
			ur.save(user1);
			log.info("Created Admin Credentials");

		}

	
		}
		



		



		@Bean
		public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
			return new SecurityEvaluationContextExtension();
		}


		
		
	




	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

}
