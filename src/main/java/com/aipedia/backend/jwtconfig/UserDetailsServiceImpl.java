package com.aipedia.backend.jwtconfig;



import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.aipedia.backend.entity.User;
import com.aipedia.backend.exceptionhandler.RecordNotFoundException;
import com.aipedia.backend.repository.UserRepository;



@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
   private UserRepository ur;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = ur.findByUsername(username);
		if(!user.isPresent()) {
			throw new RecordNotFoundException("User NOt Found, "+username);
		}
		return new UserDetailsImpl(user.get());
      
    }
    
}


