package com.aipedia.backend.service;
import com.aipedia.backend.repository.RoleRepository;
import com.aipedia.backend.repository.UserRepository;

import java.util.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aipedia.backend.entity.Role;
import com.aipedia.backend.entity.User;
import com.aipedia.backend.exceptionhandler.EmailAlreadyUsedException;
import com.aipedia.backend.exceptionhandler.InvalidPasswordException;
import com.aipedia.backend.exceptionhandler.RecordNotFoundException;
import com.aipedia.backend.exceptionhandler.UsernameAlreadyUsedException;
import com.aipedia.backend.jwtconfig.SecurityUtils;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class UserService {

    private final Logger log = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

  


    @Autowired
    RoleRepository rr;

    public UserService(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
       
    }
  

    public User registerUser(User user) {
        userRepository
            .findByUsername(user.getUsername())
            .ifPresent(existingUser -> {
               
                    throw new UsernameAlreadyUsedException();
                
            });
        userRepository
            .findByEmail(user.getEmail())
            .ifPresent(existingUser -> {
               
                    throw new EmailAlreadyUsedException();
                
                });
            

        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        newUser.setUsername(user.getUsername().toLowerCase());
        // new user gets initially a generated password
        newUser.setPassword(encryptedPassword);
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        if (user.getEmail() != null) {
            newUser.setEmail(user.getEmail().toLowerCase());
        }
        newUser.setImageUrl(user.getImageUrl());
     
        // new user is not active
    
        // new user gets registration key
     
        Role role2 = rr.save(new Role((long) 101, "USER"));

        Set<Role> roles = new HashSet<>();
      
        roles.add(role2);
        
          newUser.setRoles(roles);
        userRepository.save(newUser);
      
        return newUser;
    }


   
    /**
     * Update all information for a specific user, and return the modified user.
     *
     * @param userDTO user to update.
     * @return updated user.
     */
    public Optional<User> updateUser(User user) {

        userRepository
                .findByUsername(user.getUsername());
        User newUser = null;
     
    userRepository
            .findByEmail(user.getEmail());
            newUser = new User();
    String encryptedPassword = passwordEncoder.encode(user.getPassword());
    newUser.setUsername(user.getUsername().toLowerCase());
    // new user gets initially a generated password
    newUser.setPassword(encryptedPassword);
    newUser.setFirstName(user.getFirstName());
    newUser.setLastName(user.getLastName());
    if (user.getEmail() != null) {
        newUser.setEmail(user.getEmail().toLowerCase());
    }
    newUser.setImageUrl(user.getImageUrl());
 
    // new user is not active

    // new user gets registration key
 
    Role role2 = rr.save(new Role((long) 101, "USER"));

    Set<Role> roles = new HashSet<>();
  
    roles.add(role2);
    
      newUser.setRoles(roles);
      
      return Optional.of(userRepository.save(newUser));
        }
        

   
            

    public void deleteUser(String login) {
        userRepository
            .findByUsername(login)
            .ifPresent(user -> {
                userRepository.delete(user);
                
                log.debug("Deleted User: {}", user);
            });
    }

    /**
     * Update basic information (first name, last name, email, language) for the current user.
     *
     * @param firstName first name of user.
     * @param lastName  last name of user.
     * @param email     email id of user.
     * @param langKey   language key.
     * @param imageUrl  image URL of user.
     */


    @Transactional
    public void changePassword(String currentClearTextPassword, String newPassword) {
        Optional<String> username = SecurityUtils.getCurrentUserLogin();

        Optional<User> userr = userRepository.findByUsername(username.get());
        if (!userr.isPresent()) {
            throw new RecordNotFoundException("logged in User not found");

        }
     
        
          


            userr.ifPresent(user -> {
                String currentEncryptedPassword = user.getPassword();
                if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword)) {
                    throw new InvalidPasswordException();
                }
                String encryptedPassword = passwordEncoder.encode(newPassword);
                user.setPassword(encryptedPassword);
              
                log.debug("Changed password for User: {}", user);
            });
    }


  
 
}

