package com.aipedia.backend.entity;


import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;




@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Component
@Builder
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
	private Long id;


	
	@Length(min = 3,max=15, message = "must have min 3 chars and max 15 ")
	@Pattern(regexp = "([\\w_\\.]){3,15}", message = "must be alpha-numeric [can contains underscore(_)or dot(.) and @]")
	@Column(unique = true)
	private String username;

	private String firstName;

	private String lastName;


	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;




	


	@Email(message = "Email should be valid")
	@Column(unique = true)
	private String email;
	
	
	private String imageUrl;

	
	@JsonProperty(access = Access.WRITE_ONLY)
  
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
	@Valid
	private Set<Role> roles;
	
	
	@JsonProperty(access = Access.WRITE_ONLY)
	//for extra email event 
	private boolean enabled;
	


}
