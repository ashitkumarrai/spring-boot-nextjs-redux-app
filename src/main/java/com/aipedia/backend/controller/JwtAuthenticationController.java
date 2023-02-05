package com.aipedia.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.aipedia.backend.exceptionhandler.UserBadCredentialsException;
import com.aipedia.backend.exceptionhandler.UserDisabledException;
import com.aipedia.backend.jwtconfig.JwtRequest;
import com.aipedia.backend.jwtconfig.JwtResponse;
import com.aipedia.backend.jwtconfig.JwtTokenUtil;
import com.aipedia.backend.jwtconfig.UserDetailsServiceImpl;

import lombok.extern.slf4j.Slf4j;





@RestController
@CrossOrigin
@Slf4j
public class JwtAuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;



	@PostMapping("/auth/usertoken")
	public ResponseEntity<JwtResponse> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
			throws UserDisabledException, UserBadCredentialsException {

		authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());
		//util is giving token
		final String token = jwtTokenUtil.generateToken(userDetails);

		return ResponseEntity.ok(new JwtResponse(token));
	}

	



	
	
				
	
	private void authenticate(String username, String password) throws UserDisabledException,UserBadCredentialsException {
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (DisabledException e) {
			//for disabled user
			throw new UserDisabledException("USER_DISABLED");
		} catch (BadCredentialsException e) {
			// for INVALID_CREDENTIALS
			throw new UserBadCredentialsException("INVALID_CREDENTIALS");
		}
	}


	}

